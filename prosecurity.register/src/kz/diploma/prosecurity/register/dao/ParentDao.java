package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface ParentDao {

  @Select("select parent.id, person.username, person.surname, person.name, person.patronymic, person.img," +
    " parent.gender, parent.birth_date as birthDate, person.email" +
    " from parent, person where parent.id = #{id} and person.id = parent.id" +
    " and parent.actual = 1 and person.actual = 1")
  ToSave getInfo(@Param("id") Long id);

  @Select("select * from parent_phone where parent = #{parent} and actual = 1")
  Phone[] getPhones(@Param("parent") Long parent);

  @Select("insert into parent (id, gender, birth_date, actual) " +
    "values (#{toSave.id}, #{toSave.gender}, #{toSave.birthDate}, 1)")
  void insertParent(@Param("toSave") ToSave toSave);

  //todo убрать returing если не нужно будет
  @Insert("insert into parent (id, gender, birth_date, actual)" +
    "values (#{toSave.id}," +
    "#{toSave.gender}, #{toSave.birthDate}, 1)" +
    "on conflict (id) do update set\n" +
    "  gender = excluded.gender,\n" +
    "  birth_date = excluded.birth_date,\n" +
    "  actual = excluded.actual\n" +
    "    returning id;")
  Long upsertParent(@Param("toSave") ToSave toSave);

  @Insert("insert into parent_phone ( parent, number, type, actual)\n" +
    "values (#{parentId}, #{phone.number}, #{phone.type}, 1)\n" +
    "on conflict (parent, number) do update set\n" +
    "  type = excluded.type,\n" +
    "  actual = excluded.actual;")
  void upsertPhone(@Param("parentId") Long parentId,
                   @Param("phone") Phone phone);


  @Update("update parent_phone set actual = 0 where parent " +
    "= #{parent}")
  void deactualPhone(@Param("parent") Long parent);

  @Update("update parent set actual = 0 where id = #{id};")
  void deactualParent(@Param("id") Long id);

}
