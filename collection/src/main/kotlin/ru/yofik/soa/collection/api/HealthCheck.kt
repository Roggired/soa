package ru.yofik.soa.collection.api

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/v3/health")
@Produces(MediaType.APPLICATION_XML)
class HealthCheck {
    @GET
    fun health(): String = "UP"
}