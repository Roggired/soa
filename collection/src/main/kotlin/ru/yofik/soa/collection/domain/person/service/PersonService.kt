package ru.yofik.soa.collection.domain.person.service

import ru.yofik.soa.collection.api.NotFoundException
import ru.yofik.soa.collection.api.person.PersonRequest
import ru.yofik.soa.collection.domain.person.dao.PersonDao
import ru.yofik.soa.collection.domain.person.model.Coordinates
import ru.yofik.soa.collection.domain.person.model.Location
import ru.yofik.soa.collection.domain.person.model.Person
import ru.yofik.soa.collection.domain.person.model.validate
import java.time.LocalDate
import javax.ejb.Stateless
import javax.inject.Inject

@Stateless
class PersonService
@Inject constructor(
    private val personDao: PersonDao
) {
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

        return personDao.create(person)
    }

    fun updatePerson(id: Int, request: PersonRequest): Person {
        val person = personDao.getById(id) ?: throw NotFoundException()
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

        return personDao.update(person)
    }

    fun deleteById(id: Int) {
        val person = personDao.getById(id) ?: throw NotFoundException()
        personDao.delete(id)
    }

    fun getById(id: Int): Person {
        return personDao.getById(id) ?: throw NotFoundException()
    }
}