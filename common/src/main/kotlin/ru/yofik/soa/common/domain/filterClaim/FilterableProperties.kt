package ru.yofik.soa.common.domain.filterClaim

enum class FilterableProperties(
    val column: String
) {
    PERSON_ID("person.id"),
    PERSON_NAME("person.name"),
    COORDINATES_X("coordinates.x"),
    COORDINATES_Y("coordinates.y"),
    PERSON_HEIGHT("person.height"),
    PERSON_BIRTHDAY("person.birthday"),
    PERSON_EYE_COLOR("person.eye_color"),
    PERSON_HAIR_COLOR("person.hair_color"),
    PERSON_NATIONALITY("person.nationality"),
    LOCATION_X("location.x"),
    LOCATION_Y("location.y"),
    LOCATION_Z("location.z"),
    LOCATION_NAME("location.name"),
    ;
}