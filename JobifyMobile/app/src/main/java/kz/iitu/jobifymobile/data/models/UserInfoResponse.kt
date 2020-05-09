package kz.iitu.jobifymobile.data.models

import java.util.*

data class UserInfoResponse(
    val user: User,
    val about: String,
    val techno: List<Techno>,
    val phone: String,
    val bitrthday: Date,
    val city: String,
    val github_link: String,
    val univer: Univer,
    val job_area: JobArea
    )
data class User(
    val id: Int,
    val username:String,
    val email: String,
    val first_name: String,
    val last_name: String
)
data class Univer(
    val title: String
)