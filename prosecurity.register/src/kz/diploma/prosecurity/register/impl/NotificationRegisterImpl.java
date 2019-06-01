package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.register.dao.NotificationDao;
import kz.diploma.prosecurity.register.service.FcmService;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import org.apache.log4j.Logger;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@Bean
public class NotificationRegisterImpl implements NotificationRegister {

  final Logger logger = Logger.getLogger(getClass());

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
  public void send(String token, Map<String, String> data) {
    sendDirectNotification(token, data);
  }

  private void sendDirectNotification(String token, Map<String, String> data) {
    try {
      service.get().sendDirectNotification(token, data);
    } catch (ExecutionException | InterruptedException e) {
      logger.error(e);
    }
  }
}
