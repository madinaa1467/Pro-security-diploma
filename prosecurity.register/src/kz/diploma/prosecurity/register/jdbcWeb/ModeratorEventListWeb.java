package kz.diploma.prosecurity.register.jdbcWeb;

import kz.diploma.prosecurity.controller.model.EventFilterWeb;


public class ModeratorEventListWeb extends EventListConnectionWeb {

    public ModeratorEventListWeb(EventFilterWeb filter) {
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
        sql.where("pc.parent = p.id");
        sql.where("pc.child = c.id");
        sql.where("pc.child = e.child");
        sql.where("c.actual = 1");
        sql.where("e.actual = 1");
        sql.where("pc.actual = 1");
        if (filter.startDate != null) {
            sql.where("date >= :startDate");
            sql.setValue("startDate", filter.startDate);
        }
        if (filter.entrance != null) {
            sql.where("lower(entrance) like :entrance");
            sql.setValue("entrance", "%" + filter.entrance.toLowerCase() + "%");
        }
        if (filter.endDate != null) {
            sql.where("date < :endDate");
            sql.setValue("endDate", filter.endDate);
        }
        if(filter.childName != null && !"".equals(filter.childName)){
            sql.where("lower(c.name) like :childName");
            sql.setValue("childName", "%" + filter.childName.toLowerCase() + "%");
        }
        if(filter.childSurname != null && !"".equals(filter.childSurname)){
            sql.where("lower(c.surname) like :childSurname");
            sql.setValue("childSurname", "%" + filter.childSurname.toLowerCase() + "%");
        }
        if(filter.childPatronymic != null && !"".equals(filter.childPatronymic)){
            sql.where("lower(c.patronymic) like :childPatronymic");
            sql.setValue("childPatronymic", "%" + filter.childPatronymic.toLowerCase() + "%");
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
