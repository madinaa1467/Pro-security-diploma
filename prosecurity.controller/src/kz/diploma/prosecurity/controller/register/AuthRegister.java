package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.PersonDisplay;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.greetgo.security.session.SessionIdentity;

public interface AuthRegister {
  SessionIdentity login(String username, String password);

  void resetThreadLocalAndVerifySession(String sessionId, String token);

  SessionHolder getSession();

  PersonDisplay displayPerson(String personId);

  void deleteSession(String sessionId);
}
