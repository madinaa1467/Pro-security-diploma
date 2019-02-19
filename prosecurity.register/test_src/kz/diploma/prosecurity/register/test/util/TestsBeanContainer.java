package kz.diploma.prosecurity.register.test.util;

import kz.greetgo.depinject.core.BeanContainer;
import kz.greetgo.depinject.core.Include;
import kz.diploma.prosecurity.register.test.beans.develop.DbLoader;
import kz.diploma.prosecurity.register.test.beans.develop.DbWorker;

@Include(BeanConfigTests.class)
public interface TestsBeanContainer extends BeanContainer {
  DbWorker dbWorker();

  DbLoader dbLoader();
}
