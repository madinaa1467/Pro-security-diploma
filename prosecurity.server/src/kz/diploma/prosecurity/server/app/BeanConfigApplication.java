package kz.diploma.prosecurity.server.app;

import kz.diploma.prosecurity.server.beans.BeanConfigServer;
import kz.greetgo.depinject.core.BeanConfig;
import kz.greetgo.depinject.core.Include;
import kz.diploma.prosecurity.register.beans.all.BeanConfigAll;

@BeanConfig
@Include({BeanConfigServer.class, BeanConfigAll.class})
public class BeanConfigApplication {}
