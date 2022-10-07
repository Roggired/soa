package ru.yofik.soa.collection.domain.person.model

import java.time.LocalDate
import java.time.LocalDateTime

class Person(
    val id: Int,
    val name: String,
    val coordinates: Coordinates,
    val creationDate: LocalDate,
    val height: Int,
    val birthday: LocalDateTime,
    val eyeColor: Color,
    val hairColor: Color?,
    val location: Location
)

class Coordinates(
    val id: Long,
    val x : Long,
    val y: Double
)

class Location(
    val id: Long,
    val x: Long,
    val y: Float,
    val z: Float,
    val name: String
)

enum class Color {
    GREEN, RED, YELLOW, ORANGE
}