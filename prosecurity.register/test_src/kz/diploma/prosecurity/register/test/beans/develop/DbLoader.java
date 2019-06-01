package kz.diploma.prosecurity.register.test.beans.develop;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.UserCan;
import kz.diploma.prosecurity.register.beans.all.IdGenerator;
import kz.diploma.prosecurity.register.dao.SequenceDao;
import kz.diploma.prosecurity.register.test.dao.AuthTestDao;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
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
  public BeanGetter<SequenceDao> sequenceDao;


  public void loadTestData() throws Exception {

    loadPersons();

    logger.info("FINISH");
  }

  @SuppressWarnings("SpellCheckingInspection")
  private void loadPersons() throws Exception {
    logger.info("Start loading persons...");

    Long id = sequenceDao.get().proSeqNext();

    {
      user(sequenceDao.get().proSeqNext(), "all");
      for (UserCan can : UserCan.values()) {
        add_can("all", can);
      }
    }
    {
      user(sequenceDao.get().proSeqNext(), "admin");
      add_can("admin", UserCan.ADMIN);
    }
    {
      user(sequenceDao.get().proSeqNext(), "user");
      add_can("user", UserCan.USER);

    }
    {
      user(sequenceDao.get().proSeqNext(), "moderator");
      add_can("moderator", UserCan.MODERATOR);
    }

    {
      //parent
      user(id, "1");
      add_can("1", UserCan.USER);
    }

//    {
//      user(id, "1");
//      for (UserCan can : UserCan.values()) {
//        add_can("1", can);
//      }
//    }

    parent(id, "1980-07-23", "1", "male");
    phone(id);

    Long childId = sequenceDao.get().proSeqNext();
    child(childId, id, "9643108503302167061","Asyl", "Aisha", "Asla", "female", "2005-01-05", 1);
    authTestDao.get().insertParentChild(id, childId, 1, 1);

    childId = sequenceDao.get().proSeqNext();
    child(childId, id, "9643108503302167063","Kasymzhan", "Abzal", "Adam", "male", "2010-04-09", 1);
    authTestDao.get().insertParentChild(id, childId, 1, 1);


    card("9643108503302167064");
    card("9643108503302167065");
    card("1111111111111111111");
    card("2222222222222222222");

    for (int i = 2; i < 6; i++) {

      id = sequenceDao.get().proSeqNext();
      user(id, i + "");
      add_can(i + "", UserCan.USER);
      parent(id, "1980-07-23", i + "", "male");
      phone(id);
      authTestDao.get().insertParentChild(id, childId, 1, 1);
    }

    logger.info("Finish loading persons");
  }

  private void user(Long id, String accountName) {
    String encryptPassword = passwordEncoder.get().encode("1");
    String[] fio = "Пушкин Александр Сергеевич".split("\\s+");
    authTestDao.get().insertPerson(id, accountName, fio[0], fio[1], fio[2],accountName+"@gmail.com", encryptPassword);
  }

  private void add_can(String username, UserCan... cans) {
    for (UserCan can : cans) {
      authTestDao.get().upsert(can.name());
      authTestDao.get().personCan(username, can.name());
    }
  }



  private void parent(Long id, String birthDateStr, String accountName, String gender) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date birthDate = sdf.parse(birthDateStr);
    String encryptPassword = passwordEncoder.get().encode("1");
    authTestDao.get().insertParent(id, 1, gender,
            new Timestamp(birthDate.getTime()));

  }
  private void child(Long id, Long parentID, String cardNumber, String surname, String name,  String patronymic, String gender, String birthDateStr, int actual) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date birthDate = sdf.parse(birthDateStr);

    card(cardNumber);

    authTestDao.get().insertChild(id, cardNumber, surname, name, patronymic, gender,
            new Timestamp(birthDate.getTime()), actual);


    SimpleDateFormat sdfEvent = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2007-02-16 07:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2007-02-16 12:38:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2007-02-17 08:00:55").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2007-02-17 13:10:22").getTime()), actual);
    authTestDao.get().insertEventWithoutDate("out", id,  actual);

  }
  private void card(String cardNumber){

    String password = "1";
    //    String password = idGenerator.get().newId();
    authTestDao.get().insertCard(cardNumber, RND.str(8), RND.intStr(11), password);
  }

  private void phone(Long id)  {
    Phone phone1 = new Phone();
    phone1.number = "81111111111";
    phone1.type = "mob";
    Phone phone2 = new Phone();
    phone2.number = "82222222222";
    phone2.type = "home";

    authTestDao.get().upsertPhone(id, phone1);
    authTestDao.get().upsertPhone(id, phone2);
  }
}
