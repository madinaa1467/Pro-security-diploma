package kz.diploma.prosecurity.register.jdbcWeb;

import kz.diploma.prosecurity.controller.model.EventFilterWeb;
import kz.diploma.prosecurity.register.sql.SQL;
import kz.greetgo.db.ConnectionCallback;
import kz.greetgo.db.DbType;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractEventListLoaderWeb<T> implements ConnectionCallback<T> {

    EventFilterWeb filter;

    AbstractEventListLoaderWeb(EventFilterWeb filter) {
        this.filter = filter;
    }

    protected final SQL sql = new SQL();
    final List<Object> params = new ArrayList<>();

    void select(){
        sql.select("e.id")
                .select("to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date")
                .select("to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as time")
                .select("e.action")
                .select("e.entrance")
                .select("c.id as childId")
                .select("c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio")
                .select("c.name as firstName")
                .select("c.surname as lastName")
                .select("c.patronymic as patronymic")
                .select("c.gender as gender")
                .select("c.img as img")
                .select("p.name||' '||substring(p.surname from 1 for 1)||'. '||substring(p.patronymic from 1 for 1)||'.' as parentFio")
                .select("p.id as parentId");

    }

    abstract void prepareSql(DbType dbType);

    abstract void from();

    abstract void where();

    abstract void orderBy();

    abstract void limit();

    abstract void offset();
}
