package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.Event;

public interface NotificationRegister {

  void register(Long personId, String registrationId);

  void unregister(String registrationId);

  void subscribe(Long personId, String registrationId, String topic);

  void unsubscribe(Long personId, String registrationId, String topic);

  void send(Event event);

}
