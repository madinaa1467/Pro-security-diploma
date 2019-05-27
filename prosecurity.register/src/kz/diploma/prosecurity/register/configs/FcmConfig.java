package kz.diploma.prosecurity.register.configs;

import kz.greetgo.conf.hot.DefaultStrValue;
import kz.greetgo.conf.hot.Description;

@Description("Параметры доступа к FCM")
public interface FcmConfig {

  @Description("Папка для отправляемых писем (относительно ~/prosecurity.d/)")
  @DefaultStrValue("fcm_config/asd.json")
  String filePath();
}
