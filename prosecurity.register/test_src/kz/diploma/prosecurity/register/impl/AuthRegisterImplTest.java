package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.register.test.dao.AuthTestDao;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import kz.diploma.prosecurity.controller.errors.IllegalLoginOrPassword;
import kz.diploma.prosecurity.controller.model.PersonDisplay;
import kz.diploma.prosecurity.controller.model.SessionHolder;
import kz.diploma.prosecurity.controller.model.UserCan;
import kz.diploma.prosecurity.controller.register.AuthRegister;
import kz.greetgo.security.password.PasswordEncoder;
import kz.greetgo.security.session.SessionIdentity;
import kz.greetgo.security.session.SessionService;
import kz.greetgo.util.RND;
import org.testng.annotations.Test;

import java.util.Arrays;

import static org.fest.assertions.api.Assertions.assertThat;

public class AuthRegisterImplTest extends ParentTestNg {

  public BeanGetter<AuthRegister> authRegister;

  public BeanGetter<PasswordEncoder> passwordEncoder;
  public BeanGetter<AuthTestDao> authTestDao;
  public BeanGetter<SessionService> sessionService;

  @Test
  public void login() {

    String id = RND.str(10);
    String username = RND.str(10);
    String password = RND.str(10);
    String encodedPassword = passwordEncoder.get().encode(password);

    authTestDao.get().insertPerson(id, username, encodedPassword);

    //
    //
    SessionIdentity identity = authRegister.get().login(username, password);
    //
    //

    assertThat(identity).isNotNull();
  }

  @Test(expectedExceptions = IllegalLoginOrPassword.class)
  public void login_noUsername() {
    //
    //
    authRegister.get().login(RND.str(10), RND.str(10));
    //
    //
  }

  @Test(expectedExceptions = IllegalLoginOrPassword.class)
  public void login_leftPassword() {
    String id = RND.str(10);
    String username = RND.str(10);
    String password = RND.str(10);
    String encodedPassword = passwordEncoder.get().encode(password);

    authTestDao.get().insertPerson(id, username, encodedPassword);

    //
    //
    authRegister.get().login(username, RND.str(10));
    //
    //
  }

  @Test(expectedExceptions = IllegalLoginOrPassword.class)
  public void login_nullPassword() {
    String id = RND.str(10);
    String username = RND.str(10);
    String password = RND.str(10);
    String encodedPassword = passwordEncoder.get().encode(password);

    authTestDao.get().insertPerson(id, username, encodedPassword);

    //
    //
    authRegister.get().login(username, null);
    //
    //
  }

  @Test(expectedExceptions = IllegalLoginOrPassword.class)
  public void login_emptyPassword() {
    String id = RND.str(10);
    String username = RND.str(10);
    String password = RND.str(10);
    String encodedPassword = passwordEncoder.get().encode(password);

    authTestDao.get().insertPerson(id, username, encodedPassword);

    //
    //
    authRegister.get().login(username, "");
    //
    //
  }

  @Test
  public void resetThreadLocalAndVerifySession_getSession_ok() {
    SessionHolder sessionHolder = new SessionHolder(RND.str(10), RND.str(10));
    SessionIdentity identity = sessionService.get().createSession(sessionHolder);

    //
    //
    authRegister.get().resetThreadLocalAndVerifySession(identity.id, identity.token);
    SessionHolder actual = authRegister.get().getSession();
    //
    //

    assertThat(actual).isNotNull();
    assertThat(actual.personId).isEqualTo(sessionHolder.personId);
    assertThat(actual.mode).isEqualTo(sessionHolder.mode);
  }

  @Test
  public void resetThreadLocalAndVerifySession_getSession_leftToken() {
    SessionHolder sessionHolder = new SessionHolder(RND.str(10), RND.str(10));
    SessionIdentity identity = sessionService.get().createSession(sessionHolder);

    //
    //
    authRegister.get().resetThreadLocalAndVerifySession(identity.id, RND.str(10));
    SessionHolder actual = authRegister.get().getSession();
    //
    //

    assertThat(actual).isNull();
  }

  @Test
  public void resetThreadLocalAndVerifySession_getSession_nullToken() {
    SessionHolder sessionHolder = new SessionHolder(RND.str(10), RND.str(10));
    SessionIdentity identity = sessionService.get().createSession(sessionHolder);

    //
    //
    authRegister.get().resetThreadLocalAndVerifySession(identity.id, null);
    SessionHolder actual = authRegister.get().getSession();
    //
    //

    assertThat(actual).isNull();
  }

  @Test
  public void resetThreadLocalAndVerifySession_getSession_emptyToken() {
    SessionHolder sessionHolder = new SessionHolder(RND.str(10), RND.str(10));
    SessionIdentity identity = sessionService.get().createSession(sessionHolder);

    //
    //
    authRegister.get().resetThreadLocalAndVerifySession(identity.id, "");
    SessionHolder actual = authRegister.get().getSession();
    //
    //

    assertThat(actual).isNull();
  }

  @Test
  public void resetThreadLocalAndVerifySession_getSession_leftSessionId() {
    //
    //
    authRegister.get().resetThreadLocalAndVerifySession(RND.str(10), null);
    SessionHolder actual = authRegister.get().getSession();
    //
    //

    assertThat(actual).isNull();
  }

  @Test
  public void displayPerson() {

    String id = RND.str(10);
    String username = RND.str(10);
    String password = RND.str(10);
    String encodedPassword = passwordEncoder.get().encode(password);

    authTestDao.get().insertPerson(id, username, encodedPassword);

    Arrays.stream(UserCan.values()).map(Enum::name).forEach(authTestDao.get()::upsert);

    authTestDao.get().personCan(username, UserCan.VIEW_ABOUT.name());
    authTestDao.get().personCan(username, UserCan.VIEW_USERS.name());

    String unknownCan = RND.str(10);
    authTestDao.get().upsert(unknownCan);
    authTestDao.get().personCan(username, unknownCan);

    String surname = RND.str(10);
    String name = RND.str(10);
    String patronymic = RND.str(10);
    authTestDao.get().updatePersonField(id, "surname", surname);
    authTestDao.get().updatePersonField(id, "name", name);
    authTestDao.get().updatePersonField(id, "patronymic", patronymic);

    //
    //
    PersonDisplay personDisplay = authRegister.get().displayPerson(id);
    //
    //

    assertThat(personDisplay).isNotNull();
    assertThat(personDisplay.fio).isEqualTo(surname + ' ' + name + ' ' + patronymic);
    assertThat(personDisplay.username).isEqualTo(username);
    assertThat(personDisplay.cans).contains(UserCan.VIEW_ABOUT);
    assertThat(personDisplay.cans).contains(UserCan.VIEW_USERS);
    assertThat(personDisplay.cans).hasSize(2);

  }

  @Test(expectedExceptions = NullPointerException.class)
  public void displayPerson_absent() {
    //
    //
    authRegister.get().displayPerson(RND.str(10));
    //
    //
  }

  @Test
  public void deleteSession() {

    SessionHolder sessionHolder = new SessionHolder(RND.str(10), RND.str(10));
    SessionIdentity identity = sessionService.get().createSession(sessionHolder);

    //
    //
    authRegister.get().deleteSession(identity.id);
    //
    //

    Object sessionData = sessionService.get().getSessionData(identity.id);
    assertThat(sessionData).isNull();
  }
}
