package ru.yofik.soa.collection.domain.person.model

import ru.yofik.soa.collection.api.InvalidDataException

fun Person.validate() {
    if (name.isBlank()) {
        throw InvalidDataException("Person's name cannot be blank")
    }

    if (height <= 0) {
        throw InvalidDataException("Person's height must be greater than 0")
    }
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