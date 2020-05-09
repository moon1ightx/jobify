package kz.iitu.jobifymobile.viewmodels

import android.accounts.NetworkErrorException
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
import kz.iitu.jobifymobile.data.repository.ExploreRepository
import java.net.ConnectException
import kotlin.coroutines.CoroutineContext

class ExploreViewModel(
    private val exploreRepository: ExploreRepository
): ViewModel(), CoroutineScope{

    private val job = Job()
    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job


    private val storyMutableLiveData = MutableLiveData<List<Story>>()
    val storyLiveData: LiveData<List<Story>> = storyMutableLiveData

    fun loadStories(){
        launch {
            try {
                val response =exploreRepository.loadStories()
                if (response!=null){
                    storyMutableLiveData.value = response
                }
            }catch (e: ConnectException){
                Log.d("ntwrk", "No Interner Connection")
            }
        }
    }

    private val hackathonMutableLiveData = MutableLiveData<List<Hackathon>>()
    val hackathonLiveData: LiveData<List<Hackathon>> = hackathonMutableLiveData

    fun loadHackathons(){
        launch {
            try {
                val response =exploreRepository.loadHackathons()
                if (response!=null){
                    hackathonMutableLiveData.value = response
                }
            }catch (e: ConnectException){
            Log.d("ntwrk", "No Interner Connection")
        }

        }
    }

    private val stackMutableLiveData = MutableLiveData<List<Stack>>()
    val stackLiveData: LiveData<List<Stack>> = stackMutableLiveData

    fun loadStacks(){
        launch {
            try{
                val response =exploreRepository.loadStacks()
                if (response!=null){
                    stackMutableLiveData.value = response
                }
            }catch (e: ConnectException){
                Log.d("ntwrk", "No Interner Connection")
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        job.cancel()
    }
}

class ExploreFactory(
    private val exploreRepository: ExploreRepository
) : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return ExploreViewModel(exploreRepository) as T
    }
}