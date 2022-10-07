package ru.yofik.soa.collection.infrastucture.storage

import java.sql.Connection
import java.sql.DriverManager

const val DB_URL_ENV = "SOA_DB"
const val DB_USER_ENV = "SOA_USER"
const val DB_PASSWORD_ENV = "SOA_PASSWORD"

abstract class AbstractDao {
    protected fun getConnection(): Connection {
        return DriverManager.getConnection(
            getDbUrl(),
            getDbUser(),
            getDbPassword()
        )
    }

    private fun getDbUrl(): String {
        return System.getenv(DB_URL_ENV) ?: throw RuntimeException("Environment variable $DB_URL_ENV is not set")
    }

    private fun getDbUser(): String {
        return System.getenv(DB_USER_ENV) ?: throw RuntimeException("Environment variable $DB_USER_ENV is not set")
    }

    private fun getDbPassword(): String {
        return System.getenv(DB_PASSWORD_ENV) ?: throw RuntimeException("Environment variable $DB_PASSWORD_ENV is not set")
    }
}