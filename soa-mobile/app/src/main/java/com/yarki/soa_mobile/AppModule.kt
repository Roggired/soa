package com.yarki.soa_mobile

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.http.GET
import javax.inject.Singleton

interface TestApi {
    @GET("/collection/api/hello")
    suspend fun get(): String
}

@Module
@InstallIn(SingletonComponent::class)
internal object ApiModule {

    @Provides
    @Singleton
    fun provideChatApi(builder: Retrofit.Builder): TestApi {
        return builder.build().create(TestApi::class.java)
    }

    @Provides
    fun provideOkHttpClient(
    ): OkHttpClient {
        val builder =
            OkHttpClient.Builder()

        return builder.build()
    }

    @Provides
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit.Builder {
        return Retrofit.Builder()
            .baseUrl("http://localhost:65100")
            .client(okHttpClient)
    }
}