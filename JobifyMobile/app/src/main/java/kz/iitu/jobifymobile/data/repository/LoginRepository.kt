package kz.iitu.jobifymobile.data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kz.iitu.jobifymobile.data.models.*
import kz.iitu.jobifymobile.data.networking.ApiClient


class LoginRepository(
    private val apiClient: ApiClient
){

    suspend fun login(username: String, pass:String):LoginResponse?{
        return withContext(Dispatchers.IO){
            apiClient.login(username, pass)
        }
    }
    suspend fun getUserInfo(bearer: String):List<UserInfoResponse>?{
        return withContext(Dispatchers.IO){
            apiClient.getUserInfo(bearer)
        }
    }
}