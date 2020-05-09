package kz.iitu.jobifymobile.data.models

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.*


data class Vacancy(
    val id : Int,
    val title: String,
    val description: String,
    val company: Company,
    val experience: Int,
    val salary: Int,
    val perks: String,
    val job_area: JobArea,
    val techno: List<Techno>
)

@Entity(tableName = "companies")
data class Company(
    @PrimaryKey
    @ColumnInfo(name="id")
    val id: Int,
    @ColumnInfo(name="name")
    val name: String,
    @ColumnInfo(name="address")
    val address: String,
    @ColumnInfo(name="city")
    val city: String,
    @ColumnInfo(name="description")
    val description: String,
    @ColumnInfo(name="thumbnailPath")
    val thumbnailPath: String,
    @ColumnInfo(name="linkedin_link")
    val linkedin_link: String,
    @ColumnInfo(name="instagram_link")
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