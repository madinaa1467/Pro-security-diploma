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
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.security.password.PasswordEncoder;

@Bean
@ControllerPrefix("/parent")
public class ParentController implements Controller {

  public BeanGetter<ParentRegister> parentRegister;
  public BeanGetter<PasswordEncoder> passwordEncoder;

  @ToJson
  @PublicAccess
  @OnPost("/register")
  public long register(@Json @Par("toSave") ToSave toSave) {
    toSave.password = passwordEncoder.get().encode(toSave.password);
    long id = parentRegister.get().register(toSave);
    return id;
  }

  @ToJson
//  @PublicAccess
  @OnGet("/getInfo")
  public ToSave getInfo(@Par("id") long id) {
    return  parentRegister.get().getInfo(id);
  }
}
