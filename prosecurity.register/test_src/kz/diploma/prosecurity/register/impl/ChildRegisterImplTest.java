package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.model.EventList;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.diploma.prosecurity.register.dao.NotificationDao;
import kz.diploma.prosecurity.register.dao.SequenceDao;
import kz.diploma.prosecurity.register.jdbc.ChildEventList;
import kz.diploma.prosecurity.register.jdbc.ChildrenEventList;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.db.Jdbc;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.util.RND;
import org.testng.annotations.Test;

import java.text.SimpleDateFormat;
import java.util.List;

public class ChildRegisterImplTest extends ParentTestNg {

  public BeanGetter<ChildRegister> childRegisterBeanGetter;
  public BeanGetter<Jdbc> jdbc;
  public BeanGetter<SequenceDao> sequenceDao;

  public EventFilter getFilter() {
    EventFilter eventFilter = new EventFilter();

    eventFilter.limit = 15;
    eventFilter.parentId = 1;
    eventFilter.offset = 0;
    eventFilter.childId = 1;
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      eventFilter.startDate = formatter.parse("2000-02-16 23:59:59");
      eventFilter.endDate = formatter.parse("2007-02-16 23:59:59");
    } catch (Exception e) {
      e.printStackTrace();
    }
    return eventFilter;
  }

  @Test
  public void getMyChildEventsTest() {
    EventFilter eventFilter = this.getFilter();
    //
    //
    List<EventList> childEvents = childRegisterBeanGetter.get().listAllEvents(1L, eventFilter);
    //
    //
    System.out.println(childEvents);
  }
  //List<Event> eventListFromDB;
  //    if (filter.childId == 0)//case when we call for all children
  //      eventListFromDB = childDao.get().getChildrenEventList(parentId, filter);
  //    else
  //      eventListFromDB = childDao.get().getChildEventList(filter.childId, filter);
  //
  //    List<EventList> eventLists = new ArrayList<>();
  //    String tempDate = "";
  //    SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");
  //
  //    for(int i = 0; i < eventListFromDB.size(); i ++) {
  //      Event event = eventListFromDB.get(i);
  //      event.setTime();
  //      if (tempDate.equals(dateFormat.format(event.date))) {
  //        eventLists.get(eventLists.size()-1).events.add(event);
  //      } else {
  //        EventList eventList = new EventList();
  //        eventList.events.add(event);
  //        tempDate = dateFormat.format(event.date);
  //        eventList.date = tempDate;
  //        eventLists.add(eventList);
  //      }
  //    }
  //    return eventLists;


  @Test
  public void getChildEventListJDBCTest() {
    EventFilter filter = this.getFilter();

    List<Event> eventListFromDB = jdbc.get().execute(new ChildEventList(filter));


    System.out.println();
  }


  @Test
  public void getChildrenEventListJDBCTest() {
    EventFilter filter = this.getFilter();

    List<Event> eventListFromDB = jdbc.get().execute(new ChildrenEventList(filter));


    System.out.println();
  }


  public BeanGetter<ChildDao> dao;
  public BeanGetter<NotificationDao> notificationDao;

  @Test
  public void test() {
    dao.get().selectParentIds(1l).stream().forEach(id -> {

      for (int i = 0; i < 2; i++) {
        notificationDao.get().registerDevice(id, RND.str(100));
      }
    });

  }

  @Test
  public void testPermission() {

  }

}
