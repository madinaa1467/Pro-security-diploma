package kz.diploma.prosecurity.controller.model;

import java.util.ArrayList;
import java.util.List;

public class ChildEventList {
  public long id;
  public String fio;
  public String gender;
  public String img;
  public List<Event> events = new ArrayList<>();

}
