package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.ToSave;

public interface ParentRegister {
  Long register(ToSave toSave);

  ToSave getInfo(Long id);
  void deleteParent(Long id);

  AccountInfo save(Long id, ToSave toSave);
}
