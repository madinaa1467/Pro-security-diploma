package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.UserInfo;
import kz.diploma.prosecurity.controller.register.AuthRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
import static kz.diploma.prosecurity.controller.util.ParSessionNames.PARENT_ID;
import static kz.diploma.prosecurity.controller.util.ParSessionNames.SESSION_ID;
import kz.diploma.prosecurity.controller.util.ProSecurityViews;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.AsIs;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ParSession;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;
import kz.greetgo.mvc.interfaces.TunnelCookies;
import kz.greetgo.security.session.SessionIdentity;

@Bean
@ControllerPrefix("/auth")
public class AuthController implements Controller {

  public BeanGetter<AuthRegister> authRegister;

  @AsIs
  @PublicAccess
  @OnGet("/probe")
  public String probe() {
    return "System is working <b>OK</b>";
  }

  @AsIs
  @PublicAccess
  @OnPost("/login")
  public String login(@Par("username") String username,
                      @Par("password") String password,
                      TunnelCookies cookies) {

    SessionIdentity identity = authRegister.get().login(username, password);

    cookies.forName(ProSecurityViews.P_SESSION)
      .path("/")
      .httpOnly(true)
      .maxAge(-1)
      .saveValue(identity.id);

    return identity.token;
  }

  @ToJson
  @OnGet("/accountInfo")
  public AccountInfo accountInfo(@ParSession(PARENT_ID) Long id) {
    return authRegister.get().accountInfo(id);
  }

  @AsIs
  @PublicAccess
  @OnGet("/exit")
  public void exit(@Par("registrationId") String registrationId, @ParSession(SESSION_ID) String sessionId,
                   TunnelCookies cookies) {

    authRegister.get().deleteSession(sessionId, registrationId);

    cookies.forName(ProSecurityViews.P_SESSION)
      .path("/")
      .remove();
  }

  @ToJson
  @OnGet("/user-info")
  public UserInfo userInfo(@ParSession(PARENT_ID) Long personId) {
    return authRegister.get().getUserInfo(personId);
  }
}
