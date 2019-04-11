package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ChildDao {
  @Select("with cans as (\n" +
    "  select person_id, string_agg(user_can, ', ' order by user_can asc) as cans\n" +
    "  from person_cans\n" +
    "  group by person_id\n" +
    ")\n" +
    "\n" +
    "select id,\n" +
    "       surname||' '||substring(name from 1 for 1)||'. '||substring(patronymic from 1 for 1)||'.' as fio,\n" +
    "       username,\n" +
    "       to_char(birth_date, 'YYYY-MM-DD') as birthDate,\n" +
    "       cans\n" +
    "     from person\n" +
    "     left join cans pc on person_id = id\n" +
    "     where blocked = 0\n" +
    "     order by surname, name")
  List<ChildEvents> listMyChildrenEvents();

  @Select("select pc.child, c.name, c.gender\\n\" +\n" +
    "          \"from parent_child as pc, child as c\\n\" +\n" +
    "          \"where pc.parent =  #{parentId} AND pc.child = c.id AND c.actual = 1;")
  ChildEvents listMyChildEvent(String childID);
}