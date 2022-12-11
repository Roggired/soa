package ru.yofik.soa.common.domain.filterClaim

import java.io.Serializable

enum class SortOrder {
    ASC,
    DES,
    NO
}

data class FilterClaim(
    val property: FilterableProperties,
    val filter: Any?,
    val sort: SortOrder
): Serializable