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
     */
}
