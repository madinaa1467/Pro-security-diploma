package kz.diploma.prosecurity.register.util;

import kz.greetgo.conf.hot.FileConfigFactory;

public abstract class LocalConfigFactory extends FileConfigFactory {
  @Override
  protected String getBaseDir() {
    return App.appDir() + "/conf";
  }
}
