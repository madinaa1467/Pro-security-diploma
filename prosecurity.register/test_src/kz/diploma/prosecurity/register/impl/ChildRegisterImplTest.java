package kz.diploma.prosecurity.register.impl;

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

  @Test
  public void checkDifferenceBetweenDates() throws ParseException {
    Date today = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date eventDate = formatter.parse("2019-05-02 08:59:59");

    Map<TimeUnit,Long> mapDifferTime = computeDiff(eventDate, today);

    for (Map.Entry<TimeUnit,Long> entry : mapDifferTime.entrySet()){
      System.out.println("Key = " + entry.getKey() +
        ", Value = " + entry.getValue());
  }
}

  public static Map<TimeUnit,Long> computeDiff(Date date1, Date date2) {

    long diffInMillies = date2.getTime() - date1.getTime();
    //create the list
    List<TimeUnit> units = new ArrayList<TimeUnit>(EnumSet.allOf(TimeUnit.class));
    Collections.reverse(units);

    //create the result map of TimeUnit and difference
    Map<TimeUnit,Long> result = new LinkedHashMap<TimeUnit,Long>();
    long milliesRest = diffInMillies;

    for ( TimeUnit unit : units ) {
      //calculate difference in millisecond
      long diff = unit.convert(milliesRest,TimeUnit.MILLISECONDS);
      long diffInMilliesForUnit = unit.toMillis(diff);
      milliesRest = milliesRest - diffInMilliesForUnit;
      //put the result in the map
      result.put(unit,diff);
    }
    return result;
  }


}
