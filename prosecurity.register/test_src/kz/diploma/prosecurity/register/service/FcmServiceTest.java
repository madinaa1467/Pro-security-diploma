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
    String fcmToken = "fKgQD2Iaj88:APA91bFO1X9FS0nI6Zy4QuKa8y0IQYveGSIPTAKxmxgvCxl-XrBI5YrPHN1bSTyZ8Ge4FdMbPvRAG-zhzQ14wf-lTOY0cZuJXss5VUHhHMOyUEefA8kSpP8ce37_vmOuhGhZhfqEyVh1";
    Map<String,String> data = Maps.newHashMap();
    data.put("id", String.valueOf(123));
    data.put("text", String.valueOf(Math.random() * 1000) + " asdfd dsdfsdf dsf");

    service.get().sendToParent(fcmToken, data);
  }
}