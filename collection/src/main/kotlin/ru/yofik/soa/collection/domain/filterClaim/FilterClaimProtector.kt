package ru.yofik.soa.collection.domain.filterClaim

import javax.ejb.Stateless

@Stateless
class FilterClaimProtector {
    fun protectFilterClaims(filterClaims: List<FilterClaim>): List<FilterClaim> {
        return filterClaims.map {
            FilterClaim(
                property = it.property,
                filter = if (it.filter is String) protectString(it.filter) else it.filter,
                sort = it.sort
            )
        }
    }

    private fun protectString(str: String): String {
        return str.replace("'", "\\'")
            .replace("\"", "\\\"")
            .replace(";", "\\;")
            .replace("?", "\\?")
    }
}