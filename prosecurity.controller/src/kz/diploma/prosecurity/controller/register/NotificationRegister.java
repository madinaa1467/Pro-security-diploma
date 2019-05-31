package kz.diploma.prosecurity.controller.register;

import java.util.Map;

public interface NotificationRegister {

  void register(Long personId, String registrationId);

  void unregister(Long personId,  String registrationId);

  void send(String token, Map<String, String> data);

}
