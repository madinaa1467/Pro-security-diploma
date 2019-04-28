package kz.diploma.prosecurity.register.beans.all;

import kz.diploma.prosecurity.register.configs.DbConnector;
import kz.diploma.prosecurity.register.configs.FileStorageConfig;
import kz.diploma.prosecurity.register.util.MimeTypeConfigurator;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.file_storage.FileStorage;
import kz.greetgo.file_storage.impl.FileStorageBuilder;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.sql.DataSource;
import java.util.List;
import java.util.stream.Collectors;

@Bean
public class FileStorageFactory {

  private static final int TABLE_COUNT = 48;

  public static final int DB_COUNT = 10;

  public BeanGetter<FileStorageConfig> config;

  private DataSource convert(DbConnector connector) {
    BasicDataSource pool = new BasicDataSource();

    pool.setDriverClassName("org.postgresql.Driver");
    pool.setUrl(connector.url);
    pool.setPassword(connector.password);
    pool.setUsername(connector.username);

    pool.setInitialSize(0);

    return pool;
  }

  @Bean
  public FileStorage create() {

    return FileStorageBuilder
      .newBuilder()
      .configureFrom(MimeTypeConfigurator.get())
      .mandatoryName(true)
      .mandatoryMimeType(true)
      .inMultiDb(checkSize(config.get().db().stream().map(this::convert).collect(Collectors.toList())))
      .setTableCountPerDb(TABLE_COUNT)
      .build();

  }

  private List<DataSource> checkSize(List<DataSource> list) {
    if (list.size() != DB_COUNT) {
      throw new RuntimeException("Left Db Count: must be = " + DB_COUNT + ", actual is " + list.size());
    }
    return list;
  }
}
