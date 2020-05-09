package kz.iitu.jobifymobile.viewmodels

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kz.iitu.jobifymobile.data.models.Company
import kz.iitu.jobifymobile.data.models.LoginResponse
import kz.iitu.jobifymobile.data.models.UserInfoResponse

import kz.iitu.jobifymobile.data.repository.LoginRepository
import java.net.ConnectException
import kotlin.coroutines.CoroutineContext

class LoginViewModel(
    private val loginRepository: LoginRepository
): ViewModel(), CoroutineScope{

    private val job = Job()
    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job

    private val accessToken = MutableLiveData<LoginResponse>()
    val accessLiveData: LiveData<LoginResponse> = accessToken


    fun login(username:String, pass:String) {
        launch {
            try {
                val response = loginRepository.login(username, pass)
                if (response!=null){
                    accessToken.value = response
                }
            }catch (e: ConnectException){
                Log.d("ntwrk", "No Internet Connection")
            }
        }
    }

    private val userInfo = MutableLiveData<UserInfoResponse>()
    val userLiveData: LiveData<UserInfoResponse> = userInfo


    fun getUserInfo( bearer:String) {
        launch {
            try {
                val response = loginRepository.getUserInfo(bearer)
                if (response!=null){
                    userInfo.value = response[0]
                }
            }catch (e: ConnectException){
                Log.d("ntwrk", "No Internet Connection")
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        job.cancel()
    }
}

class LoginFactory(
    private val loginRepository: LoginRepository
) : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return LoginViewModel(loginRepository) as T
    }
}