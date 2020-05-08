package kz.iitu.jobifymobile.data.networking

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiFactory{
    private const val BASE_URL = "http://10.0.2.2:8000/api/"

    val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    fun getApi() = retrofit.create(ApiClient::class.java)
}