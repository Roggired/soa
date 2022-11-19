package ru.yofik.services.demography.infrastracture.config

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import retrofit2.Retrofit
import retrofit2.converter.jaxb.JaxbConverterFactory
import ru.yofik.services.demography.infrastracture.integration.CollectionApi
import java.io.File
import java.security.KeyStore
import javax.net.ssl.*


const val COLLECTION_SERVICE_URL_ENV = "SOA_COLLECTION_URL"
const val TRUSTSTORE_ENV = "TRUSTSTORE"
const val TRUSTSTORE_PASS_ENV = "TRUSTSTORE_PASS"

@Configuration
class RetrofitConfig {
    @Bean
    fun collectionApi(): CollectionApi {
//        val keyStore = KeyStore.getInstance(getTruststoreFile(), getTruststorePass())

//        val trustManagerFactory: TrustManagerFactory =
//            TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
//        trustManagerFactory.init(keyStore)
//        val trustManagers: Array<TrustManager> = trustManagerFactory.trustManagers
//        check(!(trustManagers.size != 1 || trustManagers[0] !is X509TrustManager)) {
//            ("Unexpected default trust managers:"
//                    + trustManagers.contentToString())
//        }
//        val x509TrustManager = trustManagers[0] as X509TrustManager
//
//        val sslContext: SSLContext = SSLContext.getInstance("TLS")
//        sslContext.init(null, arrayOf(x509TrustManager), null)
//        val sslSocketFactory: SSLSocketFactory = sslContext.socketFactory

        return Retrofit.Builder()
            .client(
                OkHttpClient.Builder()
                    .addInterceptor(HttpLoggingInterceptor().apply { setLevel(HttpLoggingInterceptor.Level.BODY) })
//                    .sslSocketFactory(sslSocketFactory, x509TrustManager)
                    .build()
            )
            .baseUrl(getCollectionServiceBaseUrl())
            .addConverterFactory(JaxbConverterFactory.create())
            .build()
            .create(CollectionApi::class.java)
    }

    private fun getCollectionServiceBaseUrl(): String {
        return System.getenv(COLLECTION_SERVICE_URL_ENV) ?: "http://asd.cp"
//            ?: throw RuntimeException("Env is not specified: $COLLECTION_SERVICE_URL_ENV")
    }

    private fun getTruststoreFile(): File {
        return File(System.getenv(TRUSTSTORE_ENV) ?: throw RuntimeException("Env is not specified: $TRUSTSTORE_ENV"))
    }

    private fun getTruststorePass(): CharArray {
        return (System.getenv(TRUSTSTORE_PASS_ENV)
            ?: throw RuntimeException("Env is not specified: $TRUSTSTORE_PASS_ENV")).toCharArray()
    }
}