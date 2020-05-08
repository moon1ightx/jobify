package kz.iitu.jobifymobile.views
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.android.synthetic.main.activity_main.*
import kz.iitu.jobifymobile.R


class MainActivity : AppCompatActivity(), BottomNavigationView.OnNavigationItemSelectedListener {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initUI()
    }

    private fun initUI(){
        bottom_navigation.setOnNavigationItemSelectedListener(this)
        bottom_navigation.selectedItemId = R.id.explore
    }

    val dashboard= Dashboard()
    val explore = Explore()
    val profile = Profile()
    
    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.dashboard -> {
                supportFragmentManager.beginTransaction().replace(R.id.txt, dashboard).commit()
                true
            }
            R.id.explore -> {
                supportFragmentManager.beginTransaction().replace(R.id.txt, explore).commit()
                true
            }
            R.id.profile -> {
                supportFragmentManager.beginTransaction().replace(R.id.txt, profile).commit()
                true
            }
            else -> false
        }
    }

}
