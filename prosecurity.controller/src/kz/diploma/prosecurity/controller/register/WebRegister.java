package kz.diploma.prosecurity.controller.register;

import kz.diploma.prosecurity.controller.model.EventFilterWeb;
import kz.diploma.prosecurity.controller.model.EventWeb;

import java.util.List;

public interface WebRegister {
    List<EventWeb> getModeratorEventList(EventFilterWeb filter);
    List<EventWeb> getParentEventList(EventFilterWeb filter);
}
