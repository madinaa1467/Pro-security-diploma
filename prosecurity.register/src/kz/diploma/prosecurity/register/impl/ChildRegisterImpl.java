package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.errors.ErrorMessage;
import kz.diploma.prosecurity.controller.errors.ValidationError;
import kz.diploma.prosecurity.controller.model.*;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.diploma.prosecurity.register.dao.SequenceDao;
import kz.diploma.prosecurity.register.jdbc.ChildEventList;
import kz.diploma.prosecurity.register.jdbc.ChildrenEventList;
import kz.greetgo.db.Jdbc;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;
  public BeanGetter<SequenceDao> sequenceDao;
  public BeanGetter<Jdbc> jdbc;
  public BeanGetter<FileRegister> fileRegister;

  public BeanGetter<NotificationRegister> notificationRegister;

  @Override
  public List<EventList> listAllEvents(Long parentId, EventFilter filter) {
    List<Event> eventListFromDB;
    filter.parentId = parentId;

    if (filter.childId == 0)//case when we call for all children
      eventListFromDB = jdbc.get().execute(new ChildrenEventList(filter));
    else
      eventListFromDB = jdbc.get().execute(new ChildEventList(filter));

    List<EventList> eventLists = new ArrayList<>();
    String tempDate = "";
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");

    for (int i = 0; i < eventListFromDB.size(); i++) {
      Event event = eventListFromDB.get(i);
      event.setTime();
      if (tempDate.equals(dateFormat.format(event.date))) {
        eventLists.get(eventLists.size() - 1).events.add(event);
      } else {
        EventList eventList = new EventList();
        eventList.events.add(event);
        tempDate = dateFormat.format(event.date);
        eventList.date = tempDate;
        eventLists.add(eventList);
      }
    }
    return eventLists;
  }

  @Override
  public List<Child> getParentChildList(Long parentId) {
    if (parentId == null) {
      throw new NullPointerException("No person with parentId = " + parentId);
    }
    List<Child> children = childDao.get().loadChildren(parentId);
    children.add(0, Child.getAllChildObject());
    return children;
  }

  @Override
  public Child getChildByCard(String cardNumber, String password, Long childId) {
    Child child = this.getChildByCardFromDB(cardNumber, password, childId);
    return child;
  }

  @Override
  public boolean saveOrUpdateChild(Long parentId, ChildToSave childToSave) {
    if (childToSave.id != null) {

      String oldImgId = childDao.get().getImgIdById(childToSave.id);

      Child child = this.getChildByCardFromDB(childToSave.cardNumber, childToSave.password, childToSave.id);
      this.childDao.get().upsertParentChild(parentId, childToSave.id, childToSave.notification, 1);

      if (!Objects.equals(child.cardNumber, childToSave.cardNumber) && child.cardNumber != null)
        childToSave.cardNumber = child.cardNumber;

      boolean flag = this.childDao.get().upsertChild(childToSave) > 0;

      if (oldImgId != null && !Objects.equals(childToSave.img, oldImgId)) {
        fileRegister.get().delete(oldImgId);
      }

      return flag;
    } else {
      childToSave.id = sequenceDao.get().proSeqNext();
      this.childDao.get().insertChild(childToSave);
      this.childDao.get().upsertParentChild(parentId, childToSave.id, childToSave.notification, 1);
      return true;
    }
  }

  @Override
  public boolean deleteChild(Long parentId, Long childId, String delete) {
    if("permanent".equals(delete)){
      this.childDao.get().deactualChildForever(childId);
      this.childDao.get().deactualChildEventsForever(childId);
      this.childDao.get().deactualParentChildForever(childId);
      return true;
    }else if("temporary".equals(delete)){
      this.childDao.get().deactualParentChild(parentId, childId);
      return true;
    }
    return false;
  }


  @Override
  public boolean permission(String action, String cardNumberInDec, String entrance) {
    Child child = childDao.get().getChildByCardDec(cardNumberInDec.replaceAll(" ",""));
    if (child == null) {
      return false;
    } else {
      Integer actual = this.childDao.get().checkCard(child.cardNumber);
      if (actual == null && actual == 0) {
        return false;
      } else {
        Event event = new Event();
        event.id = sequenceDao.get().proSeqNext();
        event.date = new Date();
        if("1".equals(action)){
          event.action = "in";
        } else if("0".equals(action)){
          event.action = "out";
        } else if("in".equals(action) || "out".equals(action)){
          event.action = action;
        }
        event.entrance = entrance;
        event.childId = child.id;
        event.fio = child.fio;
        event.cardNumber = child.cardNumber;

        this.childDao.get().insertEvent(event);

        notificationRegister.get().send(event);
        return true;
      }
    }
  }

  @Override
  public List<Event> getLastEventsList(Long parentId) {
    List<Event> lastEventListFromDB = new ArrayList<>();

    Long[] childrenIds = childDao.get().getChildIdByParent(parentId);

    Date today = new Date();
    for (Long childId : childrenIds) {
      Event lastEvent = childDao.get().getChildLastEvent(parentId, childId);
      if (lastEvent != null) {
        String pair = computeDiff(lastEvent.date, today);
        String[] parts = pair.split(";");
        lastEvent.timeUnit = parts[0];
        lastEvent.when = parts[1];
        lastEventListFromDB.add(lastEvent);
      }
    }

    return lastEventListFromDB;
  }


  public static String computeDiff(Date date1, Date date2) {

    String returnUnit = "";
    Long returnTime = 0L;
    long diffInMillies = date2.getTime() - date1.getTime();
    List<TimeUnit> units = new ArrayList<>(EnumSet.allOf(TimeUnit.class));
    Collections.reverse(units);

    Map<TimeUnit, Long> result = new LinkedHashMap<>();
    long milliesRest = diffInMillies;

    for (TimeUnit unit : units) {
      long diff = unit.convert(milliesRest, TimeUnit.MILLISECONDS);
      long diffInMilliesForUnit = unit.toMillis(diff);
      milliesRest = milliesRest - diffInMilliesForUnit;
      result.put(unit, diff);
    }
    for (Map.Entry<TimeUnit, Long> entry : result.entrySet()) {
      if (entry.getValue() != 0) {
        returnUnit = getCorrectedUnit(entry.getKey());
        returnTime = entry.getValue();
        break;
      }
    }
    if ("DAYS_AGO".equals(returnUnit)) {
      if (returnTime > 365) {
        returnTime = returnTime / 365;
        returnUnit = "YEARS_AGO";
      } else if (returnTime > 30) {
        returnTime = returnTime / 30;
        returnUnit = "MONTHS_AGO";
      }
    }
    return returnUnit + ';' + returnTime;
  }


  public static String getCorrectedUnit(TimeUnit timeUnit) {
    switch (timeUnit) {
      case DAYS:
        return "DAYS_AGO";
      case HOURS:
        return "HOURS_AGO";
      case MINUTES:
        return "MINUTES_AGO";
      case SECONDS:
        return "SECONDS_AGO";
      default:
        return "";
    }
  }

  public Child getChildByCardFromDB(String cardNumber, String password, Long childId) {

    Child child = childDao.get().getChildByCard(cardNumber);
    if (child == null) {
      Integer actual = this.childDao.get().checkCard(cardNumber);
      if (actual == null) {
        ErrorMessage errorMessage = new ErrorMessage("cardNumber", "unknown");
        throw new ValidationError(errorMessage);
      } else if (actual == 0) {
        ErrorMessage errorMessage = new ErrorMessage("cardNumber", "unavailable");
        throw new ValidationError(errorMessage);
      } else {
        //ребенка с такой картой нет но сам ребенок есть(только с другой картой) и он меняет карточку, но так как это edit
        // нужно значит старое значение карточки удалить
        if (childId != null) {
          //update child card
          child = childDao.get().getChildById(childId);
          child.cardNumber = cardNumber;
        } else {
          child = new Child();
          child.cardNumber = cardNumber;
        }
      }
    } else if (!Objects.equals(child.id, childId) && childId != null) {
      // карточка не свободна, уже на другого ребенка прикреплена
      ErrorMessage errorMessage = new ErrorMessage("cardNumber", "alreadyInUse");
      throw new ValidationError(errorMessage);
    }

    if(childDao.get().checkCardPassword(cardNumber, password) != null) {
      return child;
    } else{
      ErrorMessage errorMessage = new ErrorMessage("password", "notCorrect");
      throw new ValidationError(errorMessage);
    }
  }
}
