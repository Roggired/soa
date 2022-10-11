package ru.yofik.soa.demography.config

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.jaxb.JaxbConverterFactory
import ru.yofik.soa.demography.domain.CollectionApi
import javax.enterprise.context.ApplicationScoped
import javax.enterprise.inject.Produces

const val COLLECTION_SERVICE_URL_ENV = "SOA_COLLECTION_URL"

@ApplicationScoped
class RetrofitConfig {
    @Produces
    fun collectionApi(): CollectionApi {
        return Retrofit.Builder()
            .client(
                OkHttpClient.Builder()
                    .addInterceptor(HttpLoggingInterceptor().apply { setLevel(HttpLoggingInterceptor.Level.BODY) })
                    .build()
            )
            .baseUrl(getCollectionServiceBaseUrl())
            .addConverterFactory(JaxbConverterFactory.create())
            .build()
            .create(CollectionApi::class.java)
    }

    private fun getCollectionServiceBaseUrl(): String {
        return System.getenv(COLLECTION_SERVICE_URL_ENV)
            ?: throw RuntimeException("Env is not specified: $COLLECTION_SERVICE_URL_ENV")
    }
}