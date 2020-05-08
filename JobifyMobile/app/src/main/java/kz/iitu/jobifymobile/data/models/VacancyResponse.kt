package kz.iitu.jobifymobile.data.models

import java.util.*


data class Vacancy(
    val id : Int,
    val title: String,
    val description: String,
    val created_on: Date,
    val company: Company,
    val experience: Int,
    val salary: Int,
    val perks: String,
    val job_area: JobArea,
    val techno: List<Techno>

)
data class Company(
    val id: Int,
    val name: String,
    val address: String,
    val city: String,
    val description: String,
    val thumbnailPath: String,
    val linkedin_link: String,
    val instagram_link: String
)

data class JobArea(
    val id: Int,
    val title : String,
    val description: String,
    val created_on: Date
)

data class Techno(
    val id: Int,
    val title: String,
    val description: String,
    val created_on: Date
)