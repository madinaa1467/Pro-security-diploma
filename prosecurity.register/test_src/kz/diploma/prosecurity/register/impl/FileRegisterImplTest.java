package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.FileModel;
import kz.diploma.prosecurity.controller.register.FileRegister;
import kz.diploma.prosecurity.controller.util.FileUtil;
import kz.diploma.prosecurity.register.dao.FileLoadDao;
import kz.diploma.prosecurity.register.resources.TestResources;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.file_storage.FileDataReader;
import kz.greetgo.file_storage.FileStorage;
import org.testng.annotations.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.fest.assertions.api.Assertions.assertThat;

public class FileRegisterImplTest extends ParentTestNg {

  public BeanGetter<FileRegister> fileRegister;
  public BeanGetter<FileLoadDao> fileLoadDao;

  public BeanGetter<FileStorage> fileStorage;


  @Test
  public void testSave() throws Exception {
  /*  String str = fileLoadDao.get().select("UjH7yy0HlBIaHZPXs");
    System.out.println(str);
    FileUtil.base64ToBytes(str);*/

    byte data[] = getTestFileBytes();
    String str = FileUtil.base64ToBytes(data);
    System.out.println("str: " + str);
    FileModel file1 = new FileModel(null, "tests.png", "image/png", str);

    String id = fileRegister.get().save(file1, true);

    FileDataReader read = fileStorage.get().read(id);


    assertThat(read.name()).isEqualTo("tests.png");
    assertThat(read.mimeType()).isEqualTo("image/png");
    assertThat(read.dataAsArray()).isEqualTo(data);


    System.out.println("id: " + id);


  }

  private byte[] getTestFileBytes() throws IOException {
    InputStream resourceAsStream = TestResources.class.getResourceAsStream("test.pdf");
    int n;
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    while ((n = resourceAsStream.read()) != -1) {
      os.write(n);
    }
    return os.toByteArray();
  }


}