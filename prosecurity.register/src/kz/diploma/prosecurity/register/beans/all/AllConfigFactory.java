package kz.diploma.prosecurity.register.beans.all;

import kz.diploma.prosecurity.register.configs.DbConfig;
import kz.diploma.prosecurity.register.configs.FcmConfig;
import kz.diploma.prosecurity.register.configs.FileStorageConfig;
import kz.diploma.prosecurity.register.util.LocalConfigFactory;
import kz.greetgo.depinject.core.Bean;

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

  @Bean
  public FcmConfig createFcmConfig() {
    return createConfig(FcmConfig.class);
  }

}
