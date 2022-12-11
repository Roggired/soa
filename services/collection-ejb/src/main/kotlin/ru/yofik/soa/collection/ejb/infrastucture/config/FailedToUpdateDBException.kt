package ru.yofik.soa.collection.ejb.infrastucture.config

class FailedToUpdateDBException(
    cause: Throwable
): RuntimeException(cause)