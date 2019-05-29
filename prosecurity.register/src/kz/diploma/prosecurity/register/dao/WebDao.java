package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.EventWeb;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

public interface WebDao {

  @Select("select distinct entrance from event;")
  ArrayList<String> getParentEntrancesList();


  @Select("select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as childId,\n" +
    "    c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as\n" +
    "    fio, c.name as firstName, c.surname as lastName, c.patronymic, c.img, c.gender as gender\n" +
    "    from child as c, event as e, parent_child as pc\n" +
    "    where c.id = e.child AND pc.child = c.id\n" +
    "    AND c.actual = 1 AND e.actual = 1 AND pc.actual = 1\n" +
    "    order by date desc\n" +
    "    limit 1;")
  EventWeb getLastEvent();


}
