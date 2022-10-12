package ru.yofik.soa.demography.domain

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query
import ru.yofik.soa.common.ResponsePage
import ru.yofik.soa.common.ResponsePerson
import ru.yofik.soa.common.ResponseString
import ru.yofik.soa.common.domain.person.model.Person

interface CollectionApi {
    @POST("api/v1/persons")
    fun createPerson(
        @Body person: Person
    ): Call<ResponsePerson>

    @PUT("api/v1/persons/{id}")
    fun updatePerson(
        @Path("id") id: Int,
        @Body person: Person
    ): Call<ResponsePerson>

    @DELETE("api/v1/persons/{id}")
    fun deletePerson(
        @Path("id") id: Int
    ): Call<ResponseString>

    @GET("api/v1/persons/{id}")
    fun getPersonById(
        @Path("id") id: Int
    ): Call<ResponsePerson>

    @GET("api/v1/persons")
    fun getPersons(
        @Query("pageSize") pageSize: Int,
        @Query("pageIndex") pageIndex: Int,
        @Query("filters") filters: List<String>
    ): Call<ResponsePage>
}