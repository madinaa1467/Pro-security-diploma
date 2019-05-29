package kz.diploma.prosecurity.controller.model;

import java.text.SimpleDateFormat;
import java.util.Date;

public class EventWeb{
  public Long id;
  public Date date;
  public String time;
  public String action;
  public Long childId;
  public String fio;
  public String firstName;
  public String lastName;
  public String patronymic;
  public String img;
  public String gender;
  public Long parentId;
  public String parentFio;
  public String entrance;

  public String when;
  public String timeUnit;


  private SimpleDateFormat timeFormat = new SimpleDateFormat("hh:mm:ss");

  public void setTime() {
    this.time = timeFormat.format(this.date);
  }
}
