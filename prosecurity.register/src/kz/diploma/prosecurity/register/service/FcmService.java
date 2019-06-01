package kz.diploma.prosecurity.register.service;

import kz.diploma.prosecurity.controller.model.NotificationEvent;

import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface FcmService {

  void sendDirectNotification(String token, Map<String, String> data, NotificationEvent event) throws
    ExecutionException,
    InterruptedException;

  void sendTopicBasedNotifications(FcmTopic topic, String token, Map<String, String> data) throws ExecutionException,
    InterruptedException;

}
