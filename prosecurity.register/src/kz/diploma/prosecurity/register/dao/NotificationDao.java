package kz.diploma.prosecurity.register.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface NotificationDao {

  @Insert("insert into device_notification(parent, registration_id)\n " +
    " values (#{parentId}, #{registrationId})" +
    " on conflict (registration_id) do update set" +
    " parent = excluded.parent\n")
  Long registerDevice(@Param("parentId") Long parentId, @Param("registrationId") String registrationId);

  @Delete("delete from device_notification where registration_id=#{registrationId};")
  void unregisterDevice(@Param("registrationId") String registrationId);
}
