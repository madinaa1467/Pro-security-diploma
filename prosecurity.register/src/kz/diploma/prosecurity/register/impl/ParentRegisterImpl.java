package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.register.dao.ParentDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.security.password.PasswordEncoder;

@Bean
public class ParentRegisterImpl implements ParentRegister {
  public BeanGetter<PasswordEncoder> passwordEncoder;
  public BeanGetter<ParentDao> parentDao;

  @Override
  public long register(ToSave toSave) {
    toSave.password = passwordEncoder.get().encode(toSave.password);
    long parent = parentDao.get().insertParent(toSave);
    for (Phone phone : toSave.phones) {
      parentDao.get().upsertPhone(parent, phone);
    }
    return parent;
  }

  @Override
  public void updateParent(ToSave toSave) {
    long parent = parentDao.get().upsertParent(toSave);
  }

  @Override
  public void deleteParent(Long id) {
    this.parentDao.get().deactualParent(id);
    this.parentDao.get().deactualPhone(id);
  }

  @Override
  public ToSave getInfo(Long id) {
    ToSave toSave = this.parentDao.get().getInfo(id);
    toSave.phones = this.parentDao.get().getPhones(id);
    return toSave;
  }
}
