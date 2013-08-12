package no.kodemaker.ps.dw.eventservice;

import com.yammer.dropwizard.Service;
import com.yammer.dropwizard.config.Bootstrap;
import com.yammer.dropwizard.config.Environment;
import no.kodemaker.ps.dw.eventservice.health.TemplateHealthCheck;
import no.kodemaker.ps.dw.eventservice.persistence.PersonDao;
import no.kodemaker.ps.dw.eventservice.representations.Person;
import no.kodemaker.ps.dw.eventservice.resources.HelloWorldResource;
import no.kodemaker.ps.dw.eventservice.resources.PersonsResource;
import org.h2.jdbcx.JdbcConnectionPool;
import org.skife.jdbi.v2.DBI;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * This main-class will be used by the start_server.sh script to start the server. It can also be
 * started up in the IDE, just remember to set the correct working directory and provide the expected
 * parameters: server dw-server.yml
 */
public class EventService extends Service<EventConfiguration> {

    private static List<Person> persons;

    static {
        persons = Collections.synchronizedList(new ArrayList<Person>());
        persons.add(new Person("Per", "per@kodemaker.no", "90915115"));
        persons.add(new Person("Magnus", "magnus@kodemaker.no"));
        persons.add(new Person("Ronny", "ronny@kodemaker.no"));
        persons.add(new Person("August", "august@kodemaker.no"));
        persons.add(new Person("Helge", "helge.jensen@finn.no"));
    }

    public static void main(String[] args) throws Exception {
        new EventService().run(args);
    }

    @Override
    public void initialize(Bootstrap<EventConfiguration> bootstrap) {
        bootstrap.setName("dw-server"); // name must match the yaml config file
    }

    @Override
    public void run(EventConfiguration conf, Environment env) throws ClassNotFoundException {
        String template = conf.getTemplate();
        String defaultName = conf.getDefaultName();

        //DBIFactory factory = new DBIFactory();
        //final DBI jdbi = factory.build(env, conf.getDatabaseConfiguration(), "postgresql");
        // using in-memory data base here for simplicity
        JdbcConnectionPool jdbcConnectionPool = JdbcConnectionPool.create("jdbc:h2:mem:test", "username", "password");
        DBI jdbi = new DBI(jdbcConnectionPool);
        PersonDao personDao = jdbi.onDemand(PersonDao.class);
        personDao.createPersonTable();
        seedTheDatabase(personDao);

        env.addResource(new PersonsResource(personDao));
        env.addResource(new HelloWorldResource(template, defaultName));
        env.addHealthCheck(new TemplateHealthCheck(template));
    }

    private void seedTheDatabase(PersonDao personDao) {
        for (Person p : persons) {
            personDao.insert(p);
        }
    }
}
