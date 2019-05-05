package kz.diploma.prosecurity.register.jdbc;

import kz.diploma.prosecurity.controller.model.EventFilter;


public class ChildEventList extends EventListConnection {

  public ChildEventList(EventFilter filter) {
    super(filter);
  }

  @Override
  void from() {
    sql.from("child as c");
    sql.from("event as e");
  }

  @Override
  void where() {
    sql.where("c.id = :childId");
    sql.setValue("childId", filter.childId);
    sql.where("c.id = e.child");
    sql.where("c.actual = 1");
    sql.where("e.actual = 1");
    if(filter.startDate != null){
      sql.where("date >= :startDate");
      sql.setValue("startDate", filter.startDate);
    }
    if(filter.endDate != null){
      sql.where("date < :endDate");
      sql.setValue("endDate", filter.endDate);
    }
  }

  @Override
  void limit() {
    sql.limit(":limit");
    sql.setValue("limit", filter.limit);
  }

  @Override
  void offset() {
    sql.offset(":offset");
    sql.setValue("offset", filter.offset);
  }
  @Override
  void orderBy() {
    sql.order_by("date desc");
  }
}
