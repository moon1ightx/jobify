package kz.iitu.jobifymobile.views.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.internship_cell.view.*

import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.models.Internship

class InternshipAdapter (
    private val internships: List<Internship>
): RecyclerView.Adapter<InternshipAdapter.ViewHolder>(){

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(internships[position])
    override fun getItemCount(): Int = internships.size
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder =
        ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.internship_cell, parent, false)
        )

    inner class ViewHolder(
        private val view: View
    ): RecyclerView.ViewHolder(view){
        fun bind(internship: Internship){
            view.vacancyTitle.text = internship.title
            view.vacancyDes.text = internship.description
            view.vacancyCompany.text = "Компания: "+internship.company.name
            view.salary.text = internship.salary.toString()+" KZT"
            view.duration.text = internship.duration.toString()+" мес"
            view.job_area.text = internship.job_area.title
            var req = "Нужно знать: "
            internship.techno.forEach{
                req=req+it.title+" "
            }
            view.techno.text = req
        }
    }

}