package kz.diploma.prosecurity.register.jdbcWeb;

import kz.diploma.prosecurity.controller.model.EventFilterWeb;


public class ParentEventListWeb extends EventListConnectionWeb {

    public ParentEventListWeb(EventFilterWeb filter) {
        super(filter);
    }


    @Override
    void from() {
        sql.from("child as c");
        sql.from("event as e");
        sql.from("parent_child pc");
        sql.from("person p");
    }

    @Override
    void where() {
        sql.where("pc.parent = :parentId");
        sql.setValue("parentId", filter.parentId);
        sql.where("pc.parent = p.id");

        if(filter.childId != 0) {
            sql.where("pc.child = :childId");
            sql.setValue("childId", filter.childId);
        }
        sql.where("pc.child = c.id");
        sql.where("pc.child = e.child");
        sql.where("c.actual = 1");
        sql.where("e.actual = 1");
        sql.where("pc.actual = 1");
        if (filter.startDate != null) {
            sql.where("date >= :startDate");
            sql.setValue("startDate", filter.startDate);
        }
        if (filter.endDate != null) {
            sql.where("date < :endDate");
            sql.setValue("endDate", filter.endDate);
        }
        if (filter.entrance != null) {
            sql.where("lower(entrance) like :entrance");
            sql.setValue("entrance", "%" + filter.entrance.toLowerCase() + "%");
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
