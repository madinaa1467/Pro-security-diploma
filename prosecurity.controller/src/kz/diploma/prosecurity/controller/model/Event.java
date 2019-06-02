package kz.diploma.prosecurity.controller.model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Event implements Comparable<Event> {
  public Long id;
  public Date date;
  public String time;
  public String action;
  public Long childId;
  public String fio;
  public String img;
  public String gender;
  public String entrance;
  public String cardNumber;


  public String when;
  public String timeUnit;


  private SimpleDateFormat timeFormat = new SimpleDateFormat("hh:mm:ss");

  @Override
  public int compareTo(Event event) {

    if (this.date == null || event.date == null) {
      return 0;
    }
    return this.date.compareTo(event.date);
  }

  public void setTime() {
    this.time = timeFormat.format(this.date);
  }

  private static SimpleDateFormat notificationTimeFormat = new SimpleDateFormat("hh:mm dd/mm/yyyy");

  public String getNotificationTime() {
    return notificationTimeFormat.format(this.date);
  }

  public NotificationEvent toNotificationEvent() {
    NotificationEvent e = new NotificationEvent();

    String strDate = getNotificationTime();

    e.cardNumber = this.cardNumber;
    e.title = this.fio;
    e.action = this.action;
    e.body = this.fio + " " + this.action + " at " + strDate + " by " + this.entrance + " entrance.";

    return e;
  }

}
