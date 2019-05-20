package kz.diploma.prosecurity.controller.errors;

public class IllegalLoginOrPassword extends RestError {
  public IllegalLoginOrPassword() {
    super(400, "Не верен пользователь и/или пароль");
  }
}
