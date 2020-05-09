package kz.iitu.jobifymobile.data.networking

import kz.iitu.jobifymobile.data.models.*
import retrofit2.http.*

interface ApiClient {

    @GET("vacancies")
    suspend fun getVacancies(): List<Vacancy>

    @GET("internships")
    suspend fun getInterships(): List<Internship>

    @GET("companies")
    suspend fun getCompanies(): List<Company>

    @GET("hackathons")
    suspend fun getHachathons(): List<Hackathon>

    @GET("stories")
    suspend fun getStories(): List<Story>

    @GET("stacks")
    suspend fun getStacks(): List<Stack>

    @POST("login")
    @FormUrlEncoded
    suspend fun login(
        @Field("username") username: String,
        @Field("password") password: String
    ): LoginResponse

    @GET("user_info")
    suspend fun getUserInfo(
        @Header("Authorization") bearer: String
    ):List<UserInfoResponse>

}