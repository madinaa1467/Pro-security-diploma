package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.Child;
import kz.diploma.prosecurity.controller.model.Event;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;

public interface ChildDao {
  @Select("select c.id, c.surname||' '||c.name||' '||c.patronymic as fio, c.gender\n" +
          "    from parent_child as pc, child as c\n" +
          "where pc.parent =  #{parentId} AND pc.child = c.id AND c.actual = 1;")
  List<Child> loadChildren(Long parentId);

  @Insert("insert into Parent_child (parent, child, actual) " +
          "values (#{parent}, #{child}, #{actual})")
  void insertParentChild(@Param("parent") long parent,
                         @Param("child") int child,
                         @Param("actual") int actual);

  @Insert("insert into Child (id, actual, surname, name, patronymic, gender," +
          "birth_date) " +
          "values (#{id}, #{actual}, #{surname}, #{name}, #{patronymic}, " +
          "#{gender}, #{birth_date} )")
  void insertChild(@Param("id") long id,
                   @Param("surname") String surname,
                   @Param("name") String name,
                   @Param("patronymic") String patronymic,
                   @Param("gender") String gender,
                   @Param("birth_date") Date birth_date,
                   @Param("actual") int actual);



  @Select("select c.id\n" +
    "from child as c, parent_child as pc\n" +
    "where pc.parent = #{parentId} and pc.child = c.id;")
  int[] getParentChildId(@Param("parentId") long parentId);

//todo notification should be on inside children
  @Select("select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as childId,\n" +
    "              c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio, c.gender as gender\n" +
    "from child as c, event as e\n" +
    "where c.id = #{childId} AND c.id = e.child\n" +
    "      AND c.actual = 1 AND e.actual = 1\n" +
    "order by date desc\n" +
    "limit 1;")
  Event getChildLastEvent(@Param("childId") long childId);


  @Insert("insert into Event (action, date, child, actual) " +
          "values (#{action}, #{date}, #{child}, #{actual})")
  void insertEvent(@Param("action") String action,
                   @Param("child") long child,
                   @Param("date") Date date,
                   @Param("actual") int actual
  );
}
