package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.PersonDisplay;
import kz.diploma.prosecurity.register.model.PersonLogin;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface AuthDao {

  @Select("select p.surname||' '||p.name||' '||p.patronymic as fio, p.username, p.gender, p.birth_date\n" +
          "from parent as p\n" +
          "where id = #{parentId}")
  PersonDisplay loadDisplayPerson(@Param("personId") String parentId);

  @Select("select child from parent_child where parent = #{parentId};")
  int[] loadChildren(String parentId);


  @Select("select * from parent where username = #{username} and actual = 1")
  PersonLogin selectByUsername(@Param("username") String username);
}
