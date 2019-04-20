package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.greetgo.security.session.SessionIdentity;

public interface AuthRegister {
  SessionIdentity login(String username, String password);
  void resetThreadLocalAndVerifySession(String sessionId, String token);
  SessionHolder getSession();
  AccountInfo accountInfo(String username);
  void register(ToSave toSave);
  void deleteSession(String sessionId);
}
