package kz.iitu.jobifymobile.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kz.iitu.jobifymobile.data.models.Vacancy
import kz.iitu.jobifymobile.data.networking.ApiClient
import okhttp3.Dispatcher

class VacancyRepository(
    private val apiClient: ApiClient
){
    suspend fun loadVacancies(): List<Vacancy>?{
        return withContext(Dispatchers.IO){
            apiClient.getVacancies()
        }
    }
}