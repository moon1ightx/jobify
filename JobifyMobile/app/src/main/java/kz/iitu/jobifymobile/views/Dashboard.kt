package kz.iitu.jobifymobile.views


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.fragment_dashboard.*
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.networking.ApiFactory
import kz.iitu.jobifymobile.data.repository.VacancyRepository
import kz.iitu.jobifymobile.viewmodels.MainFactory
import kz.iitu.jobifymobile.viewmodels.MainViewModel
import kz.iitu.jobifymobile.views.adapters.CompanyAdapter
import kz.iitu.jobifymobile.views.adapters.InternshipAdapter
import kz.iitu.jobifymobile.views.adapters.VacancyAdapter

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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        vacancyRecyclerView.layoutManager = LinearLayoutManager(this.context)
        intershipRecyclerView.layoutManager = LinearLayoutManager(this.context)
        companyRecyclerView.layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.HORIZONTAL, false)
    }

    private fun initObservers(){
        mainViewModel.vacancyLiveData.observe(this, Observer {
            vacancyRecyclerView.adapter = VacancyAdapter(it)
        })

        mainViewModel.internshipLiveData.observe(this, Observer {
            intershipRecyclerView.adapter = InternshipAdapter(it)
        })

        mainViewModel.companyLiveData.observe(this, Observer {
            companyRecyclerView.adapter = CompanyAdapter(it)
        })

    }
    private fun initUI(){
        mainViewModel.loadVacancies()
        mainViewModel.loadCompanies()
        mainViewModel.loadInterships()
    }


}
