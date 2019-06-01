package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.errors.ErrorMessage;
import kz.diploma.prosecurity.controller.errors.ValidationError;
import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.model.UserCan;
import kz.diploma.prosecurity.controller.register.AuthRegister;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.register.dao.ParentDao;
import kz.diploma.prosecurity.register.dao.PersonDao;
import kz.diploma.prosecurity.register.dao.SequenceDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.security.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Bean
public class ParentRegisterImpl implements ParentRegister {
  public BeanGetter<PasswordEncoder> passwordEncoder;
  public BeanGetter<ParentDao> parentDao;
  public BeanGetter<PersonDao> personDao;

  public BeanGetter<AuthRegister> authRegister;
  public BeanGetter<FileRegister> fileRegister;
  public BeanGetter<SequenceDao> sequenceDao;

  @Override
  public Long register(ToSave toSave) {
    validateOnDuplicate(toSave);

    toSave.id = sequenceDao.get().proSeqNext();
    toSave.password = passwordEncoder.get().encode(toSave.password);

    personDao.get().insertPerson(toSave);
    parentDao.get().insertParent(toSave);
    for (Phone phone : toSave.phones) {
      parentDao.get().upsertPhone(toSave.id, phone);
    }

    //TODO change to set other permission
    add_can(toSave.username, UserCan.USER);

    return toSave.id;
  }


  private void add_can(String username, UserCan... cans) {
    for (UserCan can : cans) {
      parentDao.get().upsert(can.name());
      parentDao.get().personCan(username, can.name());
    }
  }

  @Override
  public AccountInfo save(Long id, ToSave toSave) {
    toSave.id = id;
    validateOnDuplicate(toSave);

    /*String email = toSave.email;
    toSave.username = email.substring(0, email.indexOf('@'));*/

    String oldImgId = personDao.get().getImgIdById(toSave.id);

    parentDao.get().upsertParent(toSave);
    personDao.get().upsertPerson(toSave);

    this.parentDao.get().deactualPhone(id);
    for (Phone phone : toSave.phones) {
      parentDao.get().upsertPhone(id, phone);
    }

    if (oldImgId != null && !Objects.equals(toSave.img, oldImgId)) {
      fileRegister.get().delete(oldImgId);
    }

    return authRegister.get().accountInfo(id);
  }

  private void validateOnDuplicate(ToSave toSave) throws ValidationError {
    List<ErrorMessage> errors = new ArrayList<>();

    Long id = personDao.get().getPersonIdByUsername(toSave.username);
    if (id != null && !Objects.equals(toSave.id, id)) {
      errors.add(new ErrorMessage("username", "alreadyInUse"));
    }
    id = personDao.get().getPersonIdByEmail(toSave.email);
    if (id != null && !Objects.equals(toSave.id, id)) {
      errors.add(new ErrorMessage("email", "alreadyInUse"));
    }

    if (errors.size() > 0) throw new ValidationError(errors);
  }

  @Override
  public void deleteParent(Long id) {
    this.personDao.get().deactualPerson(id);
    this.parentDao.get().deactualParent(id);
    this.parentDao.get().deactualPhone(id);
  }

  @Override
  public ToSave getInfo(Long id) {
    ToSave toSave = this.parentDao.get().getInfo(id);
    toSave.phones = this.parentDao.get().getPhones(id);
    return toSave;
  }

  @Override
  public void checkPassword(Long id, String oldPassword) {
    oldPassword = passwordEncoder.get().encode(oldPassword);
    if (!Objects.equals(this.personDao.get().checkPassword(id, oldPassword), id)) {
      ErrorMessage errorMessage = new ErrorMessage("oldPassword", "notCorrect");
      throw new ValidationError(errorMessage);
    }
  }


  @Override
  public boolean changePassword(Long id, String password) {
      password = passwordEncoder.get().encode(password);
      if (Objects.equals(this.personDao.get().changePassword(id, password), id))
          return true;
      else
          return false;
  }
}
