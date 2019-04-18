package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.*;

import java.util.List;

public interface ChildRegister {
  List<ChildEvent> listAllEvents(long parentId, EventFilter filter);
  List<Child> getParentChildList(String username);
}
