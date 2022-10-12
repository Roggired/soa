package ru.yofik.soa.common.utils

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import kotlin.reflect.KClass

val loggers = HashMap<KClass<*>, Logger>()

@Suppress("UNUSED")
val <reified T> T.log: Logger
    inline get() = loggers.getOrPut(T::class) {
        LoggerFactory.getLogger(T::class.java)
    }