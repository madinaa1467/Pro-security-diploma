package kz.diploma.prosecurity.register.test.util;

import kz.diploma.prosecurity.register.beans.all.BeanConfigAll;
import kz.greetgo.depinject.core.BeanConfig;
import kz.greetgo.depinject.core.Include;
import kz.diploma.prosecurity.register.test.beans.BeanConfigTestBeans;
import kz.diploma.prosecurity.register.test.dao.postgres.BeanConfigTestDao;

@BeanConfig
@Include({BeanConfigTestDao.class, BeanConfigTestBeans.class, BeanConfigAll.class})
public class BeanConfigTests {}
