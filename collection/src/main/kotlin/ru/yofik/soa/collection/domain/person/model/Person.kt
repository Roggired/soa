package ru.yofik.soa.collection.domain.person.model

import java.time.LocalDate
import java.time.LocalDateTime

class Person(
    var id: Int,
    var name: String,
    var coordinates: Coordinates,
    var creationDate: LocalDate,
    var height: Int,
    var birthday: LocalDateTime,
    var eyeColor: Color,
    var hairColor: Color?,
    var location: Location
)

class Coordinates(
    var id: Long,
    var x : Long,
    var y: Double
)

class Location(
    var id: Long,
    var x: Long,
    var y: Float,
    var z: Float,
    var name: String
)

enum class Color {
    GREEN, RED, YELLOW, ORANGE
}