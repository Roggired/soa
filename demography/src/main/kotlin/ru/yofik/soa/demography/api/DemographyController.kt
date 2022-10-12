package ru.yofik.soa.demography.api

import ru.yofik.soa.common.InvalidDataException
import ru.yofik.soa.common.ResponseDouble
import ru.yofik.soa.common.ResponseInteger
import ru.yofik.soa.common.domain.person.model.Color
import ru.yofik.soa.demography.domain.DemographyService
import javax.inject.Inject
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Path("/v1/demography")
@Produces(MediaType.APPLICATION_XML)
class DemographyController {
    @Inject
    var demographyService: DemographyService? = null

    @POST
    @Path("/nationality/{nationality}/percentage/{hair-color}")
    fun getPercentageByHairColorOfNationality(
        @PathParam("nationality") nationality: String,
        @PathParam("hair-color") hairColor: String
    ): ResponseDouble {
        return ResponseDouble(
            payload = demographyService!!.getPercentageOfPersonsByHairColorOfSpecifiedNationality(
                nationality = nationality,
                hairColor = convertHairColorToColor(hairColor)
            )
        )
    }

    @POST
    @Path("/hair-color/{hair-color}")
    fun getAmountByHairColor(
        @PathParam("hair-color") hairColor: String
    ): ResponseInteger {
        return ResponseInteger(
            payload = demographyService!!.getAmountOfPersonsByHairColor(
                hairColor = convertHairColorToColor(hairColor)
            )
        )
    }

    private fun convertHairColorToColor(hairColor: String): Color {
        try {
            return Color.valueOf(hairColor)
        } catch (e: IllegalArgumentException) {
            throw InvalidDataException("Invalid hair color")
        }
    }
}