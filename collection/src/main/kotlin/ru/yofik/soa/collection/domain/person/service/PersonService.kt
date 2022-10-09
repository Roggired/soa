package ru.yofik.soa.collection.domain.person.service

import ru.yofik.soa.collection.api.NotFoundException
import ru.yofik.soa.collection.api.PageRequest
import ru.yofik.soa.collection.api.person.PersonRequest
import ru.yofik.soa.collection.domain.Page
import ru.yofik.soa.collection.domain.filterClaim.*
import ru.yofik.soa.collection.domain.person.dao.PersonDao
import ru.yofik.soa.collection.domain.person.model.Coordinates
import ru.yofik.soa.collection.domain.person.model.Location
import ru.yofik.soa.collection.domain.person.model.Person
import ru.yofik.soa.collection.domain.person.model.validate
import java.time.LocalDate
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class PersonService {
    @Inject
    var personDao: PersonDao? = null
    @Inject
    var filterClaimFactory: FilterClaimFactory? = null
    @Inject
    var filterClaimProtector: FilterClaimProtector? = null

    fun create(request: PersonRequest): Person {
        val person = Person(
            id = 0,
            name = request.name,
            coordinates = Coordinates(
                id = 0,
                x = request.coordinates.x,
                y = request.coordinates.y
            ),
            creationDate = LocalDate.now(),
            height = request.height,
            birthday = request.birthday,
            eyeColor = request.eyeColor,
            hairColor = request.hairColor,
            location = Location(
                id = 0,
                x = request.location.x,
                y = request.location.y,
                z = request.location.z,
                name = request.location.name
            )
        )
        person.validate()

        return personDao!!.create(person)
    }

    fun updatePerson(id: Int, request: PersonRequest): Person {
        val person = personDao!!.getById(id) ?: throw NotFoundException()
        person.apply {
            name = request.name
            coordinates.x = request.coordinates.x
            coordinates.y = request.coordinates.y
            height = request.height
            birthday = request.birthday
            eyeColor = request.eyeColor
            hairColor = request.hairColor
            location.x = request.location.x
            location.y = request.location.y
            location.z = request.location.z
            location.name = request.location.name
        }
        person.validate()

        return personDao!!.update(person)
    }

    fun deleteById(id: Int) {
        val person = personDao!!.getById(id) ?: throw NotFoundException()
        personDao!!.delete(id)
    }

    fun getById(id: Int): Person {
        return personDao!!.getById(id) ?: throw NotFoundException()
    }

    fun getByPageRequest(pageRequest: PageRequest): Page<Person> {
        TODO()
//        return personDao.getByFilters(
//
//        )
    }

    private fun convertToClaims(filters: List<String>): List<FilterClaim> {
        return filterClaimProtector!!.protectFilterClaims(
            filterClaimFactory!!.createFromBase64(filters)
        )
    }

    private fun convertToFiltersMap(filters: List<FilterClaim>): Map<Pair<String, String>, Any> {
        return emptyMap()
    }

    private fun convertToSortCollection(filters: List<FilterClaim>): Collection<String> {
        return filters.filter { it.sort != SortOrder.NO }
            .map { it.entityName }
    }

    private fun translateEntityName(entityName: String): String {
        return when(entityName.lowercase()) {
            "person" -> "person"
            "coordinates" -> "coordinates"
            "location" -> "location"
            else -> throw FilterClaimFormatException("Unrecognized FilterClaim's entityName")
        }
    }

    private fun translatePropertyName(entityName: String, propertyName: String): String {
        return ""
    }
}