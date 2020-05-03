from django.urls import path
from . import views
urlpatterns = [
    path('technology', views.TechViews.as_view()),
    path('companies', views.CompanyViews.as_view()),
    path('internships', views.IntershipViews.as_view()),
    path('vacancies', views.VacancyViews.as_view()),
    path('stories', views.StoryViews.as_view()),
    path('hackathons', views.HachathonViews.as_view()),
    path('universities', views.UniverViews.as_view()),
    path('stacks', views.StackViews.as_view()),
    path('degrees', views.DegreeViews.as_view()),
    path('plans', views.PlanViews.as_view()),
    path('job_areas', views.JobAreaViews.as_view()),
    path('user_info', views.HunterViews.as_view()),
    path('tests/<int:pk>', views.TestViews.as_view()),
    path('roadmap', views.RoadmapViews.as_view()),
    path('cv', views.CvViews.as_view()),
]