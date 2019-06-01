package kz.diploma.prosecurity.controller.model;

public class NotificationEvent {
  public String cardNumber;
  public String title;
  public String body;
  public String action;

  public NotificationEvent() {
  }

  @Override
  public String toString() {
    return "NotificationEvent{" +
      "cardNumber='" + cardNumber + '\'' +
      ", title='" + title + '\'' +
      ", body='" + body + '\'' +
      ", action='" + action + '\'' +
      '}';
  }
}
