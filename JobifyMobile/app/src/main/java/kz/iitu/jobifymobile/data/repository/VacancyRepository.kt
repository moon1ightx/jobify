package kz.iitu.jobifymobile.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kz.iitu.jobifymobile.data.models.*
import kz.iitu.jobifymobile.data.networking.ApiClient

class VacancyRepository(
    private val apiClient: ApiClient
){
    suspend fun loadVacancies(): List<Vacancy>?{
        return withContext(Dispatchers.IO){
            apiClient.getVacancies()
        }
    }

    suspend fun loadInternships(): List<Internship>?{
        return withContext(Dispatchers.IO){
            apiClient.getInterships()
        }
    }

    suspend fun loadCompanies(): List<Company>?{
        return withContext(Dispatchers.IO){
            apiClient.getCompanies()
        }
    }

}