package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import kz.diploma.prosecurity.register.model.PersonLogin;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface AuthDao {


  @Select("select p.id, p.surname||' '||p.name||' '||p.patronymic as fio, p.username\n" +
          "from parent as p\n" +
          "where username = #{username}")
  AccountInfo loadAccountInfo(@Param("username") String username);

  @Select("select * from parent where username = #{username} and actual = 1")
  PersonLogin selectByUsername(@Param("username") String username);
}
