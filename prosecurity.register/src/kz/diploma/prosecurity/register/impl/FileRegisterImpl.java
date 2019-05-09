package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.errors.RestError;
import kz.diploma.prosecurity.controller.model.FileHolder;
import kz.diploma.prosecurity.controller.model.FileModel;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.register.beans.all.IdGenerator;
import kz.diploma.prosecurity.register.dao.FileLoadDao;
import kz.diploma.prosecurity.register.util.MimeTypeUtil;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.file_storage.FileDataReader;
import kz.greetgo.file_storage.FileStorage;
import kz.greetgo.file_storage.FileStoringOperation;
import kz.greetgo.file_storage.impl.DatabaseNotPrepared;
import kz.greetgo.file_storage.impl.FileStorageMonoDbLogic;
import kz.greetgo.file_storage.impl.MonoDbOperations;

import java.lang.reflect.Field;
import java.util.Base64;

@Bean
public class FileRegisterImpl implements FileRegister {

  public BeanGetter<IdGenerator> idGenerator;

  public BeanGetter<FileStorage> fileStorage;

  public BeanGetter<FileLoadDao> fileLoadDao;

  private static final int TEN_MB_IN_BYTES = 10887500;


  @Override
  public String save(FileModel file, boolean isLast) {
    if (file == null) return null;

    String fileId = file.id == null ? idGenerator.get().newId() : file.id;

    Integer number = valOrZero(fileLoadDao.get().maxNum(fileId));
    System.out.println("file.src: " + file.src);

    fileLoadDao.get().insert(fileId, number + 1, file.src);
    if (isLast) {
      String data = (number == 0) ? file.src : fileLoadDao.get().select(fileId);
      System.out.println("data: " + data);

      byte[] dataInByte = Base64.getDecoder().decode(data);

      //byte[] dataInByte = FileUtil.base64ToBytes(data);

      if (dataInByte.length > TEN_MB_IN_BYTES) throw new RestError("More than 10Mb file: " + file.name);
      fileLoadDao.get().delete(fileId);

      if (file.type == null || file.type.trim().length() == 0) file.type = MimeTypeUtil.extractMimeType(file.name);

      fileId = fileStorage.get().storing().name(file.name).mimeType(file.type).data(dataInByte).store();
    }

    return fileId;
  }

  private int valOrZero(Integer val) {
    return val == null ? 0 : val;
  }

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
