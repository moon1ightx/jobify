from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Hunter, JobArea, Company, Vacancy, Internship, Stack, Roadmap, PlanItem, Story, Hackathon, Techno , University, Degree
from .serializers import JobAreaSerializer, CompanySerializer, VacancySerializer, IntershipSerializer
from .serializers import StackSerializer, RoadmapSerializer, PlanSerializer, StorySerializer
from .serializers import HackatonSerializer, TechSerializer, UniSerializer, DegreeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAdminUser, AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly

class TechViews(APIView):
    serializer_class = TechSerializer
    def get(self, request, format=None):
        techs = Techno.objects.all()
        serializer = self.serializer_class(techs, many=True)
        return Response(serializer.data)

class CompanyViews(APIView):
    serializer_class = CompanySerializer
    def get(self, request, format=None):
        companies = Company.objects.all()
        title_contains_query = request.GET.get('name')
        if title_contains_query!='' and title_contains_query is not None:
            companies=companies.filter(name__icontains=title_contains_query)
        serializer = self.serializer_class(companies, many=True)
        return Response(serializer.data)

class VacancyViews(APIView):
    serializer_class = VacancySerializer
    def get(self, request, format=None):
        vacancies = Vacancy.objects.all().prefetch_related('techno')
        title_contains_query = request.GET.get('title')
        if title_contains_query!='' and title_contains_query is not None:
            vacancies=vacancies.filter(title__icontains=title_contains_query).prefetch_related('techno')
        serializer = self.serializer_class(vacancies, many=True)
        return Response(serializer.data)

class IntershipViews(APIView):
    serializer_class = IntershipSerializer
    def get(self, request, format=None):
        internships = Internship.objects.all().prefetch_related('techno')
        title_contains_query = request.GET.get('title')
        if title_contains_query!='' and title_contains_query is not None:
            internships=internships.filter(title__icontains=title_contains_query).prefetch_related('techno')
        serializer = self.serializer_class(internships, many=True)
        return Response(serializer.data)

