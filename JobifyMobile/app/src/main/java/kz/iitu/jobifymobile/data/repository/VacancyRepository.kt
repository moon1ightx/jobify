package kz.iitu.jobifymobile.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kz.iitu.jobifymobile.data.models.*
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

    suspend fun loadStacks(): List<Stack>?{
        return withContext(Dispatchers.IO){
            apiClient.getStacks()
        }
    }

    suspend fun loadHackathons(): List<Hackathon>?{
        return withContext(Dispatchers.IO){
            apiClient.getHachathons()
        }
    }
    suspend fun loadStories(): List<Story>?{
        return withContext(Dispatchers.IO){
            apiClient.getStories()
        }
    }
}