package kz.iitu.jobifymobile.data.db

import androidx.room.TypeConverter
import kz.iitu.jobifymobile.data.models.Company
import java.util.*

class Converters {
    @TypeConverter
    fun fromTimestamp(value: Long?): Date? {
        return value?.let { Date(it) }
    }

    @TypeConverter
    fun dateToTimestamp(date: Date?): Long? {
        return date?.time?.toLong()
    }

    @TypeConverter
    fun companyToStringp(company: Company?): String? {
        return company.toString()
    }
}