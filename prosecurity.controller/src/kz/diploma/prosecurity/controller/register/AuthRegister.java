package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.ParentDisplay;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.greetgo.security.session.SessionIdentity;

public interface AuthRegister {
  SessionIdentity login(String username, String password);

  void resetThreadLocalAndVerifySession(String sessionId, String token);

  SessionHolder getSession();

  ParentDisplay displayParent(String username);

  void deleteSession(String sessionId);
}
