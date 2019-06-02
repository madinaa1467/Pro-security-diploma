package kz.diploma.prosecurity.register.dao;

import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.register.model.PersonLogin;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface PersonDao {

  @Insert("insert into Person (id, username, encoded_password, surname, name, patronymic, email, actual) " +
    "values (#{toSave.id}, #{toSave.username}, #{toSave.password}, #{toSave.surname}, #{toSave.name}, " +
    "#{toSave.patronymic}, #{toSave.email}, 1)")
  void insertPerson(@Param("toSave") ToSave toSave);

  @Insert("insert into Person (id, username, surname, name, patronymic, img, email, actual) " +
    "values (#{toSave.id}, #{toSave.username}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}," +
    " #{toSave.img}, #{toSave.email}, 1)" +
    " on conflict (id) do update set\n" +
    "  username = excluded.username,\n" +
    "  img = excluded.img,\n" +
    "  surname = excluded.surname,\n" +
    "  name = excluded.name,\n" +
    "  patronymic = excluded.patronymic,\n" +
    "  email = excluded.email,\n" +
    "  actual = excluded.actual\n" +
    "    returning id;")
  void upsertPerson(@Param("toSave") ToSave toSave);

  @Select("select * from person where username = #{username} and actual = 1")
  PersonLogin selectByUsername(@Param("username") String username);

  @Update("update person set actual = 0 where id = #{id};")
  void deactualPerson(@Param("id") Long id);

  @Select("select id from person where email=#{email} limit 1")
  Long getPersonIdByEmail(@Param("email") String email);

  @Select("select id from person where username=#{username} limit 1")
  Long getPersonIdByUsername(@Param("username") String username);

  @Select("select id from person where id = #{id} and encoded_password =#{encoded_password};")
  Long checkPassword(@Param("id") Long id, @Param("encoded_password") String encoded_password);

  @Select("update person set encoded_password = #{encoded_password} where id \n" +
    "= #{id} returning id;")
  Long changePassword(@Param("id") Long id, @Param("encoded_password") String encoded_password);

  @Select("select img from person where id=#{id}")
  String getImgIdById(@Param("id") Long id);

  @Select("select count(1) from person_cans where user_can='MODERATOR' and person_id=#{personId}")
  Boolean isModerator(@Param("personId") Long personId);
}
