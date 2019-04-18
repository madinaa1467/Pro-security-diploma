package kz.diploma.prosecurity.controller.model;

import java.util.Date;

public class ChildEvent implements Comparable<ChildEvent>{
  public long id;
  public Date date;
  public String action;

  public long childId;
  public String fio;
  public String img;

  @Override
  public int compareTo(ChildEvent childEvent) {

    if(this.date == null || childEvent.date == null){
      return 0;
    }
    return this.date.compareTo(childEvent.date);
  }
}
