package ru.yofik.services.demography.infrastracture.config

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import retrofit2.Retrofit
import retrofit2.converter.jaxb.JaxbConverterFactory
import ru.yofik.services.demography.infrastracture.integration.CollectionApi
import java.io.File
import java.security.KeyStore
import javax.net.ssl.*


@Configuration
class RetrofitConfig(
    @Value("\${retrofit.collection.url}")
    private val collectionUrl: String,
    @Value("\${retrofit.truststore.name}")
    private val trustStore: String,
    @Value("\${retrofit.truststore.password}")
    private val trustStorePassword: String,
) {

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
            .baseUrl(collectionUrl)
            .addConverterFactory(JaxbConverterFactory.create())
            .build()
            .create(CollectionApi::class.java)
    }
}