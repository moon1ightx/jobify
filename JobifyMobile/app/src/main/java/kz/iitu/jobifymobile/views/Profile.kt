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
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.fragment_profile.*

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

        if(UserSession.isNotLoggedIn(this.context!!)) {
            startActivity(Intent(this.context!!, LoginActivity::class.java))
            activity!!.finish()
        }else {
            initUI()
            initObservers()
        }
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

    private fun setupData(userInf: UserInfoResponse) {
        nameTxt.text = userInf.user.first_name+" "+userInf.user.last_name
        birthday.text = userInf.birthday.toString()
        github.text = "Github: "+userInf.github_link
        phone.text = userInf.phone
        email.text = userInf.user.email
        Picasso.get().load("http://10.0.2.2:8000"+userInf.thumbnailPath).into(picture_view)
        var req = ""
        userInf.techno.forEach{
            req = req + it.title+" "
        }
        techo.text = req
        about.text = userInf.about
        univer.text = userInf.univer.title
    }

}
