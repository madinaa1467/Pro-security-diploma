package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnPost;

@Bean
@ControllerPrefix("/notification")
public class NotificationController implements Controller {

  public BeanGetter<NotificationRegister> register;

  @OnPost("/register")
  public void register(@Par("fcmToken") String fcmToken) {
    register.get().register(fcmToken);
  }

  @OnPost("/unregister")
  public void unregister(@Par("fcmToken") String fcmToken) {
    register.get().unregister(fcmToken);
  }

}
