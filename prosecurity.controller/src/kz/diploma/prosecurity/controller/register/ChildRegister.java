package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.ChildEvents;

import java.util.List;

public interface ChildRegister {
  List<ChildEvents> listAllEvents(long parentId);
  ChildEvents listEvents(long childId);
}
