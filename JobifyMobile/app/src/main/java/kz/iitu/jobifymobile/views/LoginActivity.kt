package kz.iitu.jobifymobile.views

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import kotlinx.android.synthetic.main.activity_login.*
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.UserSession
import kz.iitu.jobifymobile.data.networking.ApiFactory
import kz.iitu.jobifymobile.data.repository.LoginRepository
import kz.iitu.jobifymobile.viewmodels.LoginFactory
import kz.iitu.jobifymobile.viewmodels.LoginViewModel

class LoginActivity : AppCompatActivity() {

    private val loginViewModel by lazy {
        ViewModelProviders.of(
            this, LoginFactory(
                LoginRepository(
                    ApiFactory.getApi()
                )
            )
        )[LoginViewModel::class.java]
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        initUI()
        initObservers()
    }

    private fun initObservers() {
        loginViewModel.accessLiveData.observe(this, Observer {
            UserSession.saveUserDetails(this, it.access, it.refresh)
        })
    }

    private fun initUI() {
        loginBtn.setOnClickListener {
            if (userNameText.text.toString().isNullOrBlank() || passwordText.text.toString().isNullOrBlank()) {
                Toast.makeText(this, getString(R.string.warning), Toast.LENGTH_LONG)
                return@setOnClickListener
            }
            loginViewModel.login(userNameText.text.toString(), passwordText.text.toString())
            startActivity(Intent(this, MainActivity::class.java))
        }
    }
}
