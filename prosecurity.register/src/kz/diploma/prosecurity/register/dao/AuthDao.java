package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.PersonDisplay;
import kz.diploma.prosecurity.controller.model.UserCan;
import kz.diploma.prosecurity.register.model.PersonLogin;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AuthDao {
  @Select("select * from person where username = #{username} and blocked = 0")
  PersonLogin selectByUsername(@Param("username") String username);

  @Select("select surname||' '||name||' '||patronymic as fio, username" +
    " from person where id = #{personId}")
  PersonDisplay loadDisplayPerson(@Param("personId") String personId);

  @Select("select user_can from person_cans where person_id = #{personId}")
  List<UserCan> loadCans(String personId);
}
