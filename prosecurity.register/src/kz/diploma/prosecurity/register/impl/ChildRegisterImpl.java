package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.*;
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

  @Override
  public List<Child> getParentChildList(String username) {
    //todo delete futrther not neened parameter from parentDisplay
    int id = childDao.get().getParentIdByUserName(username);

    if (id == 0) {//null
      throw new NullPointerException("No person with username = " + username);
    }
    List<Child> children = childDao.get().loadChildren(id);
    return children;
  }

  public List<Event> getEventsByChild(EventFilter filter){
    return childDao.get().getEventsByChild(filter);
  }
  public ChildEvents listEvents(long childId) {
    return childDao.get().listEvents(childId);
  }
}
