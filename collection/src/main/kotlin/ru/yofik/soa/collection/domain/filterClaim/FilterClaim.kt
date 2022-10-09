package ru.yofik.soa.collection.domain.filterClaim

enum class SortOrder {
    ASC,
    DES,
    NO
}

data class FilterClaim(
    val property: FilterableProperties,
    val filter: Any?,
    val sort: SortOrder
)