from django.urls import path
from . import views
urlpatterns = [
    path('technology', views.TechViews.as_view()),
]