package kz.diploma.prosecurity.register._develop_;

import kz.diploma.prosecurity.register.test.util.TestsBeanContainer;
import kz.diploma.prosecurity.register.test.util.TestsBeanContainerCreator;

/**
 * <p>
 * see --> Инициация приложения на рабочем месте разработчика c загрйзкой в БД тестовых данных из стэнда
 * </p>
 * <p>
 * Этот скрипт запускается для иницииации приложения: здесь автоматически настраиваются конфиги и инициируется БД
 * </p>
 * <p>
 * Также этот скрипт загружает в БД тестовые данные из стэнда
 * </p>
 */
public class RecreateDbAndLoadTestData {
  public static void main(String[] args) throws Exception {
    new RecreateDbAndLoadTestData().run();
  }

  private void run() throws Exception {
    TestsBeanContainer bc = TestsBeanContainerCreator.create();

    bc.dbWorker().recreateAll();
    bc.dbLoader().loadTestData();
  }
}
