package kz.diploma.prosecurity.controller.model;

public class AccountInfo {
  public Long id;
  public String fio;
  public String img;
  public String username;

  public UserInfo toUserInfo() {
    UserInfo ret = new UserInfo();
    ret.displayName = fio == null ? username : fio;
    ret.username = username;
    return ret;
  }
}
