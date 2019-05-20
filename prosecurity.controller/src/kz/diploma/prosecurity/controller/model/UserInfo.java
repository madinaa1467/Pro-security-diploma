package kz.diploma.prosecurity.controller.model;

import java.util.HashSet;
import java.util.Set;

public class UserInfo {
  public String displayName;
  public String username;
  public Set<String> cans = new HashSet<>();

  public UserInfo() {}

  public UserInfo(String displayName, String username, Set<String> cans) {
    this.displayName = displayName;
    this.username = username;
    this.cans = cans;
  }
}
