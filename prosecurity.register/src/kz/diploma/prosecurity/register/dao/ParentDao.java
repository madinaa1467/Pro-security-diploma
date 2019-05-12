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


    @Select("select * from parent where id = #{id} and actual = 1")
    ToSave getInfo(@Param("id") Long id);

    @Select("select * from parent_phone where parent = #{parent} and actual = 1")
    Phone[] getPhones(@Param("parent") Long parent);

    @Select("with parent as (insert into parent (id, email, username, encoded_password, surname, name, patronymic, gender, birth_date, actual) " +
            "values (nextval('pro_seq'), #{toSave.email}, #{toSave.username}, #{toSave.password}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}, " +
            "#{toSave.gender}, #{toSave.birthDate}, 1 )" +
            "returning id)\n" +
            "select * from parent")
    Long insertParent(@Param("toSave") ToSave toSave);

    //todo убрать returing если не нужно будет
    @Insert("insert into parent (id, username, surname, name, patronymic, gender, birth_date, email, actual)" +
            "values (#{toSave.id}, #{toSave.username}, #{toSave.surname}, #{toSave.name}, #{toSave.patronymic}, " +
            "#{toSave.gender}, #{toSave.birthDate}, #{toSave.email}, 1)" +
            "on conflict (id) do update set\n" +
            "  username = excluded.username,\n" +
            "  surname = excluded.surname,\n" +
            "  name = excluded.name,\n" +
            "  patronymic = excluded.patronymic,\n" +
            "  gender = excluded.gender,\n" +
            "  birth_date = excluded.birth_date,\n" +
            "  email = excluded.email,\n" +
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

    @Select("select id from parent where email=#{email} limit 1")
    Long getParentIdByEmail(@Param("email") String email);

    @Select("select id from parent where username=#{username} limit 1")
    Long getParentIdByUsername(@Param("username") String username);

    @Select("select id from parent where id = #{id} and encoded_password =#{encoded_password};")
    Long checkPassword(@Param("id") Long id, @Param("encoded_password") String encoded_password);
}
