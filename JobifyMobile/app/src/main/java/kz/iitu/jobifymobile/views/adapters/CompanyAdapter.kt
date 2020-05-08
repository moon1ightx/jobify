package kz.iitu.jobifymobile.views.adapters


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.company_cell.view.*
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.models.Company


class CompanyAdapter (
    private val companies: List<Company>
): RecyclerView.Adapter<CompanyAdapter.ViewHolder>(){

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(companies[position])
    override fun getItemCount(): Int = companies.size
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder =
        ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.company_cell, parent, false)
        )

    inner class ViewHolder(
        private val view: View
    ): RecyclerView.ViewHolder(view){
        fun bind(company: Company){
            view.companyName.text = company.name
            Picasso.get().load("http://10.0.2.2:8000"+company.thumbnailPath).into(view.picture_view)

        }
    }

}