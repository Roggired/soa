package ru.yofik.soa.collection.ejb.domain.person.dao

import ru.yofik.soa.common.Page
import ru.yofik.soa.collection.ejb.infrastucture.storage.AbstractDao
import ru.yofik.soa.common.domain.person.model.Color
import ru.yofik.soa.common.domain.person.model.Coordinates
import ru.yofik.soa.common.domain.person.model.Location
import ru.yofik.soa.common.domain.person.model.Person
import java.sql.Connection
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Timestamp
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class PersonDao: AbstractDao() {
    fun getByName(namePrefix: String): List<Person> {
        val connection = getConnection()

        val preparedStatement = connection.prepareStatement(
            """
                SELECT person.id,person.name,
                       person.coordinates_id,coordinates.x,coordinates.y,
                       person.creation_date,person.height,person.birthday,person.eye_color, person.hair_color,
                       person.nationality,
                       person.location_id,location.x,location.y,location.z,location.name
                FROM person 
                LEFT JOIN coordinates ON person.coordinates_id = coordinates.id 
                LEFT JOIN location ON person.location_id = location.id 
                WHERE person.name LIKE ? || '%'
            """.trimIndent()
        ).apply {
            setString(1, namePrefix)
        }
        val resultSet = preparedStatement.executeQuery()
        val result = mutableListOf<Person>()

        while (resultSet.next()) {
            result.add(extractPersonFromResultSet(resultSet))
        }

        connection.close()

        return result
    }

    fun getMeanHeight(): Double {
        val connection = getConnection()

        val preparedStatement = connection.prepareStatement(
            """
                SELECT AVG(person.height) FROM person                  
            """.trimIndent()
        )
        val resultSet = preparedStatement.executeQuery()
        resultSet.next()
        val result = resultSet.getDouble(1)

        connection.close()

        return result
    }

    fun getAmountUnderHeight(targetHeight: Int): Int {
        val connection = getConnection()

        val preparedStatement = connection.prepareStatement(
            """
                SELECT COUNT(*) FROM person WHERE height < ?                 
            """.trimIndent()
        ).apply {
            setInt(1, targetHeight)
        }
        val resultSet = preparedStatement.executeQuery()
        resultSet.next()
        val result = resultSet.getInt(1)

        connection.close()

        return result
    }

    fun create(person: Person): Person {
        val connection = getConnection()
        connection.autoCommit = false
        connection.transactionIsolation = Connection.TRANSACTION_REPEATABLE_READ

        try {
            val locationId = createLocation(connection, person.location)
            val coordinatesId = createCoordinates(connection, person.coordinates)
            val personId = createPerson(connection, person, locationId, coordinatesId)

            person.id = personId
            person.location.id = locationId
            person.coordinates.id = coordinatesId

            connection.commit()

            return person
        } catch (e: SQLException) {
            connection.rollback()
            throw e
        } finally {
            connection.close()
        }
    }

    private fun createPerson(
        connection: Connection,
        person: Person,
        locationId: Long,
        coordinatesId: Long
    ): Int {
        val preparedStatement = connection.prepareStatement(
            "INSERT INTO person(name, coordinates_id, creation_date, height, birthday, eye_color, hair_color, location_id, nationality) " +
                    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id"
        ).apply {
            setString(1, person.name)
            setLong(2, coordinatesId)
            setTimestamp(3, Timestamp.valueOf(person.creationDate.atTime(0, 0)))
            setInt(4, person.height)
            setTimestamp(5, Timestamp.valueOf(person.birthday))
            setString(6, person.eyeColor.toString())
            setString(7, person.hairColor?.toString())
            setLong(8, locationId)
            setString(9, person.nationality)
        }

        val resultSet = preparedStatement.executeQuery()
        resultSet.next()
        return resultSet.getInt(1)
    }

    private fun createLocation(connection: Connection, location: Location): Long {
        val preparedStatement = connection.prepareStatement(
            "INSERT INTO location(x, y, z, name) VALUES(?, ?, ?, ?) RETURNING id"
        ).apply {
            setLong(1, location.x)
            setFloat(2, location.y)
            setFloat(3, location.z)
            setString(4, location.name)
        }

        val resultSet = preparedStatement.executeQuery()
        resultSet.next()
        return resultSet.getLong(1)
    }

    private fun createCoordinates(connection: Connection, coordinates: Coordinates): Long {
        val preparedStatement = connection.prepareStatement(
            "INSERT INTO coordinates(x, y) VALUES(?, ?) RETURNING id"
        ).apply {
            setLong(1, coordinates.x)
            setDouble(2, coordinates.y)
        }

        val resultSet = preparedStatement.executeQuery()
        resultSet.next()
        return resultSet.getLong(1)
    }

    fun update(person: Person): Person {
        val connection = getConnection()
        connection.autoCommit = false
        connection.transactionIsolation = Connection.TRANSACTION_REPEATABLE_READ

        try {
            updateLocation(connection, person.location)
            updateCoordinates(connection, person.coordinates)
            updatePerson(connection, person)

            connection.commit()

            return person
        } catch (e: SQLException) {
            connection.rollback()
            throw e
        } finally {
            connection.close()
        }
    }

    private fun updatePerson(connection: Connection, person: Person) {
        val preparedStatement = connection.prepareStatement(
            "UPDATE person SET name=?,creation_date=?,height=?,birthday=?,eye_color=?,hair_color=?,nationality=? WHERE id=?"
        ).apply {
            setString(1, person.name)
            setTimestamp(2, Timestamp.valueOf(person.creationDate.atTime(0, 0)))
            setInt(3, person.height)
            setTimestamp(4, Timestamp.valueOf(person.birthday))
            setString(5, person.eyeColor.toString())
            setString(6, person.hairColor?.toString())
            setString(7, person.nationality)
            setInt(8, person.id)
        }
        preparedStatement.executeUpdate()
    }

    private fun updateLocation(connection: Connection, location: Location) {
        val preparedStatement = connection.prepareStatement(
            "UPDATE location SET x = ?, y = ?, z = ?, name = ? WHERE id = ?"
        ).apply {
            setLong(1, location.x)
            setFloat(2, location.y)
            setFloat(3, location.z)
            setString(4, location.name)
            setLong(5, location.id)
        }
        preparedStatement.executeUpdate()
    }

    private fun updateCoordinates(connection: Connection, coordinates: Coordinates) {
        val preparedStatement = connection.prepareStatement(
            "UPDATE coordinates SET x = ?, y = ? WHERE id = ?"
        ).apply {
            setLong(1, coordinates.x)
            setDouble(2, coordinates.y)
            setLong(3, coordinates.id)
        }
        preparedStatement.executeUpdate()
    }

    fun delete(id: Int) {
        val connection = getConnection()
        connection.autoCommit = false
        connection.transactionIsolation = Connection.TRANSACTION_READ_UNCOMMITTED

        try {
            val person = getById(id) ?: return
            deletePerson(connection, person.id)
            deleteCoordinates(connection, person.coordinates.id)
            deleteLocation(connection, person.location.id)

            connection.commit()
        } catch (e: SQLException) {
            connection.rollback()
            throw e
        } finally {
            connection.close()
        }
    }

    private fun deletePerson(connection: Connection, id: Int) {
        val preparedStatement = connection.prepareStatement(
            "DELETE FROM person WHERE id = ?"
        ).apply {
            setInt(1, id)
        }
        preparedStatement.executeUpdate()
    }

    private fun deleteCoordinates(connection: Connection, id: Long) {
        val preparedStatement = connection.prepareStatement(
            "DELETE FROM coordinates WHERE id = ?"
        ).apply {
            setLong(1, id)
        }
        preparedStatement.executeUpdate()
    }

    private fun deleteLocation(connection: Connection, id: Long) {
        val preparedStatement = connection.prepareStatement(
            "DELETE FROM location WHERE id = ?"
        ).apply {
            setLong(1, id)
        }
        preparedStatement.executeUpdate()
    }

    fun getById(id: Int): Person? {
        val connection = getConnection()
        val preparedStatement = connection.prepareStatement(
            """
                SELECT person.id,person.name,
                       person.coordinates_id,coordinates.x,coordinates.y,
                       person.creation_date,person.height,person.birthday,person.eye_color, person.hair_color,
                       person.nationality,
                       person.location_id,location.x,location.y,location.z,location.name
                FROM person 
                LEFT JOIN coordinates ON person.coordinates_id = coordinates.id 
                LEFT JOIN location ON person.location_id = location.id 
                WHERE person.id = ?
            """.trimIndent()
        ).apply {
            setInt(1, id)
        }

        val resultSet = preparedStatement.executeQuery()
        if (!resultSet.next()) {
            return null
        }

        val person = extractPersonFromResultSet(resultSet)

        connection.close()

        return person
    }

    fun getByFilters(
        filters: Map<Pair<String, String>, Any>,
        sort: Collection<String>,
        pageSize: Int,
        pageIndex: Int
    ): Page<Person> {
        val connection = getConnection()

        val countPreparedStatement = connection.prepareStatement(
            constructCountQuery(filters)
        )
        countPreparedStatement.apply {
            var index = 1
            for (entry in filters.entries) {
                countPreparedStatement.setObject(index++, entry.value)
            }
        }

        val countResultSet = countPreparedStatement.executeQuery()
        countResultSet.next()
        val elementsTotal = countResultSet.getInt(1)

        val preparedStatement = connection.prepareStatement(
            constructSelectQuery(
                filters,
                sort,
                pageSize,
                pageIndex
            )
        )
        preparedStatement.apply {
            var index = 1
            for (entry in filters.entries) {
                preparedStatement.setObject(index++, entry.value)
            }
        }

        val page: Page<Person>
        val resultSet = preparedStatement.executeQuery()
        if (!resultSet.next()) {
            return Page(
                pageSize = pageSize,
                pageIndex = pageIndex,
                elementsTotal = 0,
                pagesTotal = 0,
                content = ArrayList()
            )
        }

        val pagesTotal = if (elementsTotal % pageSize == 0) elementsTotal / pageSize else elementsTotal / pageSize + 1
        val payload = ArrayList<Person>()

        while (true) {
            payload.add(extractPersonFromResultSet(resultSet))

            if (!resultSet.next()) break
        }

        page = Page(
            pageSize = pageSize,
            pageIndex = pageIndex,
            elementsTotal = elementsTotal,
            pagesTotal = pagesTotal,
            content = payload
        )

        connection.close()

        return page
    }

    private fun constructSelectQuery(
        filters: Map<Pair<String, String>, Any>,
        sort: Collection<String>,
        pageSize: Int,
        pageIndex: Int
    ): String {
        var sql = """
                SELECT person.id,person.name,
                       person.coordinates_id,coordinates.x,coordinates.y,
                       person.creation_date,person.height,person.birthday,person.eye_color, person.hair_color,
                       person.nationality,
                       person.location_id,location.x,location.y,location.z,location.name
                FROM person 
                LEFT JOIN coordinates ON person.coordinates_id = coordinates.id 
                LEFT JOIN location ON person.location_id = location.id 
            """.trimIndent()
        if (filters.isNotEmpty()) {
            sql += " WHERE "
            val whereClauses = filters.map { (pair, _) ->
                if (pair.second.lowercase() == "like") {
                    "${pair.first} LIKE ? || '%'"
                } else {
                    "${pair.first} ${pair.second} ?"
                }
            }
            sql += whereClauses.joinToString(separator = " AND ")
        }

        if (sort.isEmpty()) {
            sql += " ORDER BY person.id "
        } else {
            sql += " ORDER BY "
            sql += sort.joinToString(separator = ",")
        }

        sql += " LIMIT $pageSize OFFSET ${pageIndex * pageSize}"

        return sql
    }

    private fun constructCountQuery(
        filters: Map<Pair<String, String>, Any>,
    ): String {
        var sql = """
                SELECT COUNT(*)
                FROM person 
                LEFT JOIN coordinates ON person.coordinates_id = coordinates.id 
                LEFT JOIN location ON person.location_id = location.id 
            """.trimIndent()
        if (filters.isNotEmpty()) {
            sql += " WHERE "
            val whereClauses = filters.map { (pair, _) ->
                if (pair.second.lowercase() == "like") {
                    "${pair.first} LIKE ? || '%'"
                } else {
                    "${pair.first} ${pair.second} ?"
                }
            }
            sql += whereClauses.joinToString(separator = " AND ")
        }

        return sql
    }

    private fun extractPersonFromResultSet(resultSet: ResultSet): Person {
        return Person(
            id = resultSet.getInt(1),
            name = resultSet.getString(2),
            coordinates = Coordinates(
                id = resultSet.getLong(3),
                x = resultSet.getLong(4),
                y = resultSet.getDouble(5)
            ),
            creationDate = resultSet.getTimestamp(6).toLocalDateTime().toLocalDate(),
            height = resultSet.getInt(7),
            birthday = resultSet.getTimestamp(8).toLocalDateTime(),
            eyeColor = Color.valueOf(resultSet.getString(9)),
            hairColor = if (resultSet.getString(10) == null) null else Color.valueOf(resultSet.getString(10)),
            location = Location(
                id = resultSet.getLong(12),
                x = resultSet.getLong(13),
                y = resultSet.getFloat(14),
                z = resultSet.getFloat(15),
                name = resultSet.getString(16)
            ),
            nationality = resultSet.getString(11)
        )
    }
}