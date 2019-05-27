package kz.diploma.prosecurity.controller.register;

import java.util.Map;

public interface NotificationRegister {

  void register(String fcmToken);

  void unregister(String fcmToken);

  void send(String token, Map<String, String> data);

}
