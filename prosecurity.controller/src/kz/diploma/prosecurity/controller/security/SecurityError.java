package kz.diploma.prosecurity.controller.security;


import kz.diploma.prosecurity.controller.errors.RestError;

public class SecurityError extends RestError {
  public SecurityError() {
    this("Security error");
  }

  public SecurityError(String message) {
    super(401, message);
  }
}
