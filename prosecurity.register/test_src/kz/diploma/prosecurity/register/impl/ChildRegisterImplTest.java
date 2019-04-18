package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.ChildEvent;
import kz.diploma.prosecurity.controller.model.ChildEventList;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.text.SimpleDateFormat;
import java.util.List;

public class ChildRegisterImplTest extends ParentTestNg {

  public BeanGetter<ChildRegister> childRegisterBeanGetter;

  public EventFilter getFilter(){
    EventFilter eventFilter = new EventFilter();

    eventFilter.limit = 15;
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      eventFilter.startDate = formatter.parse("2000-02-16 23:59:59");
      eventFilter.endDate = formatter.parse("2007-02-16 23:59:59");
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
    List<ChildEvent> childEvents = childRegisterBeanGetter.get().listAllEvents(1, eventFilter);
    //
    //
    System.out.println(childEvents);
  }


}
