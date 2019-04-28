package kz.diploma.prosecurity.register.configs;

import kz.greetgo.conf.hot.DefaultListSize;
import kz.greetgo.conf.hot.Description;
import kz.greetgo.depinject.core.Bean;

import java.util.List;

@Bean
@Description("Параметры доступа к БД FileStorage (используется только БД Postgresql)")
public interface FileStorageConfig {

  @Description("URL доступа к БД")
  @DefaultListSize(10)
  List<DbConnector> db();
}

