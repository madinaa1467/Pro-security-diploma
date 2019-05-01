package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.ToSave;

public interface ParentRegister {
  long register(ToSave toSave);
  ToSave getInfo(Long id);
  void updateParent(ToSave toSave);
  void deleteParent(Long id);
}
