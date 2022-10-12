package ru.yofik.soa.collection.api

data class PageRequest(
    val pageSize: Int,
    val pageIndex: Int,
    val filters: List<String>
)