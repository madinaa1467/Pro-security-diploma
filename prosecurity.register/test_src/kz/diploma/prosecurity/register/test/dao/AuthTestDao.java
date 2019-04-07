package kz.diploma.prosecurity.register.test.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.Date;

public interface AuthTestDao {
  @Insert("insert into Person (id, username, encoded_password, blocked) " +
    "values (#{id}, #{username}, #{encodedPassword}, 0)")
  void insertPerson(@Param("id") String id,
                    @Param("username") String username,
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
    " from person p, user_can where p.username = #{username} and p.blocked = 0" +
    " on conflict (person_id, user_can) do nothing")
  void personCan(@Param("username") String username, @Param("can") String can);






  @Insert("insert into Parent (id, username, encoded_password, actual, surname, name, patronymic, gender," +
          "birth_date) " +
          "values (#{id}, #{username}, #{encodedPassword}, #{actual}, #{surname}, #{name}, #{patronymic}, " +
          "#{gender}, #{birth_date} )")
  void insertParent(@Param("id") int id,
                    @Param("username") String username,
                    @Param("encodedPassword") String encodedPassword,
                    @Param("actual") int actual,
                    @Param("surname") String surname,
                    @Param("name") String name,
                    @Param("patronymic") String patronymic,
                    @Param("gender") String gender,
                    @Param("birth_date") Date birth_date
  );

  @Insert("insert into ChildEvents (id, actual, surname, name, patronymic, gender," +
          "birth_date) " +
          "values (#{id}, #{actual}, #{surname}, #{name}, #{patronymic}, " +
          "#{gender}, #{birth_date} )")
  void insertChild(@Param("id") int id,
                   @Param("surname") String surname,
                   @Param("name") String name,
                   @Param("patronymic") String patronymic,
                   @Param("gender") String gender,
                   @Param("birth_date") Date birth_date,
                   @Param("actual") int actual
  );

  @Insert("insert into Parent_child (parent, child, actual) " +
          "values (#{parent}, #{child}, #{actual})")
  void insertParentChild(@Param("parent") int parent,
                   @Param("child") int child,
                   @Param("actual") int actual
  );

  @Insert("insert into Event (action, date, child, actual) " +
          "values (#{action}, #{date}, #{child}, #{actual})")
  void insertEvent(@Param("action") String action,
                   @Param("child") int child,
                   @Param("date") Date date,
                   @Param("actual") int actual
  );

}
