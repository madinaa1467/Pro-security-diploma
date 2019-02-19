package kz.diploma.prosecurity.register.test.dao.postgres;

import kz.diploma.prosecurity.register.beans.all.DaoImplFactory;
import kz.greetgo.depinject.core.BeanConfig;
import kz.greetgo.depinject.core.BeanScanner;

@BeanScanner
@BeanConfig(defaultFactoryClass = DaoImplFactory.class)
public class BeanConfigTestDao {}
