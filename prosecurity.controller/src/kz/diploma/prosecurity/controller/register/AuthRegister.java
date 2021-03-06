package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.diploma.prosecurity.controller.model.UserInfo;
import kz.greetgo.security.session.SessionIdentity;

public interface AuthRegister {
  SessionIdentity login(String username, String password, Boolean mobile);
  void resetThreadLocalAndVerifySession(String sessionId, String token);
  SessionHolder getSession();
  AccountInfo accountInfo(Long id);

  void deleteSession(String sessionId, String registrationId);

  UserInfo getUserInfo(Long personId);
}
