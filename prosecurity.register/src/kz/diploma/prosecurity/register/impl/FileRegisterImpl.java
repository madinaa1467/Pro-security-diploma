package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.errors.RestError;
import kz.diploma.prosecurity.controller.model.FileHolder;
import kz.diploma.prosecurity.controller.model.FileModel;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.util.MimeTypeUtil;
import kz.diploma.prosecurity.register.beans.all.IdGenerator;
import kz.diploma.prosecurity.register.dao.FileLoadDao;
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

    fileLoadDao.get().insert(fileId, number + 1, file.src);
    if (isLast) {
      String data = (number == 0) ? file.src : fileLoadDao.get().select(fileId);

      byte[] dataInByte = Base64.getDecoder().decode(data);

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
  public FileDataReader getFile(String fileId) {
    return fileStorage.get().readOrNull(fileId);
  }


}
