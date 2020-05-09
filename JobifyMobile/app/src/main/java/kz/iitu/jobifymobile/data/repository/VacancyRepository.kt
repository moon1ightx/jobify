package kz.iitu.jobifymobile.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kz.iitu.jobifymobile.data.db.MainDao
import kz.iitu.jobifymobile.data.db.models.VacancyBody
import kz.iitu.jobifymobile.data.models.*
import kz.iitu.jobifymobile.data.networking.ApiClient

class VacancyRepository(
    private val apiClient: ApiClient,
    private val dbClient: MainDao
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

    suspend fun loadVacanciesDB(): List<VacancyBody>?{
        return withContext(Dispatchers.IO){
            dbClient.getVacancies()
        }
    }

    suspend fun addVacacytoDB(vacancy:VacancyBody){
        return withContext(Dispatchers.Default){
            dbClient.insertVacancy(vacancy = vacancy)
        }
    }
    suspend fun clearVacancyDB(){
        return withContext(Dispatchers.Default){
            dbClient.deleteVacancies()
        }
    }
    suspend fun loadCompanyDB(): List<Company>?{
        return withContext(Dispatchers.IO){
            dbClient.getCompanies()
        }
    }

    suspend fun addCompanytoDB(company: Company){
        return withContext(Dispatchers.Default){
            dbClient.insertCompany( company)
        }
    }
    suspend fun clearCompanyDB(){
        return withContext(Dispatchers.Default){
            dbClient.deleteCompanies()
        }
    }
}