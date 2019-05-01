package kz.diploma.prosecurity.controller.model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Event implements Comparable<Event> {
  public long id;
  public Date date;
  public String time;
  public String action;
  public long childId;
  public String fio;
  public String img;


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
}
