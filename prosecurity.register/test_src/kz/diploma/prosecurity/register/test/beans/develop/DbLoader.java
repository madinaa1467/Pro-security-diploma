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
import java.text.ParseException;
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

  private void loadPersons() throws Exception {
    logger.info("Start loading persons...");

    Long parentId = sequenceDao.get().proSeqNext();

    {
      user(sequenceDao.get().proSeqNext(), "moderator", "Azamat Zhamonov Erlanuly");
      add_can("moderator", UserCan.MODERATOR);
    }

    {
      //parent #1
      user(parentId, "user", "Andrey Bogdanchikov Alekseevich");
      add_can("user", UserCan.USER);
      parent(parentId, "1980-07-23", "user", "male");
      phone(parentId);
    }

    card("9643108503302167061");
    card("9643108503302167063");
    card("9643108503302167064");
    card("9643108503302167065");
    card("1111111111111111111");
    card("2222222222222222222");

    Long childId = sequenceDao.get().proSeqNext();
    child(childId, parentId, "9643108503302167061","Asyl", "Aisha", "Asla", "female", "2005-01-05", 1);
    authTestDao.get().insertParentChild(parentId, childId, 1, 1);

    childId = sequenceDao.get().proSeqNext();
    child(childId, parentId, "9643108503302167063","Kasymzhan", "Abzal", "Adam", "male", "2010-04-09", 1);
    authTestDao.get().insertParentChild(parentId, childId, 1, 1);


    {
      //parent #2
      parentId = sequenceDao.get().proSeqNext();
      user(parentId, "user2", "Aiman Zhanatova Serik kyzy");
      add_can("user2", UserCan.USER);
      parent(parentId, "1986-05-21", "user2", "female");
      phone(parentId);
    }

    cardReal("9643908503302477470", "3ACA99CA", "58202153202", "123");
    cardReal("9643908503302476506", "BA1B94CA", "18627148202", "234");
    cardReal("3333333333333333333", "A905C355", "169519585", "345");

    childId = sequenceDao.get().proSeqNext();
    child(childId, parentId, "9643908503302477470","Alyf", "Elaman", "Armanuly", "male", "2003-11-09", 1);
    authTestDao.get().insertParentChild(parentId, childId, 1, 1);

    childId = sequenceDao.get().proSeqNext();
    child(childId, parentId, "9643908503302476506","Kami", "Aina", "Nazarovna", "female", "2004-09-04", 1);
    authTestDao.get().insertParentChild(parentId, childId, 1, 1);


    logger.info("Finish loading persons");
  }

  private void user(Long id, String accountName, String fullname) {
    String encryptPassword = passwordEncoder.get().encode("1");
    String[] fio = fullname.split("\\s+");
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


    authTestDao.get().insertChild(id, cardNumber, surname, name, patronymic, gender,
            new Timestamp(birthDate.getTime()), actual);

    if(id % 2 == 0){
      createEventListEven(id, actual);
    } else{
      createEventListOdd(id, actual);
    }

  }
  private void card(String cardNumber){

    String password = "111";
    //    String password = idGenerator.get().newId();
    authTestDao.get().insertCard(cardNumber, RND.str(8), RND.intStr(11), password);
  }

  private void cardReal(String cardNumber, String in_hex, String in_dec, String password){
    authTestDao.get().insertCard(cardNumber, in_hex, in_dec, password);
  }

  private void createEventListOdd(Long id, int actual) throws ParseException {
    SimpleDateFormat sdfEvent = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-16 07:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-16 12:38:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-17 08:00:55").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-17 13:10:22").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-18 07:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-18 14:08:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-19 07:51:24").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-19 15:10:32").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-21 07:39:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-21 12:45:05").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-22 08:07:44").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-22 16:12:27").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-23 07:38:47").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-23 14:18:38").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-24 07:15:31").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-24 11:04:59").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-04-13 08:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-04-13 13:27:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-04-17 09:07:55").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-04-17 14:14:22").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-04-25 08:16:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-04-25 15:18:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-04-26 08:53:24").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-04-26 16:19:32").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-04-27 08:37:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-04-27 13:49:05").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-04-28 09:07:44").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-04-28 17:12:27").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-01 09:38:47").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-01 13:18:38").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-02 06:15:31").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-02 17:04:59").getTime()), actual);//
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-04 07:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-04 12:38:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-06 08:00:55").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-06 13:10:22").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-07 07:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-07 14:08:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-08 07:51:24").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-08 15:10:32").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-09 07:39:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-09 12:45:05").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-10 08:07:44").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-10 16:12:27").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-13 07:38:47").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-13 14:18:38").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-14 07:15:31").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-14 11:04:59").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-15 08:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-15 13:27:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-16 09:07:55").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-16 14:14:22").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-17 08:16:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-17 15:18:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-18 08:53:24").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-18 16:19:32").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-20 08:37:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-20 13:49:05").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-21 09:07:44").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-21 17:12:27").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-22 09:38:47").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-22 13:18:38").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-23 06:15:31").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-23 17:04:59").getTime()), actual);
  }

  private void createEventListEven(Long id, int actual) throws ParseException {
    SimpleDateFormat sdfEvent = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-16 08:38:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-16 14:38:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-17 07:00:55").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-17 13:18:22").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-18 07:26:40").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-18 15:48:55").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-19 08:37:45").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-19 17:23:36").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-21 09:22:07").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-21 14:52:56").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-22 09:54:35").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-22 12:42:49").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-02-23 08:59:34").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-02-23 16:57:02").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-02-24 08:34:23").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-02-24 11:05:33").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-04-13 08:39:58").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-04-13 11:44:57").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-04-17 10:10:08").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-04-17 14:29:16").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-04-25 08:47:03").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-04-25 13:15:05").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-04-26 08:26:04").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-04-26 13:58:52").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-04-27 08:07:06").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-04-27 15:21:07").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-04-28 09:17:28").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-04-28 13:25:15").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-01 09:13:26").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-01 17:21:48").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-02 08:51:15").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-02 14:14:02").getTime()), actual);//
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-04 07:49:36").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-04 18:14:45").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-06 07:09:21").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-06 16:03:28").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-07 07:01:41").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-07 16:09:03").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-08 07:42:53").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-08 14:14:26").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-09 07:27:45").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-09 16:24:47").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-10 07:59:28").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-10 10:46:19").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-13 08:42:18").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-13 15:35:10").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-14 08:50:41").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-14 16:18:10").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-15 07:08:07").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-15 09:46:30").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-16 08:06:42").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-16 12:36:22").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-17 08:09:13").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-17 16:35:54").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-18 07:53:06").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-18 16:16:46").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-20 07:59:57").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-20 13:37:07").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-21 08:09:40").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-21 13:07:07").getTime()), actual);
    authTestDao.get().insertEvent("in", "first", id, new Timestamp(sdfEvent.parse("2019-05-22 09:44:57").getTime()), actual);
    authTestDao.get().insertEvent("out","first", id, new Timestamp(sdfEvent.parse("2019-05-22 13:08:12").getTime()), actual);
    authTestDao.get().insertEvent("in","second", id, new Timestamp(sdfEvent.parse("2019-05-23 08:11:46").getTime()), actual);
    authTestDao.get().insertEvent("out", "second", id, new Timestamp(sdfEvent.parse("2019-05-23 19:36:28").getTime()), actual);
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
