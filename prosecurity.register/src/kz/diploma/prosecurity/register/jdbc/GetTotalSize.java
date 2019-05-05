package kz.diploma.prosecurity.register.jdbc;

import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.greetgo.db.DbType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class GetTotalSize extends AbstractEventListLoader<Long> {

  GetTotalSize(EventFilter filter) {
    super(filter);
  }

  @Override
  public Long doInConnection(Connection connection) throws Exception {
    prepareSql(DbType.detect(connection));

    try (PreparedStatement ps = connection.prepareStatement(sql.toString())) {

      {
        int index = 1;
        for (Object param : params) {
          ps.setObject(index++, param);
        }
      }

      try (ResultSet rs = ps.executeQuery()) {
        Long ret = 0L;

        if (rs.next()) {
          ret = rs.getLong("size");
        }
        return ret;
      }
    }
  }

  @Override
  protected void select() {

    sql.select("count(id) as size ");
  }

  @Override
  protected void from() {
    sql.from("event");
  }

  @Override
  protected void where(){
    sql.where("actual = 1");
  }

  @Override
  void prepareSql(DbType dbType) {
    select();

    switch (dbType) {

      case Postgres:
        from();
        where();
        return;

      default:
        throw new RuntimeException("Unknown DB " + dbType);
    }
  }

  @Override
  void orderBy() {

  }

  @Override
  void limit() {

  }

  @Override
  void offset() {

  }
}
