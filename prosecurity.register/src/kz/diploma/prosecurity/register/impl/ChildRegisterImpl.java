package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.*;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;

  @Override
  public List<EventList> listAllEvents(Long parentId, EventFilter filter) {
    List<Event> eventListFromDB;
    if (filter.childId == 0)//case when we call for all children
      eventListFromDB = childDao.get().getChildrenEventList(parentId, filter);
    else
      eventListFromDB = childDao.get().getChildEventList(filter.childId, filter);

    List<EventList> eventLists = new ArrayList<>();
    String tempDate = "";
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");

    for(int i = 0; i < eventListFromDB.size(); i ++) {
      Event event = eventListFromDB.get(i);
      event.setTime();
      if (tempDate.equals(dateFormat.format(event.date))) {
        eventLists.get(eventLists.size()-1).events.add(event);
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
  public List<Event> getLastEventsList(Long parentId) {
    List<Event> lastEventListFromDB = new ArrayList<>();

    int[] childrenIds = childDao.get().getParentChildId(parentId);

    Date today = new Date();
    for (int childId : childrenIds) {
      Event lastEvent = childDao.get().getChildLastEvent(childId);
      if(lastEvent != null){
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

    Map<TimeUnit,Long> result = new LinkedHashMap<>();
    long milliesRest = diffInMillies;

    for ( TimeUnit unit : units ) {
      long diff = unit.convert(milliesRest,TimeUnit.MILLISECONDS);
      long diffInMilliesForUnit = unit.toMillis(diff);
      milliesRest = milliesRest - diffInMilliesForUnit;
      result.put(unit,diff);
    }
    for (Map.Entry<TimeUnit,Long> entry : result.entrySet()){
      if(entry.getValue() != 0){
        returnUnit = getCorrectedUnit(entry.getKey());
        returnTime = entry.getValue();
        break;
      }
    }
    if("DAYS_AGO".equals(returnUnit)){
      if(returnTime > 365){
        returnTime = returnTime / 365;
        returnUnit = "YEARS_AGO";
      } else if(returnTime > 30){
        returnTime = returnTime / 30;
        returnUnit = "MONTHS_AGO";
      }
    }
    return returnUnit+';'+returnTime;
  }


  public static String getCorrectedUnit(TimeUnit timeUnit){
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
}
