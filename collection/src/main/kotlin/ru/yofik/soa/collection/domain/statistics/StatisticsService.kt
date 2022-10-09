package ru.yofik.soa.collection.domain.statistics

import ru.yofik.soa.collection.domain.person.dao.PersonDao
import ru.yofik.soa.collection.domain.person.model.Person
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class StatisticsService {
    @Inject
    var personDao: PersonDao? = null


    fun selectByName(namePrefix: String): List<Person> {
        return personDao!!.getByName(namePrefix)
    }

    fun getMeanHeight(): Double {
        return personDao!!.getMeanHeight()
    }

    fun getAmountOfPersonsUnderHeight(targetHeight: Int): Int {
        return personDao!!.getAmountUnderHeight(targetHeight)
    }
}