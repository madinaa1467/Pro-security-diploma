package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.FileHolder;
import kz.greetgo.file_storage.FileDataReader;

public interface FileRegister {

  String saveFile(FileHolder file);

  FileDataReader getFile(String fileId);
}
