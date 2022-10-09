package ru.yofik.soa.collection.domain

data class Page<T>(
    val pageSize: Int,
    val pageIndex: Int,
    val elementsTotal: Int,
    val pagesTotal: Int,
    val payload: List<T>
)