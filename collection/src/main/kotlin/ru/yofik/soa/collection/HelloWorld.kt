package ru.yofik.soa.collection

import ru.yofik.soa.collection.infrastucture.storage.AbstractDao
import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/hello")
@Produces(MediaType.APPLICATION_XML)
@Consumes(MediaType.APPLICATION_XML)
class HelloWorld {
    @GET
    fun hello(): String {
        AbstractDao().getConnection()
        return "<hello>Hello, World! Collection</hello>"
    }
}