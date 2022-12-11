package ru.yofik.soa.collection.api

import ru.yofik.soa.common.BadRequestResponse
import ru.yofik.soa.common.InvalidDataException
import ru.yofik.soa.common.NotFoundException
import ru.yofik.soa.common.utils.log
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response
import javax.ws.rs.core.Response.Status
import javax.ws.rs.ext.ExceptionMapper
import javax.ws.rs.ext.Provider

@Provider
open class GlobalExceptionMapper : ExceptionMapper<RuntimeException> {
    companion object {
        private val MAPPERS = mapOf(
            NotFoundException::class.java to GlobalExceptionMapper::handleNotFound,
            InvalidDataException::class.java to GlobalExceptionMapper::handleInvalidData
        )

        private fun handleNotFound(exception: RuntimeException?): Response {
            return Response
                .status(Status.NOT_FOUND)
                .build()
        }

        private fun handleInvalidData(exception: RuntimeException?): Response {
            log.error("Invalid data exception", exception)
            return Response
                .status(Status.BAD_REQUEST)
                .type(MediaType.APPLICATION_XML_TYPE)
                .entity(
                    BadRequestResponse(
                        payload = exception?.message
                    )
                )
                .build()
        }
    }

    override fun toResponse(exception: RuntimeException?): Response {
        val mapper = MAPPERS[exception!!::class.java]

        if (mapper == null) {
            log.error("Internal server error", exception)

            return Response
                .status(Status.INTERNAL_SERVER_ERROR)
                .build()
        }

        return mapper.invoke(exception)
    }
}