package ru.yofik.soa.common

import java.io.Serializable

data class PageRequest(
    val pageSize: Int,
    val pageIndex: Int,
    val filters: ArrayList<String>
): Serializable