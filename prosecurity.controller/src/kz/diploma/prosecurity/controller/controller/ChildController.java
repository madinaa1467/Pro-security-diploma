package kz.diploma.prosecurity.controller.controller;

import kz.diploma.prosecurity.controller.model.Child;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventList;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.register.ChildRegister;
import kz.diploma.prosecurity.controller.security.PublicAccess;
import kz.diploma.prosecurity.controller.util.Controller;
import kz.greetgo.depinject.core.Bean;
import kz.greetgo.depinject.core.BeanGetter;
import kz.greetgo.mvc.annotations.Json;
import kz.greetgo.mvc.annotations.Par;
import kz.greetgo.mvc.annotations.ToJson;
import kz.greetgo.mvc.annotations.on_methods.ControllerPrefix;
import kz.greetgo.mvc.annotations.on_methods.OnGet;

import java.util.List;

@Bean
@ControllerPrefix("/child")
public class ChildController implements Controller {

  public BeanGetter<ChildRegister> childRegister;

  @ToJson
  @PublicAccess
  @OnGet("/listAllEvents")
  public List<EventList> listAllEvents(@Par("parentId") long parentId, @Json @Par("filter") EventFilter filter) {
//      throw new UnsupportedOperationException();
    return childRegister.get().listAllEvents(parentId, filter);
  }

  @ToJson
  @OnGet("/getChildList")
  public List<Child> getChildList(@Par("username") String username) {
    return childRegister.get().getParentChildList(username);
  }


  @ToJson
  @OnGet("/getLastEventsList")
  public List<Event> getChildList(@Par("parentId") long parentId) {
    return childRegister.get().getLastEventsList(parentId);
  }
}
