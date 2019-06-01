package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.Event;

public interface NotificationRegister {

  void register(Long personId, String registrationId);

  void unregister(Long personId,  String registrationId);

  void send(Event event);

}
