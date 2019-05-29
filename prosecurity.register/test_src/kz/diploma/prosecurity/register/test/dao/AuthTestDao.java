package kz.diploma.prosecurity.register.test.dao;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;

public interface AuthTestDao {
  @Insert("insert into Person (id, username, encoded_password, surname, name, patronymic,email, actual) " +
    "values (#{id}, #{username}, #{encodedPassword}, #{surname}, #{name}, #{patronymic}, #{email}, 1)")
  void insertPerson(@Param("id") Long id,
                    @Param("username") String username,
                    @Param("surname") String surname,
                    @Param("name") String name,
                    @Param("patronymic") String patronymic,
                    @Param("email") String email,
                    @Param("encodedPassword") String encodedPassword
  );

  @Update("update Person set ${fieldName} = #{fieldValue} where id = #{id}")
  void updatePersonField(@Param("id") String id,
                         @Param("fieldName") String fieldName,
                         @Param("fieldValue") Object fieldValue);

  @Insert("insert into user_can (user_can, description) values (#{can}, 'description of '||#{can})" +
    " on conflict (user_can) do nothing")
  void upsert(@Param("can") String can);

  @Insert("insert into person_cans (person_id, user_can)" +
    " select p.id as person_id, #{can} as user_can" +
    " from person p, user_can where p.username = #{username} and p.actual = 1" +
    " on conflict (person_id, user_can) do nothing")
  void personCan(@Param("username") String username, @Param("can") String can);


  @Insert("insert into Parent (id, actual, gender," +
          "birth_date) " +
          "values (#{id}, #{actual}, " +
          "#{gender}, #{birth_date})")
  void insertParent(@Param("id") Long id,
                    @Param("actual") int actual,
                    @Param("gender") String gender,
                    @Param("birth_date") Date birth_date);

  @Insert("insert into parent_phone ( parent, number, type, actual)\n" +
    "values (#{parentId}, #{phone.number}, #{phone.type}, 1)\n" +
    "on conflict (parent, number) do update set\n" +
    "  type = excluded.type,\n" +
    "  actual = excluded.actual;")
  void upsertPhone(@Param("parentId") Long parentId,
                   @Param("phone") Phone phone);


  @Insert("insert into child (id, card_number, actual, surname, name, patronymic, gender," +
          "birth_date) " +
          "values (#{id}, #{cardNumber}, #{actual}, #{surname}, #{name}, #{patronymic}, " +
          "#{gender}, #{birth_date} )")
  void insertChild(@Param("id") Long id,
                   @Param("cardNumber") String cardNumber,
                   @Param("surname") String surname,
                   @Param("name") String name,
                   @Param("patronymic") String patronymic,
                   @Param("gender") String gender,
                   @Param("birth_date") Date birth_date,
                   @Param("actual") int actual
  );

  @Insert("insert into Parent_child (parent, child, notification, actual) " +
    "values (#{parent}, #{child},#{notification}, #{actual})")
  void insertParentChild(@Param("parent") Long parent,
                         @Param("child") Long child,
                         @Param("notification") int notification,
                         @Param("actual") int actual
  );

  @Insert("insert into Event (action, entrance, date, child, actual) " +
          "values (#{action}, #{entrance}, #{date}, #{child}, #{actual})")
  void insertEvent(@Param("action") String action,
                   @Param("entrance") String entrance,
                   @Param("child") Long child,
                   @Param("date") Date date,
                   @Param("actual") int actual
  );

  @Insert("insert into Event (action, child, actual) " +
    "values (#{action}, #{child}, #{actual})")
  void insertEventWithoutDate(@Param("action") String action,
                   @Param("child") Long child,
                   @Param("actual") int actual
  );


  @Select("select * from parent where id=#{id} and actual=1")
  ToSave getInfo(@Param("id") Long id);

  @Insert("insert into card (card_number, in_hex, in_dec, password, actual) " +
    "values (#{cardNumber}, #{inHex}, #{inDec}, #{password}, 1)")
  void insertCard(@Param("cardNumber") String cardNumber,
                  @Param("inHex") String inHex,
                  @Param("inDec") String inDec,
                  @Param("password") String password);
}
