package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.*;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.controller.register.ParentRegister;
import kz.diploma.prosecurity.controller.register.WebRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Json;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ParSession;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;
import kz.greetgo.mvc.annotations.on_methods.OnPost;

import java.util.List;

import static kz.diploma.prosecurity.controller.util.ParSessionNames.PARENT_ID;

@Bean
@ControllerPrefix("/parent")
public class ParentController implements Controller {

  public BeanGetter<ParentRegister> parentRegister;


  public BeanGetter<ChildRegister> childRegister;
  public BeanGetter<WebRegister> webRegister;

  @ToJson
  @PublicAccess
  @OnPost("/register")
  public Long register(@Json @Par("toSave") ToSave toSave) {
    return parentRegister.get().register(toSave);
  }

  @ToJson
  @OnGet("/getInfo")
  public ToSave getInfo(@ParSession(PARENT_ID) Long parentId) {
    return  parentRegister.get().getInfo(parentId);
  }

  @ToJson
  @OnPost("/save")
  public AccountInfo save(@ParSession(PARENT_ID)Long id, @Json @Par("toSave") ToSave toSave){
    return parentRegister.get().save(id, toSave);
  }

  @ToJson
  @OnPost("/checkPassword")
  public void checkPassword(@ParSession(PARENT_ID)Long id, @Par("oldPassword") String oldPassword){
    parentRegister.get().checkPassword(id, oldPassword);
  }

  @ToJson
  @OnPost("/changePassword")
  public boolean changePassword(@ParSession(PARENT_ID)Long id, @Par("password") String password){
    return parentRegister.get().changePassword(id, password);
  }

  @ToJson
  @OnGet("/web/getChildList")
  public List<Child> getChildList(@ParSession(PARENT_ID) Long parentId){
    return childRegister.get().getParentChildList(parentId);
  }

  @ToJson
  @OnGet("/web/getEventList")
  public List<EventWeb> parent(@ParSession(PARENT_ID) Long parentId, @Json @Par("filter") EventFilterWeb filter) {
    filter.parentId = parentId;
    return webRegister.get().getParentEventList(filter);
  }

}
