package no.kodemaker.ps.dw.eventservice.persistence;

import no.kodemaker.ps.dw.eventservice.representations.Person;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Per Spilling
 */
public class PersonMapper implements ResultSetMapper<Person> {
    @Override
    public Person map(int i, ResultSet rs, StatementContext statementContext) throws SQLException {
        return new Person(rs.getInt("id"), rs.getString("name"), rs.getString("email"), rs.getString("phone"));
    }
}
