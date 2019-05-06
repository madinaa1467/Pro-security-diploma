package kz.diploma.prosecurity.controller.errors;

public class ErrorMessage {
  public String code;
  public Object message;

  public ErrorMessage() {
  }

  public ErrorMessage(String code, Object message) {
    this.code = code;
    this.message = message;
  }

  @Override
  public String toString() {
    return "ErrorMessage{" +
        "code='" + code + '\'' +
        ", message=" + message +
        '}';
  }
}
