package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.Child;
import kz.diploma.prosecurity.controller.model.ChildToSave;
import kz.diploma.prosecurity.controller.model.Event;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface ChildDao {
  @Select("select c.id, c.surname||' '||c.name||' '||c.patronymic as fio, c.gender, c.img, c.name, c.surname, c" +
    ".patronymic, pc.notification, c.birth_date as birthDate, c.card_number as cardNumber\n" +
    "    from parent_child as pc, child as c\n" +
    "where pc.parent =  #{parentId} AND pc.child = c.id AND c.actual = 1 AND pc.actual = 1;")
  List<Child> loadChildren(Long parentId);

  @Insert("insert into Parent_child (parent, child, notification, actual)\n" +
    "values (#{parent}, #{child}, #{notification}, #{actual})\n" +
    "on conflict (parent, child) do update set\n" +
    "  notification = excluded.notification,\n" +
    "  actual = excluded.actual;")
  void upsertParentChild(@Param("parent") Long parent,
                         @Param("child") Long child,
                         @Param("notification") int notification,
                         @Param("actual") int actual);

  @Insert("insert into Child (id, card_number, surname, name, patronymic, gender, birth_date, img, actual)\n " +
    "values ( #{toSave.id}, #{toSave.cardNumber}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}," +
    "#{toSave.gender}, #{toSave.birthDate}, #{toSave.img}, 1);")
  Long insertChild(@Param("toSave") ChildToSave toSave);

  @Insert("insert into child (id, card_number, surname, name, patronymic, gender, birth_date, img, actual)" +
    "values (#{toSave.id}, #{toSave.cardNumber}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}, " +
    "#{toSave.gender}, #{toSave.birthDate}, #{toSave.img}, 1)" +
    "on conflict (id) do update set\n" +
    "  card_number = excluded.card_number,\n" +
    "  surname = excluded.surname,\n" +
    "  name = excluded.name,\n" +
    "  patronymic = excluded.patronymic,\n" +
    "  gender = excluded.gender,\n" +
    "  birth_date = excluded.birth_date,\n" +
    "  img = excluded.img,\n" +
    "  actual = excluded.actual\n" +
    "    returning id;")
  Long upsertChild(@Param("toSave") ChildToSave toSave);

  @Select("select img from child where id=#{id}")
  String getImgIdById(@Param("id") Long id);

  @Select("select c.id, c.surname||' '||c.name||' '||c.patronymic as fio, c.gender, c.name, c.surname, c.patronymic, pc.notification, c.birth_date as birthDate, c.card_number as cardNumber\n" +
    "from child as c, parent_child as pc\n" +
    "where pc.child = c.id and c.card_number = #{cardNumber} and c.actual = 1 limit 1;")
  Child getChildByCard(@Param("cardNumber") String cardNumber);


  @Select("select c.id, c.surname||' '||c.name||' '||c.patronymic as fio, c.gender, c.name, c.surname,\n" +
    "  c.patronymic, pc.notification, c.birth_date as birthDate, c.card_number as cardNumber\n" +
    "from child as c, parent_child as pc, card\n" +
    "  where pc.child = c.id and c.card_number = card.card_number and card.in_hex = #{cardNumberInHex} and c.actual =" +
    " 1 limit 1;")
  Child getChildByCardHex(@Param("cardNumberInHex") String cardNumberInHex);

  @Select("select c.id, c.surname||' '||c.name||' '||c.patronymic as fio, c.gender, c.name, c.surname, c.patronymic, pc.notification, c.birth_date as birthDate, c.card_number as cardNumber\n" +
    "from child as c, parent_child as pc\n" +
    "where pc.child = c.id and c.id = #{childId} and c.actual = 1;")
  Child getChildById(@Param("childId") Long childId);

  @Select("select actual\n" +
    "from card\n" +
    "where card_number = #{cardNumber};")
  Integer checkCard(@Param("cardNumber") String cardNumber);

  @Select("select actual\n" +
    "from card\n" +
    "where card_number = #{cardNumber} and password = #{password};")
  Integer checkCardPassword(@Param("cardNumber") String cardNumber, @Param("password") String password);

  @Update("update child\n" +
    "set card_number = #{cardNumber}\n" +
    "where id = #{childId};")
  void updateChildCard(@Param("cardNumber") String cardNumber, @Param("childId") Long childId);

  @Update("update child\n" +
    "set actual = 0\n" +
    "where id = #{childId};")
  void deactualChildForever(@Param("childId") Long childId);


  @Update("update event\n" +
    "set actual = 0\n" +
    "where child = #{childId};")
  void deactualChildEventsForever(@Param("childId") Long childId);


  @Update("update parent_child\n" +
    "set actual = 0\n" +
    "where child = #{childId};")
  void deactualParentChildForever(@Param("childId") Long childId);


  @Update("update parent_child\n" +
    "set actual = 0\n" +
    "where child = #{childId} and parent= #{parentId};")
  void deactualParentChild(@Param("parentId") Long parentId, @Param("childId") Long childId);

  @Select("select c.id\n" +
    "from child as c, parent_child as pc\n" +
    "where pc.parent = #{parentId} and pc.child = c.id;")
  Long[] getChildIdByParent(@Param("parentId") Long parentId);

  @Select("select  e.id, to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date, e.action, c.id as childId,\n" +
    "              c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as" +
    " fio, c.img, c.gender as gender\n" +
    "from child as c, event as e, parent_child as pc\n" +
    "where c.id = #{childId} AND c.id = e.child AND pc.child = c.id AND pc.parent = #{parentId}\n" +
    "      AND c.actual = 1 AND e.actual = 1 AND pc.actual = 1\n" +
    "order by date desc\n" +
    "limit 1;")
  Event getChildLastEvent(@Param("parentId") Long parentId, @Param("childId") Long childId);


  @Insert("insert into Event (id, action, entrance, date, child, actual) " +
    "values (#{event.id}, #{event.action}, #{event.entrance}, #{event.date}, #{event.childId}, 1)")
  void insertEvent(@Param("event") Event event);

  @Select("select parent from parent_child where child=#{childId}")
  List<Long> selectParentIds(@Param("childId") Long childId);
}
