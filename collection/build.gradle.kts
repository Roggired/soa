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
    // project
    implementation(project(":common"))

    // web
    providedCompile("javax.servlet:javax.servlet-api:4.0.1")
    providedCompile("javax.validation:validation-api:2.0.1.Final")
    providedCompile("javax.ws.rs:javax.ws.rs-api:2.1.1")
//    implementation("org.jboss.resteasy:resteasy-jaxb-provider:6.2.0.Final")
    providedCompile("javax.annotation:javax.annotation-api:1.3.2")
    providedCompile("javax.xml.bind:jaxb-api:2.3.1")
    providedCompile("javax.ejb:javax.ejb-api:3.2.2")
    compileOnly("javax.enterprise:cdi-api:2.0.SP1")
    implementation("org.slf4j:slf4j-api:2.0.3")
    implementation("org.liquibase:liquibase-core:4.16.1")

    implementation("com.google.code.gson:gson:2.9.1")

    // db
    implementation("org.postgresql:postgresql:42.5.0")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}