package kz.iitu.jobifymobile.data.models

import java.util.*

data class Internship(
    val id : Int,
    val title: String,
    val description: String,
    val created_on: Date,
    val company: Company,
    val duration: Int,
    val salary: Int,
    val start_date: Date,
    val job_area: JobArea,
    val techno: List<Techno>
)