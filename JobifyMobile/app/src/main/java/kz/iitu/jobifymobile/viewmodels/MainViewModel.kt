package kz.iitu.jobifymobile.viewmodels

import android.accounts.NetworkErrorException
import android.app.admin.NetworkEvent
import android.app.usage.NetworkStatsManager
import android.net.Network
import android.net.wifi.p2p.WifiP2pManager
import android.util.Log
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
import java.net.ConnectException
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
            try{
                val response =vacancyRepository.loadVacancies()
                if (response!=null){
                    vacancyMutableLiveData.value = response
                }
            }catch (e: ConnectException){
                Log.d("ntwrk", "No Interner Connection")
            }
        }
    }

    private val internshipMutableLiveData = MutableLiveData<List<Internship>>()
    val internshipLiveData: LiveData<List<Internship>> = internshipMutableLiveData

    fun loadInterships(){
        launch {
            try{
                val response =vacancyRepository.loadInternships()
                if (response!=null){
                    internshipMutableLiveData.value = response
                }
            }catch (e: ConnectException){
                Log.d("ntwrk", "No Interner Connection")
            }
        }
    }

    private val companyMutableLiveData = MutableLiveData<List<Company>>()
    val companyLiveData: LiveData<List<Company>> = companyMutableLiveData

    fun loadCompanies(){
        launch {
            try {

            val response =vacancyRepository.loadCompanies()
                if (response != null) {
                    companyMutableLiveData.value = response
                    vacancyRepository.clearCompanyDB()
                    response.forEach {
                        vacancyRepository.addCompanytoDB(it)
                    }
                }
            }catch (e: ConnectException)
            {
                val comp = vacancyRepository.loadCompanyDB()
                companyMutableLiveData.value = comp
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