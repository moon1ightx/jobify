package kz.iitu.jobifymobile.views.adapters


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.company_cell.view.picture_view
import kotlinx.android.synthetic.main.hackathon_cell.view.*
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.models.Hackathon


class HachathonAdapter(
    private val hackathons: List<Hackathon>
): RecyclerView.Adapter<HachathonAdapter.ViewHolder>(){

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(hackathons[position])
    override fun getItemCount(): Int = hackathons.size
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder =
        ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.hackathon_cell, parent, false)
        )

    inner class ViewHolder(
        private val view: View
    ): RecyclerView.ViewHolder(view){
        fun bind(hackathon: Hackathon){
            view.title.text = hackathon.title
            view.des.text = hackathon.description
            view.time.text = hackathon.time.date.toString()+"."+hackathon.time.month.toString()+"."+hackathon.time.year.toString()
            view.place.text = hackathon.place
            view.source.text = hackathon.source
            var req = ""
            hackathon.job_area.forEach{
                req = req + it.title+" "
            }
            Picasso.get().load("http://10.0.2.2:8000"+hackathon.thumbnailPath).into(view.picture_view)

        }
    }

}