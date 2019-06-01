package kz.diploma.prosecurity.register.service;

import com.google.firebase.internal.NonNull;
import com.google.firebase.messaging.FirebaseMessagingException;
import kz.diploma.prosecurity.controller.model.NotificationEvent;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface FcmService {

  void sendDirectNotification(String token, Map<String, String> data, NotificationEvent event) throws
    ExecutionException,
    InterruptedException;

  void sendTopicBasedNotifications(FcmTopic topic, Map<String, String> data, NotificationEvent event) throws
    ExecutionException,
    InterruptedException, FirebaseMessagingException;

  void subscribeToTopic(@NonNull List<String> registrationTokens,
                        @NonNull String topic) throws FirebaseMessagingException;

  void unsubscribeToTopic(@NonNull List<String> registrationTokens,
                          @NonNull String topic) throws FirebaseMessagingException;

}
