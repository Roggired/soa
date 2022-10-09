package ru.yofik.soa.collection.domain.filterClaim

enum class SortOrder {
    ASC,
    DES,
    NO
}

data class FilterClaim(
    val entityName: String,
    val propertyName: String,
    val filter: Any?,
    val sort: SortOrder
)