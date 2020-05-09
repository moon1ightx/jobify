package kz.iitu.jobifymobile.data.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import kz.iitu.jobifymobile.data.db.models.VacancyBody
import kz.iitu.jobifymobile.data.models.Company

@Database(entities = [VacancyBody::class, Company::class], version = 1)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase(){

    abstract fun getMainDao() : MainDao

    companion object{
        private const val DB_NAME = "jobify.db"
        private var instance: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase? {
            if(instance == null){
                instance = Room.databaseBuilder(context,
                    AppDatabase::class.java, DB_NAME).build()
            }
            return instance
        }
    }

}