package ru.yofik.soa.collection.api.person

import ru.yofik.soa.collection.api.PageRequest
import ru.yofik.soa.common.ResponsePage
import ru.yofik.soa.common.ResponsePerson
import ru.yofik.soa.common.ResponseString
import ru.yofik.soa.common.domain.person.model.Person
import ru.yofik.soa.collection.domain.person.service.PersonService
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

@Path("/v1/persons")
@Produces(MediaType.APPLICATION_XML)
class PersonResource {
    @Inject
    var personService: PersonService? = null

    @GET
    fun getFiltered(
        @QueryParam("pageSize") pageSize: Int,
        @QueryParam("pageIndex") pageIndex: Int,
        @QueryParam("filters") filters: List<String>,
    ): ResponsePage = ResponsePage(
        payload = personService!!.getByPageRequest(
            PageRequest(
                pageSize,
                pageIndex,
                filters
            )
        )
    )

    @GET
    @Path("/{id}")
    fun getById(
        @PathParam("id") id: Int
    ): ResponsePerson = ResponsePerson(
        payload = personService!!.getById(id)
    )

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    fun createPerson(personDto: Person): ResponsePerson = ResponsePerson(
        payload = personService!!.create(personDto)
    )

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_XML)
    fun updatePerson(
        @PathParam("id") id: Int,
        personDto: Person
    ): ResponsePerson = ResponsePerson(
        payload = personService!!.updatePerson(id, personDto)
    )

    @DELETE
    @Path("/{id}")
    fun deletePerson(
        @PathParam("id") id: Int
    ): ResponseString {
        personService!!.deleteById(id)
        return ResponseString(
            payload = "deleted"
        )
    }
}