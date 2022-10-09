package ru.yofik.soa.collection.infrastucture.config

class FailedToUpdateDBException(
    cause: Throwable
): RuntimeException(cause)