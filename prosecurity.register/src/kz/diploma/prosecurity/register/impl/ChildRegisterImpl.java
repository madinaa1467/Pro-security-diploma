package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.util.List;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;

  @Override
  public List<ChildEvents> listAllEvents(long parentId) {
    return childDao.get().listAllEvents(parentId);
  }
  public ChildEvents listEvents(long childId) {
    return childDao.get().listEvents(childId);
  }
}
