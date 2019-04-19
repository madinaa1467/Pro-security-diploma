package kz.diploma.prosecurity.controller.model;

import java.util.Date;

public class Event implements Comparable<Event>{
  public long id;
  public Date date;
  public String time;
  public String action;

  public long childId;
  public String fio;
  public String img;

  @Override
  public int compareTo(Event event) {

    if(this.date == null || event.date == null){
      return 0;
    }
    return this.date.compareTo(event.date);
  }
}
