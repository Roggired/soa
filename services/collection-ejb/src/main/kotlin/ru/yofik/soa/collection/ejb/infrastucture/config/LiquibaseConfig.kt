package ru.yofik.soa.collection.ejb.infrastucture.config

import liquibase.Liquibase
import liquibase.database.DatabaseFactory
import liquibase.database.jvm.JdbcConnection
import liquibase.exception.LiquibaseException
import liquibase.resource.ClassLoaderResourceAccessor
import ru.yofik.soa.collection.ejb.infrastucture.storage.AbstractDao
import java.sql.SQLException
import javax.annotation.PostConstruct
import javax.ejb.Singleton
import javax.ejb.Startup

class LiquibaseDao: AbstractDao()

@Singleton
@Startup
open class LiquibaseConfig {
    @PostConstruct
    fun init() {
        try {
            val liquibaseDao = LiquibaseDao()
            val resourceAccessor = ClassLoaderResourceAccessor(this::class.java.classLoader)
            val connection = liquibaseDao.getConnection()
            val jdbcConnection = JdbcConnection(connection)
            val database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(jdbcConnection)
            val liquibase = Liquibase("liquibase/db.changelog.xml", resourceAccessor, database)
            liquibase.update("development")
            connection.close()
        } catch (e: SQLException) {
            throw FailedToUpdateDBException(e)
        } catch (e: LiquibaseException) {
            throw FailedToUpdateDBException(e)
        }
    }
}