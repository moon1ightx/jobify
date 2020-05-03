from django.urls import path
from . import views
urlpatterns = [
    path('technology', views.TechViews.as_view()),
    path('companies', views.CompanyViews.as_view()),
    path('internships', views.IntershipViews.as_view()),
    path('vacancies', views.VacancyViews.as_view()),
    path('stories', views.StoryViews.as_view()),
    path('hackathons', views.HachathonViews.as_view()),
]