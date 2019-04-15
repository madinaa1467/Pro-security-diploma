package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import kz.diploma.prosecurity.controller.model.EventFilter;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ChildDao {

  @Results({
          @Result(property = "id", column = "id"),
          @Result(property = "fio", column = "fio"),
          @Result(property = "events", javaType = List.class, column = "{childId = id}", many = @Many(select = "getEventsByChild"))
  })
  @Select("select  c.id,\n" +
          "        c.name as fio\n" +
          "from parent_child as pc, child as c\n" +
          "where c.actual = 1  AND pc.child = c.id AND pc.actual = 1 AND pc.parent = #{parentId}\n" +
          "order by c.surname, c.name;")
  List<ChildEvents> listAllEvents(@Param("parentId") long parentId, @Param("filter") EventFilter filter);


  @Select("select id, action, to_char(date, 'YYYY-MM-DD HH24:MI:SS')\n" +
          "from  event\n" +
          "where  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59' AND child = #{filter.childId}\n" +
          "order by date desc\n" +
          "limit 10")
  List<ChildEvents> getEventsByChild(@Param("childId") long childId, @Param("filter") EventFilter filter);



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
}
