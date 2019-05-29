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

  private BeanGetter<WebRegister> webRegister;

  @ToJson
  @PublicAccess
  @OnGet("/parent")
  public List<EventWeb> parent(@Json @Par("filter") EventFilterWeb filter) {
    return webRegister.get().getParentEventList(filter);
  }

  @ToJson
  @PublicAccess
  @OnGet("/moderator")
  public List<EventWeb> moderator(@Json @Par("filter") EventFilterWeb filter) {
    return webRegister.get().getModeratorEventList(filter);
  }

  @ToJson
  @OnGet("/entrances")
  public List<String> moderator() {
    return webRegister.get().getParentEntrancesList();
  }
}
