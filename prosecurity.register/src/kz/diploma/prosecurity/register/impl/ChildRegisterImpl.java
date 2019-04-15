package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.util.List;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;

  @Override
  public List<ChildEvents> listAllEvents(long parentId, EventFilter filter) {
    List<ChildEvents> childrenEvents = childDao.get().listAllChildren(parentId);

    childrenEvents.forEach((temp) -> {
      filter.childId = temp.id;
      temp.events = childDao.get().getEventsByChild(filter);
    });
    return childrenEvents;
  }
  public List<Event> getEventsByChild(EventFilter filter){
    return childDao.get().getEventsByChild(filter);
  }
  public ChildEvents listEvents(long childId) {
    return childDao.get().listEvents(childId);
  }
}
