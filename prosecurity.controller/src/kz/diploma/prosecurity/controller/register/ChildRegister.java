package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.ChildEvents;
import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventFilter;

import java.util.List;

public interface ChildRegister {
  List<ChildEvents> listAllEvents(long parentId, EventFilter filter);
  List<Event> getEventsByChild(EventFilter filter);
  ChildEvents listEvents(long childId);
}
