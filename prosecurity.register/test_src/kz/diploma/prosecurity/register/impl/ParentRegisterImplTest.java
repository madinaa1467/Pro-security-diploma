package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.register.dao.SequenceDao;
import kz.diploma.prosecurity.register.test.dao.AuthTestDao;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.util.RND;
import org.testng.annotations.Test;

public class ParentRegisterImplTest extends ParentTestNg {

  public BeanGetter<ParentRegister> parentRegister;
  public BeanGetter<SequenceDao> sequenceDao;

  public Phone[] getPhones(int k){
    Phone[] phones = new Phone[k];
    for(int i = 0; i < k; i++){
      phones[i] = new Phone();
      phones[i].number = RND.str(10);
      phones[i].type = RND.str(3);
    }

    return phones;
  }

  public ToSave getToSave(){
    ToSave toSave = new ToSave();
    toSave.id =  sequenceDao.get().proSeqNext();
    toSave.email = RND.str(10);
    toSave.password = RND.str(10);
    toSave.name = RND.str(10);
    toSave.surname = RND.str(10);
    toSave.patronymic = RND.str(10);
    toSave.username = RND.str(10);
    toSave.phones = this.getPhones(2);
    toSave.gender = RND.str(4);
    toSave.birthDate = RND.dateYears(1, 4);

    return toSave;
  }

  public long saveForTest(){
      ToSave toSave = this.getToSave();
      return parentRegister.get().register(toSave);
  }

  @Test
  public void saveParentTest(){
    ToSave toSave = this.getToSave();
    //
    //
    long k = parentRegister.get().register(toSave);
    //
    //
    System.out.println("AAAA" + k);
  }

  @Test
  public void deleteParentTest(){
    ToSave toSave = this.getToSave();
    toSave.id = this.saveForTest();
    toSave.email = "deleted";
    //
    //
    parentRegister.get().deleteParent(toSave.id);
    //
    //
    System.out.println("AAAA");
  }

  public BeanGetter<AuthTestDao> testDao;

  @Test
  public void test()throws Exception{
    System.out.println("sdf: "+testDao.get().getInfo(6L));
  }
}
