package ru.yofik.soa.collection.api.person

import ru.yofik.soa.collection.domain.person.model.Person
import ru.yofik.soa.collection.domain.person.service.PersonService
import javax.inject.Inject
import javax.ws.rs.Consumes
import javax.ws.rs.DELETE
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.PUT
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/v1/persons")
@Produces(MediaType.APPLICATION_XML)
class PersonResource
@Inject constructor(
    private val personService: PersonService
) {
    // TODO add endpoint for GET PAGE with filters and sorting

    @GET
    @Path("/{id}")
    fun getById(
        @PathParam("id") id: Int
    ): Person {
        return personService.getById(id)
    }

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    fun createPerson(request: PersonRequest): Person {
        return personService.create(request)
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_XML)
    fun updatePerson(
        @PathParam("id") id: Int,
        request: PersonRequest
    ): Person {
        return personService.updatePerson(id, request)
    }

    @DELETE
    @Path("/{id}")
    fun deletePerson(
        @PathParam("id") id: Int
    ) {
        personService.deleteById(id)
    }
}