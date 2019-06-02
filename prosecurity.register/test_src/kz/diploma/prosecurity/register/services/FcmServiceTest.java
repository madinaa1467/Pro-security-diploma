package kz.diploma.prosecurity.register.services;

import com.google.common.collect.Maps;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.NotificationEvent;
import kz.diploma.prosecurity.register.service.FcmService;
import kz.diploma.prosecurity.register.service.FcmTopic;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.util.Date;
import java.util.Map;

public class FcmServiceTest extends ParentTestNg {

  public BeanGetter<FcmService> service;

  @Test
  public void testSendDirectNotification() throws Exception {
    String token =
      "fqzIg6V_cms:APA91bGTLmNOGlyprD0mxwYrtdupqV6SyT2ICEFMc1D2goZlR7_ZYNyPtTZC-SI_2LMj2zy0H300" +
        "--mr1kr2luCx6rRzW3iL61E0Hf66xOnz7rYdBczQWlUZ-wugdt5IPIHh0CASQMRJ";
//    String fcmToken = "ebgJ_s5q2dc:APA91bGRlFdEXcmBYYHF1vRJRdtxEY6-OF0QxWkhHGF_fa3LbY03FE0sPacsEA3RprHaRxH_9sCcP7nxtOiOXc8ztOgW1uQMky7QrnkinhU6wd55Rpd4LvsudZYz7tTjb0ZDMFyYBsiT";


    for (int i = 0; i < 10; i++) {

      Event event = new Event();
      event.fio = "Vasya Pupkin";
      event.cardNumber = "1000000";
      event.action = (i % 2 == 0) ? "in" : "out";
      event.entrance = "public gate";
      event.date = new Date();

      Map<String,String> data = Maps.newHashMap();
      data.put("id", String.valueOf((int)(Math.random() * 1000)));
      data.put("text", "AAA: "+String.valueOf((int)(Math.random() * 1000)));
/*
      data.put("tag", (i%2 == 0) ? "in": "out");
      data.put("foreground", "true");

      System.out.println("tag: "+ "tag_"+(i%2));*/
      NotificationEvent notificationEvent = event.toNotificationEvent();
      service.get().sendDirectNotification(token, data, notificationEvent);
    }
  }

  @Test
  public void sendTopicBasedNotifications() throws Exception {
    String token =
      "eyvSHUrhhEU:APA91bFcCTynmJSvNVct5Gmg_HCd3YN-bNitFvcoP9hO4DU" +
        "-iy9Eiy6ublPTC8t_pUaEKjQCQJmkzI54Y3FHJAqcjX7ahW1Ksl57hbMBOGp4dQ4aXpWL3ZCZIePUwEyipLPswWOGN6EB";

    for (int i = 0; i < 1; i++) {

      Event event = new Event();
      event.fio = "Vasya Pupkin";
      event.cardNumber = "1000000";
      event.action = (i % 2 == 0) ? "in" : "out";
      event.entrance = "public gate";
      event.date = new Date();

      NotificationEvent notificationEvent = event.toNotificationEvent();

      Map<String, String> data = Maps.newHashMap();
      data.put("id", String.valueOf((int) (Math.random() * 1000)));
      data.put("action", notificationEvent.action);

//      data.put("text", "AAA: " + String.valueOf((int) (Math.random() * 1000)));


      service.get().sendTopicBasedNotifications(FcmTopic.TRACKING, data, notificationEvent);
    }

  }

}