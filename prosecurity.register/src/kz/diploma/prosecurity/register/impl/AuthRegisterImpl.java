package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.errors.IllegalLoginOrPassword;
import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.register.AuthRegister;
import kz.diploma.prosecurity.register.dao.AuthDao;
import kz.diploma.prosecurity.register.dao.ParentDao;
import kz.diploma.prosecurity.register.model.PersonLogin;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.security.password.PasswordEncoder;
import kz.greetgo.security.session.SessionIdentity;
import kz.greetgo.security.session.SessionService;

@Bean
public class AuthRegisterImpl implements AuthRegister {

  public BeanGetter<AuthDao> authDao;
  public BeanGetter<ParentDao> parentDao;
  public BeanGetter<PasswordEncoder> passwordEncoder;
  public BeanGetter<SessionService> sessionService;
  private final ThreadLocal<SessionHolder> sessionDot = new ThreadLocal<>();

  @Override
  public SessionIdentity login(String username, String password) {

    PersonLogin personLogin = parentDao.get().selectByUsername(username);
    if (personLogin == null) {
      throw new IllegalLoginOrPassword();
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
  public AccountInfo accountInfo(String username) {
    AccountInfo ret = authDao.get().loadAccountInfo(username);
    if (ret == null) {
      throw new NullPointerException("No person with username = " + username);
    }
    return ret;
  }

  @Override
  public void deleteSession(String sessionId) {
    sessionService.get().removeSession(sessionId);
  }
}
