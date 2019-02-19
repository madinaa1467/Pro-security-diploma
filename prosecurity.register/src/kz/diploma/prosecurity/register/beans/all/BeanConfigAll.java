package kz.diploma.prosecurity.register.beans.all;

import kz.diploma.prosecurity.register.dao.postgres.BeanConfigPostgresDao;
import kz.diploma.prosecurity.register.impl.BeanConfigRegisterImpl;
import kz.greetgo.depinject.core.BeanConfig;
import kz.greetgo.depinject.core.BeanScanner;
import kz.greetgo.depinject.core.Include;
import kz.diploma.prosecurity.controller.controller.BeanConfigControllers;

@BeanConfig
@BeanScanner
@Include({BeanConfigRegisterImpl.class, BeanConfigPostgresDao.class, BeanConfigControllers.class})
public class BeanConfigAll {}
