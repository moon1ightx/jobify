package kz.iitu.jobifymobile.views

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.models.Vacancy
import kz.iitu.jobifymobile.data.networking.ApiFactory
import kz.iitu.jobifymobile.data.repository.VacancyRepository
import kz.iitu.jobifymobile.viewmodels.MainFactory
import kz.iitu.jobifymobile.viewmodels.MainViewModel

class MainActivity : AppCompatActivity() {
    private val mainViewModel by lazy{
        ViewModelProviders.of(this, MainFactory(
            VacancyRepository(
                ApiFactory.getApi()
            )
        ))[MainViewModel::class.java]
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initUI()
        initObservers()
    }
    private fun initObservers(){
        mainViewModel.vacancyLiveData.observe(this, Observer { setupData(it) })
    }
    private fun initUI(){
        mainViewModel.loadVacancies()
    }
    private fun setupData(vacancies: List<Vacancy>){
        Log.d("vacancies",vacancies.toString() )
    }
}
