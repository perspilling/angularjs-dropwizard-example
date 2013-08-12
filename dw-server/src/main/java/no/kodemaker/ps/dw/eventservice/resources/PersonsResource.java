package no.kodemaker.ps.dw.eventservice.resources;

import com.yammer.metrics.annotation.Timed;
import no.kodemaker.ps.dw.eventservice.persistence.PersonDao;
import no.kodemaker.ps.dw.eventservice.representations.Person;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * The resource used to handle Person requests.
 *
 * @author Per Spilling
 */
@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonsResource {
    // only for testing
    private List<Person> persons;

    private PersonDao personDao;

    // only for testing
    public PersonsResource(List<Person> persons) {
        this.persons = persons;
    }

    public PersonsResource(PersonDao dao) {
        personDao = dao;
    }

    @GET
    @Path("/{id}")
    @Timed
    public Person getPerson(@PathParam("id") Integer id) {
        if (persons != null) {
            if (persons.size() > id) {
                return persons.get(id);
            }
        } else {
            personDao.findById(id);
        }
        throw new WebApplicationException(Response.Status.NOT_FOUND);
    }

    @GET
    @Timed
    public List<Person> listPersons() {
        if (persons != null) {
            return persons;
        } else {
            return personDao.getAll();
        }
    }

    @POST
    @Timed
    public void save(Person person) {
        if (persons != null) {
            if (!persons.contains(person)) {
                persons.add(person);
            } else {
                persons.set(persons.indexOf(person), person);
            }
        } else {
            if (person.getId() != null) {
                personDao.update(person);
            } else {
                personDao.insert(person);
            }
        }
    }

    @DELETE
    @Path("/{id}")
    @Timed
    public void deletePerson(@PathParam("id") Integer id) {
        if (persons != null) {
            if (persons.size() > id) {
                persons.remove(id);
            } else {
                throw new WebApplicationException(Response.Status.NOT_FOUND);
            }
        } else {
            personDao.deleteById(id);
        }
    }
}
