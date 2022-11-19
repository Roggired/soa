package ru.yofik.services.demography.api.controllers

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@RequestMapping("/demography/v1/demography")
class HelloWorldController {
    @GetMapping
    fun hello(): String {
        return "<hello>Hello, World! Collection</hello>"
    }
}