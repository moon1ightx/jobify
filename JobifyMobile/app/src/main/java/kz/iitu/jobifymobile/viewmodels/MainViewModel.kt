package kz.iitu.jobifymobile.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kz.iitu.jobifymobile.data.models.*
import kz.iitu.jobifymobile.data.repository.VacancyRepository
import kotlin.coroutines.CoroutineContext

class MainViewModel(
    private val vacancyRepository: VacancyRepository
): ViewModel(), CoroutineScope{

    private val job = Job()
    override val coroutineContext: CoroutineContext
    get() = Dispatchers.Main + job

    private val vacancyMutableLiveData = MutableLiveData<List<Vacancy>>()
    val vacancyLiveData: LiveData<List<Vacancy>> = vacancyMutableLiveData

    fun loadVacancies(){
        launch {
            val response =vacancyRepository.loadVacancies()
            if (response!=null){
                vacancyMutableLiveData.value = response
            }
        }
    }

    private val internshipMutableLiveData = MutableLiveData<List<Internship>>()
    val internshipLiveData: LiveData<List<Internship>> = internshipMutableLiveData

    fun loadInterships(){
        launch {
            val response =vacancyRepository.loadInternships()
            if (response!=null){
                internshipMutableLiveData.value = response
            }
        }
    }

    private val companyMutableLiveData = MutableLiveData<List<Company>>()
    val companyLiveData: LiveData<List<Company>> = companyMutableLiveData

    fun loadCompanies(){
        launch {
            val response =vacancyRepository.loadCompanies()
            if (response!=null){
                companyMutableLiveData.value = response
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        job.cancel()
    }
}

class MainFactory(
    private val vacancyRepository: VacancyRepository
) : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return MainViewModel(vacancyRepository) as T
    }
}