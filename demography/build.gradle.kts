import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.7.10"
    id("war")
}

group = "ru.yofik"
version = "2.0"

repositories {
    mavenCentral()
}

dependencies {
    // web
    providedCompile("javax.validation:validation-api:2.0.1.Final")
    providedCompile("javax.ws.rs:javax.ws.rs-api:2.1.1")
    providedCompile("javax.annotation:javax.annotation-api:1.3.2")
    providedCompile("javax.xml.bind:jaxb-api:2.3.1")
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}