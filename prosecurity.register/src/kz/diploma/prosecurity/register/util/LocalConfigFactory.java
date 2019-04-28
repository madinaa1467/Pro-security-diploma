package kz.diploma.prosecurity.register.util;

import kz.greetgo.conf.hot.ConfigStorage;
import kz.greetgo.conf.hot.FileConfigFactory;

public abstract class LocalConfigFactory extends FileConfigFactory {
  @Override
  protected String getBaseDir() {
    return App.appDir() + "/conf";
  }

  @Override
  public ConfigStorage getConfigStorage() {
    return super.getConfigStorage();
  }

  @Override
  public <T> String configLocationFor(Class<T> configInterface) {
    return super.configLocationFor(configInterface);
  }
}
