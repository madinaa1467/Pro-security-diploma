package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;

import java.util.List;

@Bean
@ControllerPrefix("/child")
public class ChildController implements Controller {

  public BeanGetter<ChildRegister> childRegister;

  @ToJson
  @OnGet("/listMyChildren")
  public List<ChildEvents> list() {
    return childRegister.get().listMyChildren();
  }

}
