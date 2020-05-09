package kz.iitu.jobifymobile.data.db.models

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "vacancies")
data class VacancyBody(
    @PrimaryKey
    @ColumnInfo(name="id")
    val id : Int,
    @ColumnInfo(name="title")
    val title: String,
    @ColumnInfo(name="description")
    val description: String,
    @ColumnInfo(name="company")
    val company: String,
    @ColumnInfo(name="experience")
    val experience: Int,
    @ColumnInfo(name="salary")
    val salary: Int,
    @ColumnInfo(name="perks")
    val perks: String,
    @ColumnInfo(name="job_area")
    val job_area: String,
    @ColumnInfo(name="techno")
    val techno:String
)