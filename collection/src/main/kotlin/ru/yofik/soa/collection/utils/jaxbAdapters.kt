package ru.yofik.soa.collection.utils

import ru.yofik.soa.collection.domain.person.model.Color
import java.time.LocalDate
import java.time.LocalDateTime
import javax.xml.bind.annotation.adapters.XmlAdapter

class LocalDateJaxbAdapter: XmlAdapter<String, LocalDate>() {
    override fun unmarshal(v: String?): LocalDate {
        return LocalDate.parse(v)
    }

    override fun marshal(v: LocalDate?): String {
        return v.toString()
    }
}

class LocalDateTimeJaxbAdapter: XmlAdapter<String, LocalDateTime>() {
    override fun unmarshal(v: String?): LocalDateTime {
        return LocalDateTime.parse(v)
    }

    override fun marshal(v: LocalDateTime?): String {
        return v.toString()
    }
}

class ColorJaxbAdapter: XmlAdapter<String, Color?>() {
    override fun unmarshal(v: String?): Color? {
        if (v == null) return null
        return Color.valueOf(v)
    }

    override fun marshal(v: Color?): String {
        return v.toString()
    }
}