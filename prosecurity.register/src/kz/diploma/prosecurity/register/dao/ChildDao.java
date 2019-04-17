package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ChildDao {

  @Results({
          @Result(property = "id", column = "id"),
          @Result(property = "fio", column = "fio"),
//          @Result(property = "events", javaType = List.class, column = "{childId = id}", many = @Many(select = "getEventsByChild"))
  })
  @Select("select  c.id,\n" +
          "        c.name as fio\n" +
          "from parent_child as pc, child as c\n" +
          "where c.actual = 1  AND pc.child = c.id AND pc.actual = 1 AND pc.parent = #{parentId}\n" +
          "order by c.surname, c.name;")
  List<ChildEvents> listAllChildren(@Param("parentId") long parentId);

  @Select("select id, date, action\n" +
          "from  event\n" +
//          "where  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59' AND child = #{filter.childId}\n" +
          "where  date BETWEEN #{filter.startDate} AND #{filter.endDate} AND child = #{filter.childId}\n" +
          "order by date desc\n" +
          "limit #{filter.limit}\n" +
          "offset #{filter.offset}")
  List<Event> getEventsByChild(@Param("filter") EventFilter filter);



  @Select("with events as (\n" +
          "    select child, string_agg(action||';'||to_char(date, 'YYYY-MM-DD HH24:MI:SS'), ', ') as events\n" +
          "    FROM  (\n" +
          "          SELECT date, action, child\n" +
          "          FROM   event\n" +
          "          where  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59'\n" +
          "          order by date desc\n" +
          "          LIMIT  2\n" +
          "          ) sub\n" +
          "    group by child\n" +
          "    )\n" +
          "select  c.id,\n" +
          "        c.surname||' '||substring(c.name from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio,\n" +
          "        to_char(birth_date, 'YYYY-MM-DD HH24:MI:SS') as birthDate,\n" +
          "        events\n" +
          "from child as c\n" +
          "        left join events e on e.child = c.id\n" +
          "where c.actual = 1  AND c.id = #{childId};")
  ChildEvents listEvents(@Param("childId") long childId);


  @Select("select pc.id, pc.child, c.name, c.gender\n" +
    "from parent_child as pc, child as c\n" +
    "where pc.parent =  #{parentId} AND pc.child = c.id AND c.actual = 1;")
  List<Child> loadChildren(long parentId);

  @Select("select p.id, p.surname||' '||p.name||' '||p.patronymic as fio, p.username\n" +
    "from parent as p\n" +
    "where username = #{username}")
  ParentChildList loadDisplayParent(@Param("username") String username);

  @Select("select p.id\n" +
    "from parent as p\n" +
    "where username = #{username}")
  int getParentIdByUserName(@Param("username") String username);
}
