package ru.yofik.soa.common.domain.person.model

import ru.yofik.soa.common.utils.ColorJaxbAdapter
import ru.yofik.soa.common.utils.LocalDateJaxbAdapter
import ru.yofik.soa.common.utils.LocalDateTimeJaxbAdapter
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlRootElement
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter

@XmlRootElement(name = "Person")
@XmlAccessorType(XmlAccessType.FIELD)
class Person {
    var id: Int
    var name: String
    var coordinates: Coordinates
    @XmlJavaTypeAdapter(value = LocalDateJaxbAdapter::class)
    var creationDate: LocalDate
    var height: Int
    @XmlJavaTypeAdapter(value = LocalDateTimeJaxbAdapter::class)
    var birthday: LocalDateTime
    @XmlJavaTypeAdapter(value = ColorJaxbAdapter::class)
    var eyeColor: Color
    @XmlJavaTypeAdapter(value = ColorJaxbAdapter::class)
    var hairColor: Color?
    var location: Location
    var nationality: String

    constructor(
        id: Int,
        name: String,
        coordinates: Coordinates,
        creationDate: LocalDate,
        height: Int,
        birthday: LocalDateTime,
        eyeColor: Color,
        hairColor: Color?,
        location: Location,
        nationality: String
    ) {
        this.id = id
        this.name = name
        this.coordinates = coordinates
        this.creationDate = creationDate
        this.height = height
        this.birthday = birthday
        this.eyeColor = eyeColor
        this.hairColor = hairColor
        this.location = location
        this.nationality = nationality
    }

    constructor(): this(
        id = 0,
        name = "",
        coordinates = Coordinates(),
        creationDate = LocalDate.now(ZoneId.of("UTC")),
        height = 0,
        birthday = LocalDateTime.now(ZoneId.of("UTC")),
        eyeColor = Color.GREEN,
        hairColor = null,
        location = Location(),
        nationality = ""
    )
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
class Coordinates(
    var id: Long,
    var x : Long,
    var y: Double
) {
    constructor(): this(
        id = 0L,
        x = 0L,
        y = 0.0
    )
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
class Location(
    var id: Long,
    var x: Long,
    var y: Float,
    var z: Float,
    var name: String
) {
    constructor(): this(
        id = 0L,
        x = 0L,
        y = 0.0f,
        z = 0.0f,
        name = ""
    )
}

enum class Color {
    GREEN, RED, YELLOW, ORANGE
}