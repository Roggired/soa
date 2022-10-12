import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
    kotlin("plugin.allopen")
    kotlin("plugin.noarg")
    kotlin("kapt")
    id("war")
}

group = "ru.yofik"
version = "2.0"

repositories {
    mavenCentral()
}

allOpen {
    annotations(
        "javax.ejb.Stateless",
        "javax.ejb.Stateful",
        "javax.ws.rs.Path",
        "javax.enterprise.context.ApplicationScoped",
        "javax.enterprise.context.RequestScope"
    )
}


dependencies {
    // web
    providedCompile("javax.xml.bind:jaxb-api:2.3.1")
    implementation("org.slf4j:slf4j-api:2.0.3")
    implementation("com.google.code.gson:gson:2.9.1")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}