package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.errors.IllegalLoginOrPassword;
import kz.diploma.prosecurity.controller.errors.NoAccountName;
import kz.diploma.prosecurity.controller.errors.NoAccountPermission;
import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.diploma.prosecurity.controller.model.UserInfo;
import kz.diploma.prosecurity.controller.register.AuthRegister;
import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.register.dao.AuthDao;
import kz.diploma.prosecurity.register.dao.PersonDao;
import kz.diploma.prosecurity.register.model.PersonLogin;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.security.password.PasswordEncoder;
import kz.greetgo.security.session.SessionIdentity;
import kz.greetgo.security.session.SessionService;

@Bean
public class AuthRegisterImpl implements AuthRegister {

  public BeanGetter<AuthDao> authDao;
  public BeanGetter<PersonDao> personDao;
  public BeanGetter<PasswordEncoder> passwordEncoder;
  public BeanGetter<SessionService> sessionService;
  private final ThreadLocal<SessionHolder> sessionDot = new ThreadLocal<>();
  public BeanGetter<NotificationRegister> notificationRegister;

  @Override
  public SessionIdentity login(String username, String password, Boolean mobile) {

    PersonLogin personLogin = personDao.get().selectByUsername(username);
    if (personLogin == null) {
      throw new NoAccountName();
    }

    if (mobile) {
      Boolean isModerator = personDao.get().isModerator(personLogin.id);
      if (isModerator) throw new NoAccountPermission();
    }

    if (!passwordEncoder.get().verify(password, personLogin.encodedPassword)) {
      throw new IllegalLoginOrPassword();
    }
    SessionHolder sessionHolder = new SessionHolder(personLogin.id, null);
    return sessionService.get().createSession(sessionHolder);
  }

  @Override
  public void resetThreadLocalAndVerifySession(String sessionId, String token) {
    sessionDot.set(null);
    if (!sessionService.get().verifyId(sessionId)) {
      return;
    }
    if (!sessionService.get().verifyToken(sessionId, token)) {
      return;
    }
    sessionDot.set(sessionService.get().getSessionData(sessionId));
  }

  @Override
  public SessionHolder getSession() {
    return sessionDot.get();
  }


  @Override
  public AccountInfo accountInfo(Long id) {
    AccountInfo ret = authDao.get().loadAccountInfo(id);
    if (ret == null) {
      throw new NullPointerException("No person with parentId = " + id);
    }
    return ret;
  }

  @Override
  public void deleteSession(String sessionId, String registrationId) {
    sessionService.get().removeSession(sessionId);
    notificationRegister.get().unregister(registrationId);
  }


  @Override
  public UserInfo getUserInfo(Long personId) {
    UserInfo ret = authDao.get().loadAccountInfo(personId).toUserInfo();
    ret.cans.addAll(authDao.get().getUserCans(personId));
    
    return ret;
  }
}
