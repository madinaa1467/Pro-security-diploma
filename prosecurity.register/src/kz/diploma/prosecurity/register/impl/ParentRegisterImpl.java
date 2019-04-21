package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.register.dao.ParentDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

@Bean
public class ParentRegisterImpl implements ParentRegister {
  public BeanGetter<ParentDao> parentDao;

  @Override
  public long register(ToSave toSave) {
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
    public void deleteParent(long id) {
      this.parentDao.get().deactualParent(id);
      this.parentDao.get().deactualPhone(id);
    }
}
