package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.*;

import java.util.List;

public interface ChildRegister {
  List<EventList> listAllEvents(Long parentId, EventFilter filter);
  List<Child> getParentChildList(Long parentId);
  List<Event> getLastEventsList(Long parentId);
  Child getChildByCard(String cardNumber, Long childId);
  boolean saveOrUpdateChild(Long parentId, ChildToSave child);
  boolean deleteChild(Long parentId, Long childId, String delete);
}
