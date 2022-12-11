package ru.yofik.soa.collection.ejb.domain.statistics

import ru.yofik.soa.collection.ejb.domain.person.dao.PersonDao
import ru.yofik.soa.common.domain.person.model.Person
import java.io.Serializable
import javax.ejb.Remote
import javax.ejb.Stateless
import javax.inject.Inject

interface StatisticsService {
    fun selectByName(namePrefix: String): ArrayList<Person>
    fun getMeanHeight(): Double
    fun getAmountOfPersonsUnderHeight(targetHeight: Int): Int
}

@Stateless
@Remote(StatisticsService::class)
class StatisticsServiceEJB: Serializable, StatisticsService {
    @Inject
    var personDao: PersonDao? = null


    override fun selectByName(namePrefix: String): ArrayList<Person> {
        return ArrayList(personDao!!.getByName(namePrefix))
    }

    override fun getMeanHeight(): Double {
        return personDao!!.getMeanHeight()
    }

    override fun getAmountOfPersonsUnderHeight(targetHeight: Int): Int {
        return personDao!!.getAmountUnderHeight(targetHeight)
    }
}