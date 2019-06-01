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
      "fuw1FIGmn64:APA91bGNQgbcHAM7RBH23urnmaT6tCNSczEJsTwb5YCmiwBtJRFfh5K2pAJC_PcB4d7Yhy8a7CrG71Z" +
        "-Fe0doBvCJEA9zjzx3Qgafu9IW4ZXFBWOlxt5UQfXuZld0Zrw1lBgNcIBq4qt";
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
      System.out.println();
      service.get().sendDirectNotification(token, data, notificationEvent);
    }
  }

  @Test
  public void sendTopicBasedNotifications() throws Exception {
    String token =
      "fe2vuaf03jo:APA91bFJPbpE1eRVv83xc9I4gcptnW" +
        "-raxMBwGnyGULfBrYFuTgA0F2p_NhdQvylbUWAqANa8Zy_mNQby4O7kcZM9Gcg9ZbmkYc6TjdtcqH9EjOjUBiKlqz3XGtdZB" +
        "-8Vy2dTO0lvEpQ";
    service.get().sendTopicBasedNotifications(FcmTopic.TRACKING, Maps.newHashMap());
  }

}