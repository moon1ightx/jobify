package kz.iitu.jobifymobile.data.db

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import kz.iitu.jobifymobile.data.db.models.VacancyBody
import kz.iitu.jobifymobile.data.models.Company

@Dao
interface MainDao {

    @Insert
    fun insertVacancy(vacancy: VacancyBody)

    @Query("SELECT * FROM vacancies")
    fun getVacancies(): List<VacancyBody>?

    @Query("DELETE FROM vacancies")
    fun deleteVacancies()

    @Insert
    fun insertCompany(company: Company)

    @Query("SELECT * FROM companies")
    fun getCompanies(): List<Company>?

    @Query("DELETE FROM companies")
    fun deleteCompanies()

}