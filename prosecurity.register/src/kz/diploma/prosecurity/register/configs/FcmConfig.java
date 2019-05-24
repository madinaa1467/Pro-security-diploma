package kz.diploma.prosecurity.register.configs;

import kz.greetgo.conf.hot.DefaultStrValue;
import kz.greetgo.conf.hot.Description;

@Description("Параметры доступа к БД (используется только БД Postgresql)")
public interface FcmConfig {

    @Description("Fcm File config path")
    @DefaultStrValue("/")
    String filePath();
}
