package ru.yofik.soa.common.domain.filterClaim

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