package kz.diploma.prosecurity.controller.model;

import java.util.Date;

public class Child {
  public Long id;
  public String fio;
  public String gender;
  public String img;
  public String surname;
  public String name;
  public String patronymic="";
  public Date birthDate;
  public String cardNumber;
  public int notification;

  public static Child getAllChildObject(){

    Child allChildrenObj = new Child();
    allChildrenObj.fio = "My children";
    allChildrenObj.id = Long.valueOf(0);

    return allChildrenObj;
  }
}

