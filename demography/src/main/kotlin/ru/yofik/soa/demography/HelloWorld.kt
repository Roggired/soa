package ru.yofik.soa.demography

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
        return "<hello>Hello, World! Collection</hello>"
    }
}