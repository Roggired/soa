package ru.yofik.soa.collection.api.person

import ru.yofik.soa.collection.api.PageRequest
import ru.yofik.soa.collection.domain.Page
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
import javax.ws.rs.QueryParam
import javax.ws.rs.core.MediaType

@Path("/v1/persons")
@Produces(MediaType.APPLICATION_XML)
class PersonResource {
    @Inject
    var personService: PersonService? = null
    // TODO add endpoint for GET PAGE with filters and sorting

    @GET
    fun getFiltered(
        @QueryParam("pageSize") pageSize: Int,
        @QueryParam("pageIndex") pageIndex: Int,
        @QueryParam("filters") filters: List<String>,
    ): Page<Person> = personService!!.getByPageRequest(
        PageRequest(
            pageSize,
            pageIndex,
            filters
        )
    )

    @GET
    @Path("/{id}")
    fun getById(
        @PathParam("id") id: Int
    ): Person = personService!!.getById(id)

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    fun createPerson(request: PersonRequest): Person = personService!!.create(request)

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_XML)
    fun updatePerson(
        @PathParam("id") id: Int,
        request: PersonRequest
    ): Person = personService!!.updatePerson(id, request)

    @DELETE
    @Path("/{id}")
    fun deletePerson(
        @PathParam("id") id: Int
    ): Unit = personService!!.deleteById(id)
}