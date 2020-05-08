package kz.iitu.jobifymobile.views.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.vacancy_cell.view.*
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.models.Vacancy

class VacancyAdapter (
    private val vacancies: List<Vacancy>
): RecyclerView.Adapter<VacancyAdapter.ViewHolder>(){

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(vacancies[position])
    override fun getItemCount(): Int = vacancies.size
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder =
        ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.vacancy_cell, parent, false)
        )

    inner class ViewHolder(
        private val view: View
    ): RecyclerView.ViewHolder(view){
        fun bind(vacancy: Vacancy){
            view.vacancyTitle.text = vacancy.title
            view.vacancyDes.text = vacancy.description
            view.vacancyCompany.text = "Компания: "+vacancy.company.name
            view.salary.text = vacancy.salary.toString()+" KZT"
            view.perks.text = vacancy.perks
            view.job_area.text = vacancy.job_area.title
            var req = "Нужно знать: "
            vacancy.techno.forEach{
                req=req+it.title+" "
            }
            view.techno.text = req
        }
    }

}