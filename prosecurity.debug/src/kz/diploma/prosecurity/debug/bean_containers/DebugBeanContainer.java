package kz.diploma.prosecurity.debug.bean_containers;

import kz.diploma.prosecurity.debug.beans.DebugServer;
import kz.greetgo.depinject.core.BeanContainer;
import kz.greetgo.depinject.core.Include;

@Include(BeanConfigForDebugBeanContainer.class)
public interface DebugBeanContainer extends BeanContainer {
  DebugServer server();
}
