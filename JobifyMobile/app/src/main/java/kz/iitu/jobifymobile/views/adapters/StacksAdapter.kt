package kz.iitu.jobifymobile.views.adapters


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.stack_cell.view.*
import kz.iitu.jobifymobile.R
import kz.iitu.jobifymobile.data.models.Stack

class StacksAdapter (
    private val stacks: List<Stack>
): RecyclerView.Adapter<StacksAdapter.ViewHolder>(){

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(stacks[position])
    override fun getItemCount(): Int = stacks.size
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder =
        ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.stack_cell, parent, false)
        )

    inner class ViewHolder(
        private val view: View
    ): RecyclerView.ViewHolder(view){
        fun bind(stack: Stack){
            view.vacancyTitle.text = stack.title
            view.vacancyDes.text = stack.description
            view.popularity.text = "Популярность: "+stack.popularity.toString()+"/10"
            view.job_area.text = stack.job_area.title
            var req = ""
            stack.techno.forEach{
                req=req+it.title+" "
            }
            view.techno.text = req
        }
    }

}