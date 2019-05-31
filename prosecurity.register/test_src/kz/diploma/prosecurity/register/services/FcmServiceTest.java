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
    String fcmToken = "eXAa6AojcuA:APA91bGLd5unvUkPSUSu-YplWyHD44YNd-fSBCk2fSb2eDun3YLRNKITMCSZXEB48GmvOMn9ybDWqo2KjFLmd90ADuwrEJUOHBHmWHUsnbm-cW9tcLWrN8Gjdu-KW9mhri0AZ4w3Cc0r";
//    String fcmToken = "ebgJ_s5q2dc:APA91bGRlFdEXcmBYYHF1vRJRdtxEY6-OF0QxWkhHGF_fa3LbY03FE0sPacsEA3RprHaRxH_9sCcP7nxtOiOXc8ztOgW1uQMky7QrnkinhU6wd55Rpd4LvsudZYz7tTjb0ZDMFyYBsiT";

    for(int i = 0 ; i < 1; i++) {
      Map<String,String> data = Maps.newHashMap();
      data.put("id", String.valueOf((int)(Math.random() * 1000)));
      data.put("text", "AAA: "+String.valueOf((int)(Math.random() * 1000)));

      data.put("tag", (i%2 == 0) ? "in": "out");
      data.put("foreground", "true");

      System.out.println("tag: "+ "tag_"+(i%2));
      service.get().sendToParent(fcmToken, data);
    }

  }
}