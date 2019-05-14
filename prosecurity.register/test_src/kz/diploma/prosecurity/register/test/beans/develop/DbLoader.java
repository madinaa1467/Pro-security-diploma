package kz.diploma.prosecurity.register.test.beans.develop;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.register.beans.all.IdGenerator;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.diploma.prosecurity.controller.model.UserCan;
import kz.diploma.prosecurity.register.test.dao.AuthTestDao;
import kz.greetgo.security.password.PasswordEncoder;
import kz.greetgo.util.RND;
import org.apache.log4j.Logger;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Bean
public class DbLoader {
  final Logger logger = Logger.getLogger(getClass());


  public BeanGetter<AuthTestDao> authTestDao;
  public BeanGetter<IdGenerator> idGenerator;
  public BeanGetter<PasswordEncoder> passwordEncoder;

  public void loadTestData() throws Exception {

    loadPersons();

    logger.info("FINISH");
  }

  @SuppressWarnings("SpellCheckingInspection")
  private void loadPersons() throws Exception {
    logger.info("Start loading persons...");

    user("Пушкин Александр Сергеевич", "1799-06-06", "pushkin");
//    user("Сталин Иосиф Виссарионович", "1878-12-18", "stalin");
//    user("Берия Лаврентий Павлович", "1899-03-17", "beria");
//    user("Есенин Сергей Александрович", "1895-09-21", "esenin");
//    user("Путин Владимир Владимирович", "1952-10-07", "putin");
//    user("Назарбаев Нурсултан Абишевич", "1940-07-06", "papa");
//    user("Менделеев Дмитрий Иванович", "1834-02-08", "mendeleev");
//    user("Ломоносов Михаил Васильевич", "1711-11-19", "lomonosov");
//    user("Бутлеров Александр Михайлович", "1828-09-15", "butlerov");

    add_can("pushkin", UserCan.VIEW_USERS);
//    add_can("stalin", UserCan.VIEW_USERS);
//    add_can("stalin", UserCan.VIEW_ABOUT);

    parent(1,"Пушкин Александр Сергеевич", "1980-07-23", "1", "male");

    phone(1);

    child(1, 1, "9643108503302167061","Asyl", "Aisha", "Asla", "female", "2005-01-05", 1);
    child(2, 1, "9643108503302167063","Kasymzhan", "Abzal", "Adam", "male", "2010-04-09", 1);


    card("9643108503302167064");
    card("9643108503302167065");
    card("1111111111111111111");
    card("2222222222222222222");

    logger.info("Finish loading persons");
  }

  private void user(String fioStr, String birthDateStr, String accountName) throws Exception {
    String id = idGenerator.get().newId();
//    long id = -1;
    String[] fio = fioStr.split("\\s+");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date birthDate = sdf.parse(birthDateStr);
    String encryptPassword = passwordEncoder.get().encode("111");

    authTestDao.get().insertPerson(id, accountName, encryptPassword);
    authTestDao.get().updatePersonField(id, "birth_date", new Timestamp(birthDate.getTime()));
    authTestDao.get().updatePersonField(id, "surname", fio[0]);
    authTestDao.get().updatePersonField(id, "name", fio[1]);
    authTestDao.get().updatePersonField(id, "patronymic", fio[2]);
  }

  private void add_can(String username, UserCan... cans) {
    for (UserCan can : cans) {
      authTestDao.get().upsert(can.name());
      authTestDao.get().personCan(username, can.name());
    }
  }



  private void parent(int id, String fioStr, String birthDateStr, String accountName, String gender) throws Exception {
    String[] fio = fioStr.split("\\s+");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date birthDate = sdf.parse(birthDateStr);
    String encryptPassword = passwordEncoder.get().encode("1");
    authTestDao.get().insertParent(id, accountName, encryptPassword, 1,
            fio[0], fio[1], fio[2], gender,
            new Timestamp(birthDate.getTime()), accountName+"@gmail.com");

  }
  private void child(int id, int parentID, String cardNumber, String surname, String name,  String patronymic, String gender, String birthDateStr, int actual) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date birthDate = sdf.parse(birthDateStr);

    card(cardNumber);

    authTestDao.get().insertChild(id, cardNumber, surname, name, patronymic, gender,
            new Timestamp(birthDate.getTime()), actual);

    authTestDao.get().insertParentChild(parentID, id, 1, actual);

    SimpleDateFormat sdfEvent = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    authTestDao.get().insertEvent("in", id, new Timestamp(sdfEvent.parse("2007-02-16 07:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out", id, new Timestamp(sdfEvent.parse("2007-02-16 12:38:55").getTime()), actual);
    authTestDao.get().insertEvent("in", id, new Timestamp(sdfEvent.parse("2007-02-17 08:00:55").getTime()), actual);
    authTestDao.get().insertEvent("out", id, new Timestamp(sdfEvent.parse("2007-02-17 13:10:22").getTime()), actual);
    authTestDao.get().insertEventWithoutDate("out", id,  actual);

  }
  private void card(String cardNumber){
    authTestDao.get().insertCard(cardNumber, RND.str(8), RND.intStr(11));
  }

  private void phone(int id)  {
    Phone phone1 = new Phone();
    phone1.number = "+1111111111";
    phone1.type = "mob";
    Phone phone2 = new Phone();
    phone2.number = "+2222222222";
    phone2.type = "home";

    authTestDao.get().upsertPhone(id, phone1);
    authTestDao.get().upsertPhone(id, phone2);
  }
}
