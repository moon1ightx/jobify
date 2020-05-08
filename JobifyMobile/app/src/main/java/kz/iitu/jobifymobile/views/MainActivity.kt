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
        mainViewModel.vacancyLiveData.observe(this, Observer {
            Log.d("vacancies", it.toString() )
        })

        mainViewModel.internshipLiveData.observe(this, Observer {
            Log.d("internships", it.toString() )
        })

        mainViewModel.companyLiveData.observe(this, Observer {
            Log.d("companies", it.toString() )
        })

        mainViewModel.stackLiveData.observe(this, Observer {
            Log.d("stacks", it.toString() )
        })

        mainViewModel.hackathonLiveData.observe(this, Observer {
            Log.d("hackathons", it.toString() )
        })

        mainViewModel.storyLiveData.observe(this, Observer {
            Log.d("stories", it.toString() )
        })
    }

    private fun initUI(){
        mainViewModel.loadVacancies()
        mainViewModel.loadCompanies()
        mainViewModel.loadHackathons()
        mainViewModel.loadStories()
        mainViewModel.loadInterships()
        mainViewModel.loadStacks()
    }

    private fun setupVacancies(vacancies: List<Vacancy>){
        Log.d("vacancies",vacancies.toString() )
    }

}
