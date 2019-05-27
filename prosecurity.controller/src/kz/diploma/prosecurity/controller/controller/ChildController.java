package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.*;
import kz.diploma.prosecurity.controller.register.ChildRegister;
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
@ControllerPrefix("/child")
public class ChildController implements Controller {

  public BeanGetter<ChildRegister> childRegister;

  @ToJson
  @PublicAccess
  @OnGet("/listAllEvents")
  public List<EventList> listAllEvents(@ParSession(PARENT_ID) Long parentId, @Json @Par("filter") EventFilter filter) {
//      throw new UnsupportedOperationException();
    return childRegister.get().listAllEvents(parentId, filter);
  }

  @ToJson
  @OnGet("/getChildList")
  public List<Child> getChildList(@ParSession(PARENT_ID) Long parentId) {
    return childRegister.get().getParentChildList(parentId);
  }

  @ToJson
  @OnGet("/getLastEventsList")
  public List<Event> getLastEventsList(@ParSession(PARENT_ID) Long parentId) {
    return childRegister.get().getLastEventsList(parentId);
  }

  @ToJson
  @OnGet("/getChildByCard")
  public Child getChildByCard(@Par("cardNumber") String cardNumber, @Par("password") String password, @Json @Par("childId") Long childId) {
    return childRegister.get().getChildByCard(cardNumber, password, childId);
  }

  @ToJson
  @OnPost("/save")
  public boolean saveOrUpdateChild(@ParSession(PARENT_ID) Long parentId, @Json @Par("childToSave") ChildToSave childToSave) {
    return childRegister.get().saveOrUpdateChild(parentId, childToSave);
  }

  @ToJson
  @OnPost("/delete")
  public boolean saveOrUpdateChild(@ParSession(PARENT_ID) Long parentId, @Json @Par("childId") Long childId, @Par("delete") String delete) {
    return childRegister.get().deleteChild(parentId, childId, delete);
  }
}
