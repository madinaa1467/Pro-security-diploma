package kz.diploma.prosecurity.register.beans.all;

import kz.diploma.prosecurity.register.configs.FcmConfig;
import kz.diploma.prosecurity.register.service.FcmService;
import kz.diploma.prosecurity.register.service.impl.FcmServiceImpl;
import kz.diploma.prosecurity.register.util.App;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

@Bean
public class FcmServiceFactory {

  public BeanGetter<FcmConfig> config;

  @Bean
  public FcmService createFcmService() {
    return new FcmServiceImpl(App.appDir() + "/" + config.get().filePath());
  }

}
