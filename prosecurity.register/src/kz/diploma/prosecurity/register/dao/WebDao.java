package kz.diploma.prosecurity.register.dao;

import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

public interface WebDao {

  @Select("select distinct entrance from event;")
  ArrayList<String> getParentEntrancesList();
}
