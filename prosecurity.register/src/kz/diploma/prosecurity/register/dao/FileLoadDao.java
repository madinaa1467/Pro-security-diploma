package kz.diploma.prosecurity.register.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface FileLoadDao {

  @Insert("INSERT INTO file_load_buffer (id, number, data) VALUES (#{id}, #{number}, #{data})")
  void insert(@Param("id") String id, @Param("number") int number, @Param("data") String data);

  @Select("SELECT max(number) FROM file_load_buffer WHERE id = #{id}")
  Integer maxNum(@Param("id") String id);

  @Delete("DELETE FROM file_load_buffer WHERE id = #{id};")
  void delete(@Param("id") String id);

  @Select("select string_agg(data, '') from (select data from file_load_buffer where id=#{id} order by number asc) t")
  String select(@Param("id") String id);
}
