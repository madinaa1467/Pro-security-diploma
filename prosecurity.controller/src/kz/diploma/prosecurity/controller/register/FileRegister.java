package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.FileModel;
import kz.greetgo.file_storage.FileDataReader;

public interface FileRegister {

  FileDataReader getFile(String fileId);

  String save(FileModel file, boolean isLast);

  void delete(String fileId);
}
