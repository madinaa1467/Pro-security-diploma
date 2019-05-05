package kz.diploma.prosecurity.register.jdbc;

import kz.diploma.prosecurity.controller.model.EventFilter;


public class ChildrenEventList extends EventListConnection {

  public ChildrenEventList(EventFilter filter) {
    super(filter);
  }

  @Override
  void from() {
    sql.from("child as c");
    sql.from("event as e");
    sql.from("parent_child pc");
  }

  @Override
  void where() {
    sql.where("pc.parent = :parentId");
    sql.setValue("parentId", filter.parentId);
//    sql.where("pc.parent = 1");
    sql.where("pc.child = c.id");
    sql.where("pc.child = e.child");
    sql.where("c.actual = 1");
    sql.where("e.actual = 1");
    sql.where("pc.actual = 1");
    if(filter.startDate != null){
      sql.where("date >= :startDate");
      sql.setValue("startDate", filter.startDate);
    }
    if(filter.endDate != null){
      sql.where("date < :endDate");
      sql.setValue("endDate", filter.endDate);
    }
//    sql.where("date > '2007-02-16'");
//    sql.where("date <= '2007-02-16 23:59:59'");

  }

  @Override
  void limit() {
    sql.limit(":limit");
    sql.setValue("limit", filter.limit);
//    sql.limit("15");

  }

  @Override
  void offset() {
    sql.offset(":offset");
    sql.setValue("offset", filter.offset);
//    sql.offset("0");

  }
  @Override
  void orderBy() {
    sql.order_by("date desc");
  }
}
