package no.kodemaker.ps.dw.event.resources;

import com.yammer.metrics.annotation.Timed;
import no.kodemaker.ps.dw.event.domain.Person;

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
    private List<Person> persons;

    public PersonsResource(List<Person> persons) {
        this.persons = persons;
    }

    @GET
    @Path("/{id}")
    @Timed
    public Person getPerson(@PathParam("id") Integer id) {
        if (persons.size() > id) {
            return persons.get(id);
        }
        throw new WebApplicationException(Response.Status.NOT_FOUND);
    }

    @GET
    @Timed
    public List<Person> listPersons() {
        return persons;
    }

    @POST
    @Timed
    public void save(Person person) {
        if (!persons.contains(person)) {
            persons.add(person);
        } else {
            persons.set(persons.indexOf(person), person);
        }
    }

    @DELETE
    @Path("/{id}")
    @Timed
    public void deletePerson(@PathParam("id") Integer id) {
        if (persons.size() > id) {
            persons.remove(id);
        } else {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }
}
