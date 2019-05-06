package kz.diploma.prosecurity.register.dao;

public class TESTTESTTEST {
    //  @Results({
//          @Result(property = "id", column = "id"),
//          @Result(property = "fio", column = "fio"),
////          @Result(property = "events", javaType = List.class, column = "{childId = id}", many = @Many(select = "getEventsByChild"))
//  })
//  @Select("select  c.id,\n" +
//          "        c.name as fio\n" +
//          "from parent_child as pc, child as c\n" +
//          "where c.actual = 1  AND pc.child = c.id AND pc.actual = 1 AND pc.parent = #{parentId}\n" +
//          "order by c.surname, c.name;")
//  List<ChildEventList> listAllChildren(@Param("parentId") long parentId);



    /*
    REINDEX TABLE my_table;


222222222

with parent as (insert into parent (username, encoded_password, surname, name, patronymic, gender, birth_date, actual)
          values ('usernam', 'encodedPassword', 'surname', 'name', 'patronymic', 'gender', null, 1)
    returning id)
select * from parent;


with parent as (insert into parent (username, encoded_password, surname, name, patronymic, gender, birth_date, actual)
          values ('aa', 'aa', 'aa', 'aa', 'aa', 'aa', null, 1 )
          returning id)
          select * from parent;

insert into parent (id, username, encoded_password, surname, name, patronymic, gender, birth_date, actual)
values (2, 'usernam23334', 'encodedPassword2', 'surname2', 'name2', 'patronymic2', 'gender', null, 1)
on conflict (id) do update set
  username = excluded.username,
  encoded_password = excluded.encoded_password,
  surname = excluded.surname,
  name = excluded.name,
  patronymic = excluded.patronymic,
  gender = excluded.gender,
  birth_date = excluded.birth_date,
  actual = excluded.actual;

select * from parent;

REINDEX TABLE parent;


insert into parent_phone ( parent, number, type, actual)
values (1, '+77777777', 'home', 1)
on conflict (parent, number) do update set
  type = excluded.type,
  actual = excluded.actual;



222222222





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


select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, pc.child,
  c.surname||' '||c.name||' '||c.patronymic as fio
from child as c, event as e, parent_child pc
where pc.parent = 1 AND pc.child = c.id AND pc.child = e.child AND c.actual = 1
  AND e.actual = 1 AND pc.actual = 1
  AND  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59'
order by date desc
limit 15
offset 0;


select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as child,
  c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio
from child as c, event as e
where c.id = 1 AND c.id = e.child
      AND c.actual = 1 AND e.actual = 1
      AND  date BETWEEN '2007-02-16' AND '2007-02-16 23:59:59'
order by date desc
limit 15
offset 0;




select pc.child, c.name, c.gender
    from parent_child as pc, child as c
    where pc.parent =  1 AND pc.child = c.id AND c.actual = 1;



select * from event where child = 1 order by date desc;


select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as child,
              c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio
from child as c, event as e
where c.id = 5 AND c.id = e.child
      AND c.actual = 1 AND e.actual = 1
order by date desc
limit 1;


select c.id
from child as c, parent_child as pc
where pc.parent = 1 and pc.child = c.id;


select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, pc.child as childId,
              c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio, c.gender as gender
from child as c, event as e, parent_child pc
where c.id = e.child AND pc.child = c.id AND pc.parent = #{parentId}
AND e.actual = 1 AND c.actual = 1 AND pc.actual = 1
AND  date BETWEEN #{filter.startDate} AND #{filter.endDate}
order by date desc
limit #{filter.limit}
offset #{filter.offset};



select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as child,
              c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio, c.gender as gender
from child as c, event as e
where c.id = e.child AND c.id = #{childId}
AND c.actual = 1 AND e.actual = 1
AND  date BETWEEN #{filter.startDate} AND #{filter.endDate}
order by date desc
limit #{filter.limit}
offset #{filter.offset};





   */


  // notification should be on inside children
  //если вдруг понадобится
/*
select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as childId,
              c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio, c.gender as gender
from child as c, event as e, parent_child pc
where c.id = 1 AND c.id = e.child and c.id = pc.child and pc.notification = 1
AND c.actual = 1 AND e.actual = 1
order by date desc
limit 1;
 */
}
