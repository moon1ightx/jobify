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
import kotlinx.android.synthetic.main.fragment_explore.*

import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.networking.ApiFactory
import kz.iitu.jobifymobile.data.repository.ExploreRepository
import kz.iitu.jobifymobile.data.repository.VacancyRepository
import kz.iitu.jobifymobile.viewmodels.ExploreFactory
import kz.iitu.jobifymobile.viewmodels.ExploreViewModel
import kz.iitu.jobifymobile.viewmodels.MainFactory
import kz.iitu.jobifymobile.viewmodels.MainViewModel
import kz.iitu.jobifymobile.views.adapters.StacksAdapter

/**
 * A simple [Fragment] subclass.
 */
class Explore : Fragment() {

    private val exploreViewModel by lazy{
        ViewModelProviders.of(this, ExploreFactory(
            ExploreRepository(
                ApiFactory.getApi()
            )
        )
        )[ExploreViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view: View = inflater.inflate(R.layout.fragment_explore, container, false)
        initUI()
        initObservers()
        return  view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        stackRecyclerView.layoutManager = LinearLayoutManager(this.context)
        hackthonRecyclerView.layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.HORIZONTAL, false)
        storyRecyclerView.layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.HORIZONTAL, false)
    }
    private fun initObservers(){
        exploreViewModel.hackathonLiveData.observe(this, Observer {
            Log.d("vacancies", it.toString() )
        })

        exploreViewModel.stackLiveData.observe(this, Observer {
           stackRecyclerView.adapter = StacksAdapter(it)
        })

        exploreViewModel.storyLiveData.observe(this, Observer {

        })

    }
    private fun initUI(){
        exploreViewModel.loadHackathons()
        exploreViewModel.loadStacks()
        exploreViewModel.loadStories()
    }
}
