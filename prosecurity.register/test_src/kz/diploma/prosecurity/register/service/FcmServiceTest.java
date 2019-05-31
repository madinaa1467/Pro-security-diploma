package kz.diploma.prosecurity.register.service;

import com.google.common.collect.Maps;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

import java.util.Map;

public class FcmServiceTest extends ParentTestNg {

  public BeanGetter<FcmService> service;

  @Test
  public void testSendToParent() throws Exception {
    String fcmToken = "euoS8L3ZBMs:APA91bEnmSOV4NZkGqGKDIBzWwgqxYmU3-yD8IGGNKvI2zWeqfOPcawsPoKyTMFqSRRYjRF4ZX1CY-_8FrHVKPDvnGBe8ir0vh47mTVBWQdb7NaTr37Mu4UdBGCJdY-nXzpM2rsONf81";
//    String fcmToken = "ebgJ_s5q2dc:APA91bGRlFdEXcmBYYHF1vRJRdtxEY6-OF0QxWkhHGF_fa3LbY03FE0sPacsEA3RprHaRxH_9sCcP7nxtOiOXc8ztOgW1uQMky7QrnkinhU6wd55Rpd4LvsudZYz7tTjb0ZDMFyYBsiT";
    Map<String,String> data = Maps.newHashMap();
    data.put("id", String.valueOf(123));
    data.put("text", String.valueOf(Math.random() * 1000) + " asdfd dsdfsdf dsf");

    service.get().sendToParent(fcmToken, data);
  }
}