package ru.yofik.services.demography

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient

@EnableEurekaClient
@SpringBootApplication
class DemographyApplication

fun main(args: Array<String>) {
    runApplication<DemographyApplication>(*args)
}
