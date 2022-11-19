package ru.yofik.services.demography.api.controllers

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import ru.yofik.services.demography.infrastracture.integration.DemographyService
import ru.yofik.soa.common.InvalidDataException
import ru.yofik.soa.common.ResponseDouble
import ru.yofik.soa.common.ResponseInteger
import ru.yofik.soa.common.domain.person.model.Color
import java.nio.charset.StandardCharsets
import java.util.*

@CrossOrigin
@RestController
@RequestMapping("/demography/v1/demography", produces = [MediaType.APPLICATION_XML_VALUE])
class DemographyController(
    private val demographyService: DemographyService
) {
    @PostMapping("/nationality/{nationality}/percentage/{hair-color}")
    fun getPercentageByHairColorOfNationality(
        @PathVariable("nationality") nationality: String,
        @PathVariable("hair-color") hairColor: String
    ): ResponseDouble {
        return ResponseDouble(
            payload = demographyService.getPercentageOfPersonsByHairColorOfSpecifiedNationality(
                nationality = String(Base64.getDecoder().decode(nationality), StandardCharsets.UTF_8),
                hairColor = convertHairColorToColor(hairColor)
            )
        )
    }

    @PostMapping("/hair-color/{hair-color}")
    fun getAmountByHairColor(
        @PathVariable("hair-color") hairColor: String
    ): ResponseInteger {
        return ResponseInteger(
            payload = demographyService.getAmountOfPersonsByHairColor(
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