package ru.yofik.soa.collection.domain.person.service

import ru.yofik.soa.common.NotFoundException
import ru.yofik.soa.collection.api.PageRequest
import ru.yofik.soa.common.Page
import ru.yofik.soa.collection.domain.person.dao.PersonDao
import ru.yofik.soa.common.domain.person.model.Coordinates
import ru.yofik.soa.common.domain.person.model.Location
import ru.yofik.soa.common.domain.person.model.Person
import ru.yofik.soa.collection.domain.person.model.validate
import ru.yofik.soa.common.domain.filterClaim.*
import java.time.LocalDate
import java.time.ZoneId
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class PersonService {
    @Inject
    var personDao: PersonDao? = null

    fun create(personDto: Person): Person {
        val person = Person(
            id = 0,
            name = personDto.name,
            coordinates = Coordinates(
                id = 0,
                x = personDto.coordinates.x,
                y = personDto.coordinates.y
            ),
            creationDate = LocalDate.now(ZoneId.of("UTC")),
            height = personDto.height,
            birthday = personDto.birthday,
            eyeColor = personDto.eyeColor,
            hairColor = personDto.hairColor,
            location = Location(
                id = 0,
                x = personDto.location.x,
                y = personDto.location.y,
                z = personDto.location.z,
                name = personDto.location.name
            ),
            nationality = personDto.nationality
        )
        person.validate()

        return personDao!!.create(person)
    }

    fun updatePerson(id: Int, personDto: Person): Person {
        val person = personDao!!.getById(id) ?: throw NotFoundException()
        person.apply {
            name = personDto.name
            coordinates.x = personDto.coordinates.x
            coordinates.y = personDto.coordinates.y
            height = personDto.height
            birthday = personDto.birthday
            eyeColor = personDto.eyeColor
            hairColor = personDto.hairColor
            nationality = personDto.nationality
            location.x = personDto.location.x
            location.y = personDto.location.y
            location.z = personDto.location.z
            location.name = personDto.location.name
        }
        person.validate()

        return personDao!!.update(person)
    }

    fun deleteById(id: Int) {
        personDao!!.getById(id) ?: throw NotFoundException()
        personDao!!.delete(id)
    }

    fun getById(id: Int): Person {
        return personDao!!.getById(id) ?: throw NotFoundException()
    }

    fun getByPageRequest(pageRequest: PageRequest): Page<Person> {
        val filterClaims = convertToClaims(pageRequest.filters)
        val filters = convertToFiltersMap(filterClaims)
        val sort = convertToSortCollection(filterClaims)

        return personDao!!.getByFilters(
            filters = filters,
            sort = sort,
            pageIndex = pageRequest.pageIndex,
            pageSize = pageRequest.pageSize
        )
    }

    private fun convertToClaims(filters: List<String>): List<FilterClaim> {
        return protectFilterClaims(
            createFromBase64(filters)
        )
    }

    private fun convertToFiltersMap(filters: List<FilterClaim>): Map<Pair<String, String>, Any> {
        return filters
            .filter {
                it.filter != null
            }.associate {
                when (it.property) {
                    FilterableProperties.PERSON_ID -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.PERSON_NAME -> (it.property.column to "LIKE") to it.filter!!
                    FilterableProperties.COORDINATES_X -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.COORDINATES_Y -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.PERSON_HEIGHT -> (it.property.column to ">=") to it.filter!!
                    FilterableProperties.PERSON_BIRTHDAY -> (it.property.column to ">=") to it.filter!!
                    FilterableProperties.PERSON_EYE_COLOR -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.PERSON_HAIR_COLOR -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.PERSON_NATIONALITY -> (it.property.column to "LIKE") to it.filter!!
                    FilterableProperties.LOCATION_X -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.LOCATION_Y -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.LOCATION_Z -> (it.property.column to "=") to it.filter!!
                    FilterableProperties.LOCATION_NAME -> (it.property.column to "LIKE") to it.filter!!
                }
            }
    }

    private fun convertToSortCollection(filters: List<FilterClaim>): Collection<String> {
        return filters.filter { it.sort != SortOrder.NO }
            .map {
                if (it.sort == SortOrder.ASC) {
                    it.property.column
                } else {
                    "${it.property.column} DESC"
                }
            }
    }
}