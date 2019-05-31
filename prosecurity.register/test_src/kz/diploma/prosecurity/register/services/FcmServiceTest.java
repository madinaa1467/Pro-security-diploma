package kz.diploma.prosecurity.register.services;

import com.google.common.collect.Maps;
import kz.diploma.prosecurity.register.service.FcmService;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.util.Map;

public class FcmServiceTest extends ParentTestNg {

  public BeanGetter<FcmService> service;

  @Test
  public void testSendToParent() throws Exception {
    String fcmToken = "fXX8TuROc6E:APA91bGQgBAXLFJFU9AyAEETfdChCHRwl5m5YLQdFZZGoUGXF2Wasyxx6duLIW_QYAXnEEQXcY0fxKSDZc0KZjYVIEqZJ2qHkGwdc1vgDh-XDeOgJ8cCkAo0JrtJf2Dfd9DMdJ0T5G_t";
//    String fcmToken = "ebgJ_s5q2dc:APA91bGRlFdEXcmBYYHF1vRJRdtxEY6-OF0QxWkhHGF_fa3LbY03FE0sPacsEA3RprHaRxH_9sCcP7nxtOiOXc8ztOgW1uQMky7QrnkinhU6wd55Rpd4LvsudZYz7tTjb0ZDMFyYBsiT";
    Map<String,String> data = Maps.newHashMap();
    data.put("id", String.valueOf(123));
    data.put("text", String.valueOf(Math.random() * 1000) + " asdfd dsdfsdf dsf");
    data.put("count", "1");

    service.get().sendToParent(fcmToken, data);
  }
}