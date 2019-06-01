package kz.diploma.prosecurity.register.test.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface NotificationTestDao {

  @Insert("insert into device_notification(parent, registration_id)\n " +
    " values (#{parentId}, #{registrationId})" +
    " on conflict (registration_id) do update set" +
    " parent = excluded.parent\n")
  Long registerDevice(@Param("parentId") Long parentId, @Param("registrationId") String registrationId);
}
