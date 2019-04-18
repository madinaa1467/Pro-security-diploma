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
  List<ChildEventList> listAllChildren(@Param("parentId") long parentId);

  @Select("select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, pc.child as childId,\n" +
    "  c.surname||' '||c.name||' '||c.patronymic as fio\n" +
    "from child as c, event as e, parent_child pc\n" +
    "where pc.parent = #{parentId} AND pc.child = c.id AND pc.child = e.child AND c.actual = 1\n" +
    "  AND e.actual = 1 AND pc.actual = 1\n" +
    "  AND  date BETWEEN #{filter.startDate} AND #{filter.endDate}\n" +
    "order by date desc\n" +
    "limit #{filter.limit}\n" +
    "offset #{filter.offset};")
  List<ChildEvent> getMyChildrenAllEvents(@Param("parentId") long parentId, @Param("filter") EventFilter filter);

  @Select("select pc.child, c.surname||' '||c.name||' '||c.patronymic as fio, c.gender\n" +
    "    from parent_child as pc, child as c\n" +
    "where pc.parent =  #{parentId} AND pc.child = c.id AND c.actual = 1;")
  List<Child> loadChildren(long parentId);


  @Select("select p.id\n" +
    "from parent as p\n" +
    "where username = #{username}")
  int getParentIdByUserName(@Param("username") String username);
}
