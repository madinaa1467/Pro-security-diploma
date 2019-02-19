package kz.diploma.prosecurity.debug.launchers;

import kz.diploma.prosecurity.debug.bean_containers.DebugBeanContainer;
import kz.greetgo.depinject.Depinject;
import kz.greetgo.depinject.gen.DepinjectUtil;
import kz.diploma.prosecurity.controller.util.Modules;

public class LaunchDebugServer {
  public static void main(String[] args) throws Exception {
    new LaunchDebugServer().run();
  }

  private void run() throws Exception {
    DepinjectUtil.implementAndUseBeanContainers(
      "kz.diploma.prosecurity.debug",
      Modules.standDir() + "/build/src_bean_containers");

    DebugBeanContainer container = Depinject.newInstance(DebugBeanContainer.class);

    container.server().start().join();
  }
}
