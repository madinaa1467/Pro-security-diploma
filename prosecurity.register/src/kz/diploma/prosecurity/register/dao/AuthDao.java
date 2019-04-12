package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.Child;
import kz.diploma.prosecurity.controller.model.ParentDisplay;
import kz.diploma.prosecurity.register.model.PersonLogin;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AuthDao {

  @Select("select p.id, p.surname||' '||p.name||' '||p.patronymic as fio, p.username\n" +
          "from parent as p\n" +
          "where id = #{parentId}")
  ParentDisplay loadDisplayParent(@Param("parentId") String parentId);

  @Select("select pc.id, pc.child, c.name, c.gender\n" +
          "from parent_child as pc, child as c\n" +
          "where pc.parent =  #{parentId} AND pc.child = c.id AND c.actual = 1;")
  List<Child> loadChildren(String parentId);


  @Select("select * from parent where username = #{username} and actual = 1")
  PersonLogin selectByUsername(@Param("username") String username);
}
