package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.AccountInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface AuthDao {


  @Select("select p.id, p.surname||' '||p.name||' '||p.patronymic as fio, p.username, p.img\n" +
          "from parent as p\n" +
          "where id = #{parentId}")
  AccountInfo loadAccountInfo(@Param("parentId") Long parentId);
}
