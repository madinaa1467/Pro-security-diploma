package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.EventFilterWeb;
import kz.diploma.prosecurity.controller.model.EventWeb;
import kz.diploma.prosecurity.controller.register.WebRegister;
import kz.diploma.prosecurity.register.dao.WebDao;
import kz.diploma.prosecurity.register.jdbcWeb.ModeratorEventListWeb;
import kz.diploma.prosecurity.register.jdbcWeb.ParentEventListWeb;
import kz.greetgo.db.Jdbc;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;

import java.util.List;

@Bean
public class WebRegisterImpl implements WebRegister {

  public BeanGetter<Jdbc> jdbc;
  public BeanGetter<WebDao> webDao;

  @Override
  public List<EventWeb> getModeratorEventList(EventFilterWeb filter) {
    return jdbc.get().execute(new ModeratorEventListWeb(filter));
  }

  @Override
  public List<EventWeb> getParentEventList(EventFilterWeb filter) {
    return jdbc.get().execute(new ParentEventListWeb(filter));
  }

   @Override
  public List<String> getParentEntrancesList() {
    return webDao.get().getParentEntrancesList();
  }


}
