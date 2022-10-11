package ru.yofik.soa.collection.api.person

import ru.yofik.soa.common.domain.person.model.Color
import java.time.LocalDateTime

data class PersonRequest(
    val name: String,
    val coordinates: CoordinatesRequest,
    val height: Int,
    val birthday: LocalDateTime,
    val eyeColor: Color,
    val hairColor: Color?,
    val location: LocationRequest
)

data class CoordinatesRequest(
    val x : Long,
    val y: Double
)

data class LocationRequest(
    val x: Long,
    val y: Float,
    val z: Float,
    val name: String
)