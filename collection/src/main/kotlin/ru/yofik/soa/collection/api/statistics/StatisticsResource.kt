package ru.yofik.soa.collection.api.statistics

import ru.yofik.soa.common.ResponseDouble
import ru.yofik.soa.common.ResponseInteger
import ru.yofik.soa.common.ResponseListPerson
import ru.yofik.soa.collection.domain.statistics.StatisticsService
import javax.inject.Inject
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.QueryParam
import javax.ws.rs.core.MediaType

@Path("/v1/persons/statistics")
@Produces(MediaType.APPLICATION_XML)
class StatisticsResource {
    @Inject
    var statisticsService: StatisticsService? = null


    @POST
    @Path("/name/select")
    fun selectByName(
        @QueryParam("namePrefix") namePrefix: String
    ): ResponseListPerson = ResponseListPerson(
        payload = statisticsService!!.selectByName(namePrefix)
    )

    @POST
    @Path("/height/mean")
    fun getMeanHeight(): ResponseDouble = ResponseDouble(
        payload = statisticsService!!.getMeanHeight()
    )

    @POST
    @Path("/height/under/amount")
    fun getAmountUnderHeight(
        @QueryParam("targetHeight") targetHeight: Int
    ): ResponseInteger = ResponseInteger(
        payload = statisticsService!!.getAmountOfPersonsUnderHeight(targetHeight)
    )
}