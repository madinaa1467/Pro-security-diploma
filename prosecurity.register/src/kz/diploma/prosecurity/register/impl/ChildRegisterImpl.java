package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.Child;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.register.dao.ChildDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.util.List;

@Bean
public class ChildRegisterImpl implements ChildRegister {
  public BeanGetter<ChildDao> childDao;

  @Override
  public List<Child> listMyChildren() {
    return childDao.get().listMyChildren();
  }
}
