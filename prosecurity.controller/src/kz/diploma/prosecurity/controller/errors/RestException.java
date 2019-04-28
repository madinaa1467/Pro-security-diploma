package kz.diploma.prosecurity.controller.errors;

public class RestException extends RuntimeException {
  public final int statusCode;

  public RestException(int statusCode, String message) {
    super(message);
    this.statusCode = statusCode;
  }

  public RestException(int statusCode) {
    this(statusCode, null);
  }

  public RestException() {
    this(500, null);
  }

  public RestException(String message) {
    this(500, message);
  }
}
