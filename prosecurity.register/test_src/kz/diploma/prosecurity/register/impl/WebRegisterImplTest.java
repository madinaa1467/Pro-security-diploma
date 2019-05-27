package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.model.EventWeb;
import kz.diploma.prosecurity.register.dao.SequenceDao;
import kz.diploma.prosecurity.register.jdbcWeb.ChildrenEventListWeb;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.db.Jdbc;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.text.SimpleDateFormat;
import java.util.List;

public class WebRegisterImplTest extends ParentTestNg {

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
  public void test() {
    System.out.println("nextVal: " + sequenceDao.get().proSeqNext());
  }

  @Test
  public void testWeb() {

    List<EventWeb> eventListFromDB;
    EventFilter filter = this.getFilter();

    eventListFromDB = jdbc.get().execute(new ChildrenEventListWeb(filter));

    System.out.println("eventListFromDB" + eventListFromDB);
  }

}
