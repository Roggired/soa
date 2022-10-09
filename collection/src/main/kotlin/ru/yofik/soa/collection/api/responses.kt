package ru.yofik.soa.collection.api

import ru.yofik.soa.collection.domain.Page
import ru.yofik.soa.collection.domain.person.model.Person
import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlRootElement

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