package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.register.model.PersonLogin;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface ParentDao {

  @Select("select * from parent where username = #{username} and actual = 1")
  PersonLogin selectByUsername(@Param("username") String username);

  @Select("select p.id\n" +
          "from parent as p\n" +
          "where username = #{username}")
  int getParentIdByUserName(@Param("username") String username);

  @Select("with parent as (insert into parent (username, encoded_password, surname, name, patronymic, gender, birth_date, actual) " +
          "values (#{toSave.username}, #{toSave.password}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}, " +
          "#{toSave.gender}, #{toSave.birth_date}, 1 )" +
          "returning id)\n" +
          "select * from parent")
  int insertParent(@Param("toSave") ToSave toSave);

  //todo убрать returing если не нужно будет
  @Insert("insert into parent (id, username, encoded_password, surname, name, patronymic, gender, birth_date, actual)" +
          "values (#{toSave.id},#{toSave.username}, #{toSave.password}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}, " +
          "#{toSave.gender}, #{toSave.birth_date}, 1 )" +
          "on conflict (id) do update set\n" +
          "  username = excluded.username,\n" +
          "  encoded_password = excluded.encoded_password,\n" +
          "  surname = excluded.surname,\n" +
          "  name = excluded.name,\n" +
          "  patronymic = excluded.patronymic,\n" +
          "  gender = excluded.gender,\n" +
          "  birth_date = excluded.birth_date,\n" +
          "  actual = excluded.actual\n" +
          "    returning id;")
  int upsertParent(@Param("toSave") ToSave toSave);

  @Insert("insert into parent_phone ( parent, number, type, actual)\n" +
          "values (#{parentId}, #{phone.number}, #{phone.type}, 1)\n" +
          "on conflict (parent, number) do update set\n" +
          "  type = excluded.type,\n" +
          "  actual = excluded.actual;")
  void upsertPhone(@Param("parentId") long parentId,
                   @Param("phone") Phone phone);


    @Update("update parent_phone set actual = 0 where parent " +
            "= #{parent}")
    void deactualPhone(@Param("parent") long parent);

    @Update("update parent set actual = 0 where id = #{id};")
    void deactualParent(@Param("id") long id);
}
