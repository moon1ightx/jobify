package kz.iitu.jobifymobile.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kz.iitu.jobifymobile.data.models.*
import kz.iitu.jobifymobile.data.networking.ApiClient


class ExploreRepository(
    private val apiClient: ApiClient
){

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