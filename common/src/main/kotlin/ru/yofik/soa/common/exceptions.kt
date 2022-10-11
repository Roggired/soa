package ru.yofik.soa.common

class InvalidDataException(
    message: String
): RuntimeException(message)

class NotFoundException: RuntimeException()