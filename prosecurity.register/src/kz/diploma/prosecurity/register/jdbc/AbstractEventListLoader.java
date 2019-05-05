package kz.diploma.prosecurity.register.jdbc;

import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.register.sql.SQL;
import kz.greetgo.db.ConnectionCallback;
import kz.greetgo.db.DbType;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractEventListLoader<T> implements ConnectionCallback<T> {

  EventFilter filter;
  AbstractEventListLoader(EventFilter filter) {
    this.filter = filter;
  }

  protected final SQL sql = new SQL();
  final List<Object> params = new ArrayList<>();

  void select(){
      sql.select("e.id")
              .select("to_char(e.date, 'YYYY-MM-DD HH24:MI:SS') as date")
              .select("e.action")
              .select("c.id as childId")
              .select("c.name||' '||substring(c.surname from 1 for 1)||'. '||substring(c.patronymic from 1 for 1)||'.' as fio")
              .select("c.gender as gender");
    }

  abstract void prepareSql(DbType dbType);

  abstract void from();

  abstract void where();

  abstract void orderBy();

  abstract void limit();

  abstract void offset();
}
