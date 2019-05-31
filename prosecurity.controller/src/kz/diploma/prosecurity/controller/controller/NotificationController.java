package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.controller.util.Controller;
import static kz.diploma.prosecurity.controller.util.ParSessionNames.PARENT_ID;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ParSession;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;

@Bean
@ControllerPrefix("/notification")
public class NotificationController implements Controller {

  public BeanGetter<NotificationRegister> register;

  @OnPost("/register")
  public void register(@ParSession(PARENT_ID) Long personId, @Par("registrationId") String registrationId) {
    register.get().register(personId, registrationId);
  }

  @OnGet("/unregister")
  public void unregister(@ParSession(PARENT_ID) Long personId, @Par("registrationId") String registrationId) {
    register.get().unregister(personId, registrationId);
  }

}
