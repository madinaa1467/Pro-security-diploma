package kz.diploma.prosecurity.register.service;

import com.google.common.collect.Maps;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import org.testng.annotations.Test;

public class FcmServiceTest extends ParentTestNg {

  public BeanGetter<FcmService> service;

  @Test
  public void testSendToParent() throws Exception {
    service.get().sendToParent("asd", Maps.newHashMap());
  }
}