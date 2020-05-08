package kz.iitu.jobifymobile.views.adapters

import kz.iitu.jobifymobile.data.models.Story
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.company_cell.view.picture_view
import kotlinx.android.synthetic.main.story_cell.view.*
import kz.iitu.jobifymobile.R


class StoryAdapter(
    private val stories: List<Story>
): RecyclerView.Adapter<StoryAdapter.ViewHolder>(){

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(stories[position])
    override fun getItemCount(): Int = stories.size
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder =
        ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.story_cell, parent, false)
        )

    inner class ViewHolder(
        private val view: View
    ): RecyclerView.ViewHolder(view){
        fun bind(story: Story){
            view.title.text = story.title
            view.des.text = story.description
            view.source.text = story.source
            Picasso.get().load("http://10.0.2.2:8000"+story.thumbnailPath).into(view.picture_view)

        }
    }

}