package kz.diploma.prosecurity.register.jdbc;

import kz.diploma.prosecurity.controller.model.Event;
import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.greetgo.db.DbType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public abstract class EventListConnection extends AbstractEventListLoader<List<Event>> {

  public EventListConnection(EventFilter filter) {
    super(filter);
  }

  @Override
  public List<Event> doInConnection(Connection connection) throws Exception {
    prepareSql(DbType.detect(connection));
    List<Event> ret = new ArrayList<>();
    try (PreparedStatement ps = connection.prepareStatement(sql.compile())) {
      try (ResultSet rs = sql.applyParameter(ps).executeQuery()) {
        while (rs.next())
          ret.add(fromRs(rs));
      }
    }
    return ret;
  }

  protected Event fromRs(ResultSet rs) throws SQLException {
    Event ret = new Event();
    ret.id = rs.getLong("id");
    ret.date = new java.util.Date(rs.getTimestamp("date").getTime());
    ret.action = rs.getString("action");
    ret.childId = rs.getLong("childId");
    ret.fio = rs.getString("fio");
    ret.gender = rs.getString("gender");
    return ret;
  }

  @Override
  void prepareSql(DbType dbType) {
    select();

    switch (dbType) {

      case Postgres:
        from();
        where();
        orderBy();
        limit();
        offset();
        return;

      default:
        throw new RuntimeException("Unknown DB " + dbType);
    }
  }
}
