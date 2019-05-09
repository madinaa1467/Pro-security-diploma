package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.*;

import java.util.List;

public interface ChildRegister {
  List<EventList> listAllEvents(Long parentId, EventFilter filter);
  List<Child> getParentChildList(Long parentId);
  List<Event> getLastEventsList(Long parentId);
  Child getChildByCard(String cardNumber);
  boolean updateChildren(Long parentId, ChildToSave child);
}
