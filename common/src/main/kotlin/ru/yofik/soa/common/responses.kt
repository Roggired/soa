package ru.yofik.soa.common

import ru.yofik.soa.common.domain.person.model.Color
import ru.yofik.soa.common.domain.person.model.Coordinates
import ru.yofik.soa.common.domain.person.model.Location
import ru.yofik.soa.common.domain.person.model.Person
import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlRootElement
import javax.xml.bind.annotation.XmlSeeAlso

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
data class BadRequestResponse(
    val status: String = "BAD_REQUEST",
    val payload: String?
) {
    constructor(): this(payload = null)
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
data class ResponseString(
    val status: String = "OK",
    val payload: String?
) {
    constructor(): this(payload = null)
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
data class ResponsePerson(
    val status: String = "OK",
    val payload: Person?
) {
    constructor(): this(payload = null)
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
data class ResponsePage(
    val status: String = "OK",
    val payload: Page<Person>?
) {
    constructor(): this(payload = null)
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@XmlSeeAlso(value = [Person::class, Coordinates::class, Location::class, Color::class])
data class ResponseListPerson(
    val status: String = "OK",
    val payload: List<Person>?
) {
    constructor(): this(payload = null)
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
data class ResponseDouble(
    val status: String = "OK",
    val payload: Double?
) {
    constructor(): this(payload = null)
}

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
data class ResponseInteger(
    val status: String = "OK",
    val payload: Int?
) {
    constructor(): this(payload = null)
}