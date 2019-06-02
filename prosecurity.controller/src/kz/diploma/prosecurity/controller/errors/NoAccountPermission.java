package kz.diploma.prosecurity.controller.errors;

public class NoAccountPermission extends RestError {
  public NoAccountPermission() {
    super(400, "You don't have permission.");
  }
}
