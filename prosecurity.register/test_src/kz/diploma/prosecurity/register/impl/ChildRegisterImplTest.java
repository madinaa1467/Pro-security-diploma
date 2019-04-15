package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.util.List;

public class ChildRegisterImplTest extends ParentTestNg {

  public BeanGetter<ChildRegister> childRegisterBeanGetter;

  @Test
  public void childrenEventsTest(){

    EventFilter eventFilter = new EventFilter();
    eventFilter.childId = 1;
    eventFilter.limit = 5;
    List<ChildEvents> childEvents = childRegisterBeanGetter.get().listAllEvents(eventFilter.childId, eventFilter);
    System.out.println(childEvents);
  }
}
