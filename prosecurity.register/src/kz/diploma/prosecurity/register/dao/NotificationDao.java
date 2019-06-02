package kz.diploma.prosecurity.register.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Set;

public interface NotificationDao {

  @Insert("insert into device_notification(person, registration_id)\n " +
    " values (#{personId}, #{registrationId})" +
    " on conflict (registration_id) do update set" +
    " person = excluded.person\n")
  Long registerDevice(@Param("personId") Long personId, @Param("registrationId") String registrationId);

  @Delete("delete from device_notification where registration_id=#{registrationId};")
  void unregisterDevice(@Param("registrationId") String registrationId);


  @Select("select dn.registration_id\n" +
    "from parent_child pc\n" +
    "inner join device_notification dn on pc.parent=dn.person\n" +
    "where pc.child = #{childId} and pc.notification = 1")
  List<String> getParentTokensByChild(@Param("childId") Long childId);

  @Select("select registration_id from device_notification where person=#{personId}")
  Set<String> getRegisterTokensByParentId(@Param("personId") Long personId);
}
