package kz.iitu.jobifymobile.data.models

import java.util.*

data class Hackathon(
    val id : Int,
    val title: String,
    val description: String,
    val created_on: Date,
    val thumbnailPath: String,
    val place: String,
    val source: String,
    val time: Date,
    val job_area: List<JobArea>
)
data class Story(
    val id : Int,
    val title: String,
    val description: String,
    val created_on: Date,
    val thumbnailPath: String,
    val source: String
)
data class Stack(
    val id : Int,
    val title: String,
    val description: String,
    val created_on: Date,
    val thumbnailPath: String,
    val job_area: JobArea,
    val techno: List<Techno>,
    val popularity: Int
)