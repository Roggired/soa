package ru.yofik.services.demography.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import ru.yofik.soa.common.BadRequestResponse
import ru.yofik.soa.common.InvalidDataException
import ru.yofik.soa.common.NotFoundException

@ControllerAdvice
class GlobalExceptionMapper {
    @ExceptionHandler
    fun handleNotFound(exception: NotFoundException): ResponseEntity<Void> {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .build()
    }

    @ExceptionHandler
    fun handleInvalidData(exception: InvalidDataException): ResponseEntity<BadRequestResponse> {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .contentType(MediaType.APPLICATION_XML)
            .body(
                BadRequestResponse(
                    payload = exception.message
                )
            )
    }
}