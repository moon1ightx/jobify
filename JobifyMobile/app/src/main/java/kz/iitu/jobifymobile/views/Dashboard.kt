package kz.iitu.jobifymobile.views


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.networking.ApiFactory
import kz.iitu.jobifymobile.data.repository.VacancyRepository
import kz.iitu.jobifymobile.viewmodels.MainFactory
import kz.iitu.jobifymobile.viewmodels.MainViewModel

/**
 * A simple [Fragment] subclass.
 */
class Dashboard : Fragment() {

    private val mainViewModel by lazy{
        ViewModelProviders.of(this, MainFactory(
            VacancyRepository(
                ApiFactory.getApi()
            )
        )
        )[MainViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view: View = inflater.inflate(R.layout.fragment_dashboard, container, false)
        initUI()
        initObservers()
        return  view
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

    }
    private fun initUI(){
        mainViewModel.loadVacancies()
        mainViewModel.loadCompanies()
        mainViewModel.loadHackathons()
    }


}
