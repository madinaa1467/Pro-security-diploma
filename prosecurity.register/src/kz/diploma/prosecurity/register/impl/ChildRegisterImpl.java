package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.*;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;

//  @Override
//  public List<ChildEventList> listAllChildrenEvents(long parentId, EventFilter filter) {
//    List<ChildEventList> childrenEvents = childDao.get().listAllChildren(parentId);
//    childrenEvents.forEach((temp) -> {
//      filter.childId = temp.id;
//      temp.events = childDao.get().getEventsByChild(filter);
//    });
//    return childrenEvents;
//  }

  @Override
  public List<EventList> listAllEvents(long parentId, EventFilter filter) {
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
  public List<Child> getParentChildList(String username) {
    //todo delete futrther not neened parameter from parentDisplay
    int id = childDao.get().getParentIdByUserName(username);
    if (id == 0) {//null
      throw new NullPointerException("No person with username = " + username);
    }
    return childDao.get().loadChildren(id);
  }
}
