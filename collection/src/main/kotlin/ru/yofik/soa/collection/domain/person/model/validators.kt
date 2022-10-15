package ru.yofik.soa.collection.domain.person.model

import ru.yofik.soa.common.InvalidDataException
import ru.yofik.soa.common.domain.person.model.Coordinates
import ru.yofik.soa.common.domain.person.model.Location
import ru.yofik.soa.common.domain.person.model.Person

fun Person.validate() {
    if (name.isBlank()) {
        throw InvalidDataException("Person's name cannot be blank")
    }

    if (height <= 0) {
        throw InvalidDataException("Person's height must be greater than 0")
    }

    coordinates.validate()
    location.validate()
}

fun Coordinates.validate() {
    if (y <= -348) {
        throw InvalidDataException("Coordinate's y must be greater than -348")
    }
}

fun Location.validate() {
    if (name.isBlank()) {
        throw InvalidDataException("Location's name cannot be blank")
    }
}