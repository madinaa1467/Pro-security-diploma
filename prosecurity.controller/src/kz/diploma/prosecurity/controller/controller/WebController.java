package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.EventFilterWeb;
import kz.diploma.prosecurity.controller.model.EventWeb;
import kz.diploma.prosecurity.controller.register.WebRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Json;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;

import java.util.List;


@Bean
@ControllerPrefix("/web")
public class WebController implements Controller {

  public BeanGetter<WebRegister> webRegister;

  @ToJson
  @PublicAccess
  @OnGet("/moderator")
  public List<EventWeb> moderator(@Json @Par("filter") EventFilterWeb filter) {
    return webRegister.get().getModeratorEventList(filter);
  }

  @ToJson
  @PublicAccess
  @OnGet("/recentEvents")
  public List<EventWeb> getRecentEvents(@Json @Par("filter") EventFilterWeb filter) {
    return webRegister.get().getModeratorEventList(filter);
  }

  @ToJson
  @OnGet("/entrances")
  public List<String> entrances() {
    return webRegister.get().getParentEntrancesList();
  }

  @ToJson
  @OnGet("/lastEvent")
  public EventWeb lastEventChild() {
    return webRegister.get().getLastEvent();
  }
}
