package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Json;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnPost;


@Bean
@ControllerPrefix("/web")
public class WebController implements Controller {

  public BeanGetter<ParentRegister> parentRegister;

  @ToJson
  @PublicAccess
  @OnPost("/register")
  public Long register(@Json @Par("toSave") ToSave toSave) {
    return parentRegister.get().register(toSave);
  }



}
