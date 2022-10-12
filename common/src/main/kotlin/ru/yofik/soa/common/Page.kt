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
@XmlSeeAlso(value = [Person::class, Coordinates::class, Location::class, Color::class])
data class Page<T>(
    val pageSize: Int,
    val pageIndex: Int,
    val elementsTotal: Int,
    val pagesTotal: Int,
    val content: MutableList<T>
) {
    constructor(): this(
        pageSize = 1,
        pageIndex = 0,
        elementsTotal = 0,
        pagesTotal = 0,
        content = mutableListOf()
    )
}