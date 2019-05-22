package kz.diploma.prosecurity.controller.model;

import java.util.HashSet;
import java.util.Set;

public class UserInfo {
  public String displayName;
  public String username;
  public String img;
  public Set<String> cans = new HashSet<>();

  public UserInfo() {}

  public UserInfo(String displayName, String username, String img, Set<String> cans) {
    this.displayName = displayName;
    this.username = username;
    this.img = img;
    this.cans = cans;
  }
}
