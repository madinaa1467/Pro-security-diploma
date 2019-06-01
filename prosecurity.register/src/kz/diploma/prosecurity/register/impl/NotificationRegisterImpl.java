package kz.diploma.prosecurity.register.impl;

import com.google.common.collect.Maps;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.NotificationEvent;
import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.register.dao.NotificationDao;
import kz.diploma.prosecurity.register.service.FcmService;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import org.apache.log4j.Logger;

import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Bean
public class NotificationRegisterImpl implements NotificationRegister {

  final Logger logger = Logger.getLogger(getClass());

  private static SimpleDateFormat timeFormat = new SimpleDateFormat("hh:mm dd/mm/yyyy");

  public BeanGetter<FcmService> service;
  public BeanGetter<NotificationDao> notificationDao;

  @Override
  public void register(Long personId, String registrationId) {
    notificationDao.get().registerDevice(personId, registrationId);
    logger.info("personId: " + personId + ", register.registrationId: " + registrationId);
  }

  @Override
  public void unregister(Long personId, String registrationId) {
    notificationDao.get().unregisterDevice(registrationId);
    logger.info("personId: " + personId + ", unregister.registrationId: " + registrationId);
  }

  @Override
  public void send(Event event) {

    notificationDao.get().getParentTokensByChild(event.childId)
      .stream()
      .forEach(token -> {

        Map<String, String> data = Maps.newHashMap();
        data.put("id", event.id + "");

        sendDirectNotification(token, data, event.toNotificationEvent());
      });
  }

  private void sendDirectNotification(String token, Map<String, String> data, NotificationEvent event) {
    try {
      service.get().sendDirectNotification(token, data, event);
    } catch (ExecutionException | InterruptedException e) {
      notificationDao.get().unregisterDevice(token);
      logger.error(e);
    }
  }
}
