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
    private PersonDao personDao;

    public PersonsResource(PersonDao dao) {
        personDao = dao;
    }

    @GET
    @Path("/{id}")
    @Timed
    public Person getPerson(@PathParam("id") Integer id) {
        Person p = personDao.findById(id);
        if (p != null) {
            return p;
        } else {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }

    @GET
    @Timed
    public List<Person> listPersons() {
        return personDao.getAll();
    }

    @POST
    @Timed
    public void save(Person person) {
        if (person != null && person.isValid()) {
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
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.TEXT_PLAIN})
    public void deletePerson(@PathParam("id") Integer id) {
        /**
         * Note: AngularJS $resource will send a DELETE request as content-type test/plain for some reason;
         * so therefore we must add MediaType.TEXT_PLAIN here.
         */
        if (personDao.findById(id) != null) {
            personDao.deleteById(id);
        } else {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }
}
