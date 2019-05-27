package kz.diploma.prosecurity.register.jdbcWeb;

import kz.diploma.prosecurity.controller.model.EventFilter;
import kz.diploma.prosecurity.controller.model.EventWeb;
import kz.greetgo.db.DbType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public abstract class EventListConnectionWeb extends AbstractEventListLoaderWeb<List<EventWeb>> {

    public EventListConnectionWeb(EventFilter filter) {
        super(filter);
    }

    @Override
    public List<EventWeb> doInConnection(Connection connection) throws Exception {
        prepareSql(DbType.detect(connection));
        List<EventWeb> ret = new ArrayList<>();
        try (PreparedStatement ps = connection.prepareStatement(sql.compile())) {
            try (ResultSet rs = sql.applyParameter(ps).executeQuery()) {
                while (rs.next())
                    ret.add(fromRs(rs));
            }
        }
        return ret;
    }

    protected EventWeb fromRs(ResultSet rs) throws SQLException {
        EventWeb ret = new EventWeb();
        ret.id = rs.getLong("id");
        ret.date = new java.util.Date(rs.getTimestamp("date").getTime());
        ret.action = rs.getString("action");
        ret.childId = rs.getLong("childId");
        ret.fio = rs.getString("fio");
        ret.gender = rs.getString("gender");
        ret.img = rs.getString("img");
        ret.parentId = rs.getLong("parent");
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
