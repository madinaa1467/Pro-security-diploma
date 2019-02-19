package kz.diploma.prosecurity.server.app;

import kz.diploma.prosecurity.server.beans.AppInitializer;
import kz.greetgo.depinject.core.BeanContainer;
import kz.greetgo.depinject.core.Include;

@Include(BeanConfigApplication.class)
public interface ApplicationBeanContainer extends BeanContainer {
  AppInitializer appInitializer();
}
