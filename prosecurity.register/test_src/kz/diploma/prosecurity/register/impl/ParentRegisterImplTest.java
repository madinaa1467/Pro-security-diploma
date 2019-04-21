package kz.diploma.prosecurity.register.impl;

import kz.diploma.prosecurity.controller.model.Phone;
import kz.diploma.prosecurity.controller.model.ToSave;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.register.test.util.ParentTestNg;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.util.RND;
import org.testng.annotations.Test;

import java.text.SimpleDateFormat;

public class ParentRegisterImplTest extends ParentTestNg {

  public BeanGetter<ParentRegister> parentRegister;

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
    toSave.username = RND.str(10);
    toSave.password = RND.str(10);
    toSave.name = RND.str(10);
    toSave.surname = RND.str(10);
    toSave.patronymic = RND.str(10);
    toSave.phones = this.getPhones(2);
    toSave.gender = RND.str(4);
    try {
      SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
      toSave.birth_date = formatter.parse("1973-02-16");
    }catch (Exception e){
      e.printStackTrace();
    }
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
  public void updateParentTest(){
    ToSave toSave = this.getToSave();
    toSave.id = this.saveForTest();
    toSave.username = "updated";
    toSave.surname="updated";
    //
    //
    parentRegister.get().updateParent(toSave);
    //
    //
    System.out.println("AAAA");
  }

  @Test
  public void deleteParentTest(){
    ToSave toSave = this.getToSave();
    toSave.id = this.saveForTest();
    toSave.username = "deleted";
    //
    //
    parentRegister.get().deleteParent(toSave.id);
    //
    //
    System.out.println("AAAA");
  }


}
