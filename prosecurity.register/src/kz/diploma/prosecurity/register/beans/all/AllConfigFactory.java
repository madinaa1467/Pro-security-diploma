package kz.diploma.prosecurity.register.beans.all;

import kz.diploma.prosecurity.register.configs.DbConfig;
import kz.diploma.prosecurity.register.configs.FileStorageConfig;
import kz.greetgo.depinject.core.Bean;
import kz.diploma.prosecurity.register.util.LocalConfigFactory;

@Bean
public class AllConfigFactory extends LocalConfigFactory {

  @Bean
  public DbConfig createPostgresDbConfig() {
    return createConfig(DbConfig.class);
  }

  @Bean
  public FileStorageConfig createPostgresFileStorageConfig() {
    return createConfig(FileStorageConfig.class);
  }

}
