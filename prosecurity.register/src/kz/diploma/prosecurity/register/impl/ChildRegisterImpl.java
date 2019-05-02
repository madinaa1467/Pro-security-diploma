package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.*;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.diploma.prosecurity.register.dao.ParentDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;
  public BeanGetter<ParentDao> parentDao;

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
  public List<Event> getLastEventsList(long parentId) {
    List<Event> lastEventListFromDB = new ArrayList<>();

    int[] childrenIds = childDao.get().getParentChildId(parentId);


    for (int childId : childrenIds) {
      Event lastEvent = childDao.get().getChildLastEvent(childId);
      if(lastEvent != null){

        lastEventListFromDB.add(lastEvent);
      }
    }

    return lastEventListFromDB;
  }
}
