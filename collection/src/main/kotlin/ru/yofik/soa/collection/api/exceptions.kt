package ru.yofik.soa.collection.api

class InvalidDataException(
    message: String
): RuntimeException(message)

class NotFoundException: RuntimeException()