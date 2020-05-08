package kz.iitu.jobifymobile.data.networking

import kz.iitu.jobifymobile.data.models.Vacancy
import retrofit2.http.GET

interface ApiClient {

    @GET("vacancies")
    suspend fun getVacancies(): List<Vacancy>
}