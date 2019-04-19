package kz.diploma.prosecurity.register.dao;

public class TESTTESTTEST {
    /*
   insert into child(id, surname, name, patronymic, gender, birth_date, actual)
values (1, 'Asyl', 'Aisha', 'Asla', 'female', '2001-09-28', true),
 (2, 'Kasymzhan', 'Arman', 'Adam', 'male', '2001-09-28', true),
 (3, 'Ermekova', 'Altyn', 'Iman kyzy', 'female', '2001-09-28', true),
 (4, 'Asanov', 'Syrym', 'Asanovich', 'male', '2001-09-28', true);


select p.surname||' '||p.name||' '||p.patronymic as fio, p.gender, p.birth_date
from parent as p
where id = 1;


select child from parent_child where parent = 1;

select pc.child, c.name, c.gender
from parent_child as pc, child as c
where pc.parent = 1 AND pc.child = c.id AND c.actual = 1;

select  c.id, c.surname||' '||c.name||' '||c.patronymic as fio, e.id, e.action, e.date
from child as c, event as e
where c.id = 1 AND c.actual = 1 AND e.actual = 1;

with cans as (
      select person_id, string_agg(user_can, ', ' order by user_can asc) as cans
      from person_cans
      group by person_id
    )
    select id,
           surname||' '||substring(name from 1 for 1)||'. '||substring(patronymic from 1 for 1)||'.' as fio,
           username,
           to_char(birth_date, 'YYYY-MM-DD') as birthDate,
           cans
         from person
         left join cans pc on person_id = id
         where blocked = 0
       order by surname, name;


select  c.id, c.surname||' '||c.name||' '||c.patronymic as fio, e.id, e.action, e.date
from child as c, event as e
where c.id = 1 AND c.actual = 1 AND e.actual = 1;


select  c.id, c.surname||' '||c.name||' '||c.patronymic as fio, e.id, e.action, e.date
from child as c, event as e, parent_child pc
where pc.parent = 1 AND c.actual = 1 AND e.actual = 1 AND pc.actual = 1;

with cans as (
    select person_id, string_agg(user_can, ', ' order by user_can asc) as cans
    from person_cans
    group by person_id
    )
select id,
       surname||' '||substring(name from 1 for 1)||'. '||substring(patronymic from 1 for 1)||'.' as fio,
       username,
       to_char(birth_date, 'YYYY-MM-DD') as birthDate,
       cans
from person
       left join cans pc on person_id = id
where blocked = 0
order by surname, name;


-- select witjout limit
with events as (
    select child, string_agg(action||';'||to_char(date, 'YYYY-MM-DD HH24:MI:SS'), ', ' order by date desc) as events
    from event
    group by child
    )
select c.id,
       surname||' '||substring(name from 1 for 1)||'. '||substring(patronymic from 1 for 1)||'.' as fio,
       to_char(birth_date, 'YYYY-MM-DD HH24:MI:SS') as birthDate,
       events
from child as c
       left join events e on e.child = c.id
where c.actual = 1
order by surname, name;

-- select with limit for all
with events as (
    select child, string_agg(action||';'||to_char(date, 'YYYY-MM-DD HH24:MI:SS'), ', ') as events
    FROM  (
          SELECT date, action, child
          FROM   event
          order by date desc
          LIMIT  4
          ) sub
    group by child
    )
select c.id,
       surname||' '||substring(name from 1 for 1)||'. '||substring(patronymic from 1 for 1)||'.' as fio,
       to_char(birth_date, 'YYYY-MM-DD HH24:MI:SS') as birthDate,
       events
from child as c
       left join events e on e.child = c.id
where c.actual = 1
order by surname, name;



-- select with limit and time filter
with events as (
    select child, string_agg(action||';'||to_char(date, 'YYYY-MM-DD HH24:MI:SS'), ', ') as events
    FROM  (
          SELECT date, action, child
          FROM   event
          where  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59'
          order by date desc
          LIMIT  10
--     offset 1
          ) sub
    group by child
    )
select  c.id,
       c.surname||' '||substring(c.name from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio,
       to_char(birth_date, 'YYYY-MM-DD HH24:MI:SS') as birthDate,
       events
from parent_child as pc, child as c
       left join events e on e.child = c.id
where c.actual = 1  AND pc.child = c.id AND pc.actual = 1 AND pc.parent = 1
order by c.surname, c.name;


-- select with limit and time filter for 1
with events as (
    select child, string_agg(action||';'||to_char(date, 'YYYY-MM-DD HH24:MI:SS'), ', ') as events
    FROM  (
          SELECT date, action, child
          FROM   event
          where  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59'
          order by date desc
          LIMIT  2
          ) sub
    group by child
    )
select  c.id,
        c.surname||' '||substring(c.name from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio,
        to_char(birth_date, 'YYYY-MM-DD HH24:MI:SS') as birthDate,
        events
from child as c
        left join events e on e.child = c.id
where c.actual = 1  AND c.id = 1;



select  c.id,
        c.name as fio
from parent_child as pc, child as c
where c.actual = 1  AND pc.child = c.id AND pc.actual = 1 AND pc.parent = 1
order by c.surname, c.name;


select id, action, to_char(date, 'YYYY-MM-DD HH24:MI:SS')
from  event
where  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59' AND child = 1
order by date desc
limit 10

     */


    //list sort array List by ChildEvent ////////////// https://dev.to/codebyamir/sort-a-list-of-objects-by-field-in-java-3coj
//    List<Child> children = childDao.get().loadChildren(parentId);
////    children.forEach((child) -> {
////      filter.childId = child.id;
////      childDao.get().getEventsByChild(filter).forEach((event) -> {
////        myChildrenEventList.add(new ChildEvent(event.id, event.date, event.action, child.id, child.fio, child.img));
////      });
////    });
//    for (int i = 0; i < children.size(); i++) {
//    Child child = children.get(i);
//    filter.childId = child.id;
//    List<Event> events = childDao.get().getEventsByChild(filter);
//    events.forEach((event) -> {
//      myChildrenEventList.add(new ChildEvent(event.id, event.date, event.action, child.id, child.fio, child.img));
//    });
//  }
//    Collections.sort(myChildrenEventList);
}
