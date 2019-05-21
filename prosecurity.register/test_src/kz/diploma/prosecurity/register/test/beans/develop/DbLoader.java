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
      user(id, "1");
      for (UserCan can : UserCan.values()) {
        add_can("1", can);
      }
    }
    {
      user(sequenceDao.get().proSeqNext(), "user");
      add_can("user", UserCan.VIEW_PARENT);
      add_can("user", UserCan.VIEW_CHILD);
      add_can("user", UserCan.VIEW_EVENT_LIST);
    }


    parent(id, "1980-07-23", "1", "male");
    phone(id);

    child(1L, id, "9643108503302167061","Asyl", "Aisha", "Asla", "female", "2005-01-05", 1);
    child(2L, id, "9643108503302167063","Kasymzhan", "Abzal", "Adam", "male", "2010-04-09", 1);


    card("9643108503302167064");
    card("9643108503302167065");
    card("1111111111111111111");
    card("2222222222222222222");

    logger.info("Finish loading persons");
  }

  private void user(Long id, String accountName) throws Exception {
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
