package kz.diploma.prosecurity.controller.model;

import java.util.ArrayList;
import java.util.List;

public class ParentDisplay {
  public long id;
  public String fio;
  public String username;
  public List<Child> children = new ArrayList<>();
  //todo change structure
}
