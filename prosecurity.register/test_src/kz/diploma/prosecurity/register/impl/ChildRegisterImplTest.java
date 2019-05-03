package kz.diploma.prosecurity.register.impl;

import javafx.util.Pair;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventList;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class ChildRegisterImplTest extends ParentTestNg {

  public BeanGetter<ChildRegister> childRegisterBeanGetter;

  public EventFilter getFilter(){
    EventFilter eventFilter = new EventFilter();

    eventFilter.limit = 15;
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      eventFilter.startDate = formatter.parse("2000-02-16 23:59:59");
      eventFilter.endDate = formatter.parse("2007-02-19 23:59:59");
    }catch (Exception e){
      e.printStackTrace();
    }
    return eventFilter;
  }

  @Test
  public void getMyChildEventsTest(){
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
  public void getChildEventListJDBCTest(){


    List<Event> eventListFromDB = new ArrayList<>();



    System.out.println();
  }

  @Test
  public void checkDifferenceBetweenDates() throws ParseException {
    Date today = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date eventDate = formatter.parse("2015-05-02 08:59:59");

    Pair<Character, Long> pair = computeDiff(eventDate, today);

    System.out.println("pair : " + pair.getKey() + " value: " +  pair.getValue());
}

  public static Pair<Character, Long> computeDiff(Date date1, Date date2) {

    char returnUnit = ' ';
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

    for (Map.Entry<TimeUnit,Long> entry : result.entrySet()) {
      System.out.println("Key = " + entry.getKey() +
        ", Value = " + entry.getValue());
    }
    for (Map.Entry<TimeUnit,Long> entry : result.entrySet()){
      if(entry.getValue() != 0){
        returnUnit = getCorrectedUnit(entry.getKey());
        returnTime = entry.getValue();
        break;
      }
    }
    if(returnUnit == 'd'){
      if(returnTime > 365){
        returnTime = returnTime / 365;
        returnUnit = 'y';
      } else if(returnTime > 30){
        returnTime = returnTime / 30;
        returnUnit = 'm';
      }
    }

    return new Pair<>(returnUnit, returnTime);
  }


  public static Character getCorrectedUnit(TimeUnit timeUnit){

    switch (timeUnit) {
      case DAYS:
        return 'd';
      case HOURS:
        return 'h';
      case MINUTES:
        return 'm';
      case SECONDS:
        return 's';
      default:
        return '0';
    }
  }
}
