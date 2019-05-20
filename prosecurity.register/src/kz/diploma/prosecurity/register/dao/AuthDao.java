package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Set;

public interface AuthDao {

  @Select("select p.id, p.surname||' '||p.name||' '||p.patronymic as fio, p.username, p.img\n" +
          "from person as p\n" +
          "where id = #{id}")
  AccountInfo loadAccountInfo(@Param("id") Long id);

  @Select("select user_can from person_cans where person_id=#{personId}")
  Set<String> getUserCans(@Param("personId") Long personId);
}
