package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.FileHolder;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.file_storage.FileDataReader;
import kz.greetgo.file_storage.FileStorage;
import kz.greetgo.file_storage.FileStoringOperation;
import kz.greetgo.file_storage.impl.DatabaseNotPrepared;
import kz.greetgo.file_storage.impl.FileStorageMonoDbLogic;
import kz.greetgo.file_storage.impl.MonoDbOperations;

import java.lang.reflect.Field;

@Bean
public class FileRegisterImpl implements FileRegister {

  public BeanGetter<FileStorage> fileStorage;

  @Override
  public String saveFile(FileHolder file) {

    String fileId;

    FileStoringOperation fileStoringOperation = fileStorage.get()
      .storing()
      .name(file.name)
      .data(file.data)
      .mimeType(file.contentType);

    try {
      fileId = fileStoringOperation.store();
    } catch (Exception e) {
      prepareDatabaseForFS();
      fileId = fileStoringOperation.store();
    }

    return fileId;

  }

  private void prepareDatabaseForFS() {
    try {
      Field monoDbOperations = FileStorageMonoDbLogic.class.getDeclaredField("monoDbOperations");
      monoDbOperations.setAccessible(true);
      Object obj = monoDbOperations.get(fileStorage.get());
      MonoDbOperations.class
        .getMethod("prepareDatabase", DatabaseNotPrepared.class)
        .invoke(obj, new DatabaseNotPrepared());
    } catch (Exception ignore) {
      System.out.println("Database prepared");
    }
  }

  @Override
  public FileDataReader getFile(String fileId) {
    return fileStorage.get().readOrNull(fileId);
  }
}
