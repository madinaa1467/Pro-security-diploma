package kz.diploma.prosecurity.register.impl;

import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.diploma.prosecurity.controller.model.PersonRecord;
import kz.diploma.prosecurity.controller.register.PersonRegister;
import kz.diploma.prosecurity.register.dao.PersonDao;

import java.util.List;

@Bean
public class PersonRegisterImpl implements PersonRegister {
  public BeanGetter<PersonDao> personDao;

  @Override
  public List<PersonRecord> list() {
    return personDao.get().list();
  }
}
