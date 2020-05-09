package kz.iitu.jobifymobile.views


import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders

import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.UserSession
import kz.iitu.jobifymobile.data.models.UserInfoResponse
import kz.iitu.jobifymobile.data.networking.ApiFactory
import kz.iitu.jobifymobile.data.repository.LoginRepository
import kz.iitu.jobifymobile.viewmodels.LoginFactory
import kz.iitu.jobifymobile.viewmodels.LoginViewModel

/**
 * A simple [Fragment] subclass.
 */
class Profile : Fragment() {
    private val loginViewModel by lazy {
        ViewModelProviders.of(
            this, LoginFactory(
                LoginRepository(
                    ApiFactory.getApi()
                )
            )
        )[LoginViewModel::class.java]
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if(UserSession.isNotLoggedIn(this.context!!))
            startActivity(Intent(this.context!!,LoginActivity::class.java))

        initUI()
        initObservers()

    }
    private fun initObservers() {
        loginViewModel.userLiveData.observe(this, Observer {
           setupData(it)
        })
    }

    private fun initUI() {
        val bearer: String = "Bearer "+UserSession.getUserToken(this.context!!)
        loginViewModel.getUserInfo(bearer)
    }

    private fun setupData(user: UserInfoResponse) {

    }

}
