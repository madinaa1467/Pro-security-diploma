package kz.diploma.prosecurity.debug.bean_containers;

import kz.diploma.prosecurity.debug.beans.BeanConfigStand;
import kz.greetgo.depinject.core.BeanConfig;
import kz.greetgo.depinject.core.Include;
import kz.diploma.prosecurity.controller.controller.BeanConfigControllers;
import kz.diploma.prosecurity.register.beans.all.BeanConfigAll;

@BeanConfig
@Include({BeanConfigStand.class, BeanConfigControllers.class, BeanConfigAll.class})
public class BeanConfigForDebugBeanContainer {}
