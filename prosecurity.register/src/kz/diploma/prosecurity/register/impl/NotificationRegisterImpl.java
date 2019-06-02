package kz.diploma.prosecurity.register.impl;

import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import com.google.firebase.messaging.FirebaseMessagingException;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.NotificationEvent;
import kz.diploma.prosecurity.controller.register.NotificationRegister;
import kz.diploma.prosecurity.register.dao.NotificationDao;
import kz.diploma.prosecurity.register.service.FcmService;
import kz.diploma.prosecurity.register.service.FcmTopic;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import org.apache.log4j.Logger;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
  public void subscribe(Long personId, String registrationId, String topic) {
    try {
      List<String> list = getTokenList(personId, registrationId);

      if (list != null && !list.isEmpty()) service.get().subscribeToTopic(list, topic);
    } catch (FirebaseMessagingException e) {
      logger.error(e);
    }

  }

  @Override
  public void unsubscribe(Long personId, String registrationId, String topic) {
    try {
      List<String> list = getTokenList(personId, registrationId);

      if (list != null && !list.isEmpty()) service.get().unsubscribeToTopic(list, topic);
    } catch (FirebaseMessagingException e) {
      logger.error(e);
    }
  }

  private List<String> getTokenList(Long personId, String registrationId) {
    Set<String> tokens = notificationDao.get().getRegisterTokensByParentId(personId);
    if (!Strings.isNullOrEmpty(registrationId)) tokens.add(registrationId);

    return new ArrayList<>(tokens);
  }

  @Override
  public void send(Event event) {

    notificationDao.get().getParentTokensByChild(event.childId)
      .stream()
      .forEach(token -> {

        Map<String, String> data = Maps.newHashMap();
        data.put("id", event.id + "");
        data.put("action", event.action);

        sendDirectNotification(token, data, event.toNotificationEvent());

        sendTopicBasedNotifications(data, event.toNotificationEvent());

      });
  }

  private void sendTopicBasedNotifications(Map<String, String> data, NotificationEvent event) {
    try {
      service.get().sendTopicBasedNotifications(FcmTopic.TRACKING, data, event);
    } catch (ExecutionException | InterruptedException | FirebaseMessagingException e) {
      logger.error(e);
    }
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
