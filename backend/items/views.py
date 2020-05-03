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
