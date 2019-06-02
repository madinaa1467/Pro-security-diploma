package kz.diploma.prosecurity.controller.errors;

public class IllegalLoginOrPassword extends RestError {
  public IllegalLoginOrPassword() {
    super(400, "Sorry, Password or username is not correct!");
  }
}
