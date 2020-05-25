from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Hunter, JobArea, Company, Vacancy, Internship, Stack, Roadmap, PlanItem, Story, Hackathon, Techno , University, Degree, Test, Quiz
from .serializers import JobAreaSerializer, CompanySerializer, VacancySerializer, IntershipSerializer
from .serializers import StackSerializer, RoadmapSerializer, PlanSerializer, StorySerializer
from .serializers import HackatonSerializer, TechSerializer, UniSerializer, DegreeSerializer, HunterSerializer, TestSerializer, QuizSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import IsAdminUser, AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly
from django.core.mail import EmailMessage
import pdfkit
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

class StoryViews(APIView):
    serializer_class = StorySerializer
    def get(self, request, format=None):
        stories = Story.objects.all()
        title_contains_query = request.GET.get('title')
        if title_contains_query!='' and title_contains_query is not None:
            stories=stories.filter(title__icontains=title_contains_query)
        serializer = self.serializer_class(stories, many=True)
        return Response(serializer.data)



class HachathonViews(APIView):
    serializer_class = HackatonSerializer
    def get(self, request, format=None):
        hacks = Hackathon.objects.all().prefetch_related('job_area')
        title_contains_query = request.GET.get('title')
        if title_contains_query!='' and title_contains_query is not None:
            hacks=hacks.filter(title__icontains=title_contains_query).prefetch_related('job_area')
        serializer = self.serializer_class(hacks, many=True)
        return Response(serializer.data)

class UniverViews(APIView):
    serializer_class = UniSerializer
    def get(self, request, format=None):
        univers = University.objects.all()
        serializer = self.serializer_class(univers, many=True)
        return Response(serializer.data)

class DegreeViews(APIView):
    serializer_class = DegreeSerializer
    def get(self, request, format=None):
        degree = Degree.objects.all()
        serializer = self.serializer_class(degree, many=True)
        return Response(serializer.data)

class PlanViews(APIView):
    serializer_class = PlanSerializer
    def get(self, request, format=None):
        plans = PlanItem.objects.all().prefetch_related('techno')
        serializer = self.serializer_class(plans, many=True)
        return Response(serializer.data)

class StackViews(APIView):
    serializer_class = StackSerializer
    def get(self, request, format=None):
        stacks = Stack.objects.all().prefetch_related('techno')
        serializer = self.serializer_class(stacks, many=True)
        return Response(serializer.data)

class JobAreaViews(APIView):
    serializer_class = JobAreaSerializer
    def get(self, request, format=None):
        job_area = JobArea.objects.all()
        serializer = self.serializer_class(job_area, many=True)
        return Response(serializer.data)

class TestViews(APIView):
    serializer_class = TestSerializer
    def get(self, request,pk, format=None):
        test = Test.objects.filter(stack=Stack.objects.get(pk=pk)).prefetch_related('quiz')
        serializer = self.serializer_class(test, many=True)
        return Response(serializer.data)

class HunterViews(APIView):
    serializer_class = HunterSerializer
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            hunter = Hunter(
            about=serializer.validated_data.get("about"),
            birthday=serializer.validated_data.get("birthday"),
            city=serializer.validated_data.get("city"),
            linkedin_link=serializer.validated_data.get("linkedin_link"),
            github_link=serializer.validated_data.get("github_link"),
            instagram_link=serializer.validated_data.get("instagram_link"), 
            phone=serializer.validated_data.get("phone"), 
            job_area=JobArea.objects.get(pk=request.POST["job_area"]), 
            user=request.user, 
            thumbnailPath=request.data.get("thumbnailPath"),
            univer =University.objects.get(pk=request.POST["univer"]),
            degree =Degree.objects.get(pk=request.POST["degree"]))
            hunter.save()
            print(request.POST.getlist("tags"))
            techno = Techno.objects.filter(pk__in=request.POST.getlist("techno"))
            for t in techno:
                hunter.techno.add(t)
            response_serializer = self.serializer_class(hunter)
            return Response(response_serializer.data)
        else:
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        hunter = Hunter.objects.filter(user=request.user) 
        print(hunter)
        serializer = self.serializer_class(hunter, many=True)
        return Response(serializer.data)

    def put(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            hunter = Hunter.objects.get(pk=request.POST["id"])
            hunter.about=serializer.validated_data.get("about")
            hunter.birthday=serializer.validated_data.get("birthday") 
            hunter.city=serializer.validated_data.get("city") 
            hunter.linkedin_link=serializer.validated_data.get("linkedin_link") 
            hunter.github_link=serializer.validated_data.get("github_link") 
            hunter.instagram_link=serializer.validated_data.get("instagram_link") 
            hunter.phone=serializer.validated_data.get("phone") 
            hunter.job_area=JobArea.objects.get(pk=request.POST["job_area"])
            hunter.degree=Degree.objects.get(pk=request.POST["degree"])
            hunter.univer=University.objects.get(pk=request.POST["univer"])
            hunter.thumbnailPath=request.data.get("thumbnailPath")
            hunter.save()
            hunter.techno.clear()
            techno = Techno.objects.filter(pk__in=request.POST.getlist("techno"))
            for t in techno:
                hunter.techno.add(t)
            response_serializer = self.serializer_class(hunter)
            return Response(response_serializer.data)
        else:
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class RoadmapViews(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RoadmapSerializer
    def get(self, request, format=None):
        roadmap = Roadmap.objects.filter(user=request.user).prefetch_related('plan')
        serializer = self.serializer_class(roadmap, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            roadmap = Roadmap(
            title=serializer.validated_data.get("title"),
            user=request.user)
            roadmap.save()
            plan = PlanItem.objects.filter(pk__in=request.POST.getlist("plan"))
            for t in plan:
                 roadmap.plan.add(t)
            response_serializer = self.serializer_class(roadmap)
            return Response(response_serializer.data)
        else:
            return Response({"msg": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
class CvViews(APIView):
    serializer_class = HunterSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        hunter = Hunter.objects.filter(user=request.user)
        hunter1 = list(hunter)
        hunter2= hunter1[0]
        options = {
            'encoding': "UTF-8"
        }
        body = "<html><body style='background-color: rgb(250, 235, 187)'><main style='margin: 30px;padding: 30px; text-align: center;' ><h2 style='color: slategray;text-align: left;'><b>"+request.user.first_name+" "+request.user.last_name+"</b></h2><hr /><div style='display: flex;'><div style='margin-right: 30px;'><h3 style='color: slategray;text-align: left;width: 150px;'>О себе: </h3><p style='color: black; width:400px;'><i>"+hunter2.about+"</i></p><h4 style='color: slategray;text-align: left;'>Дата рождения: </h4><p style='color:black;'>"+str(hunter2.birthday)+"</i> </p><h4 style='color: slategray;text-align: left;'>Обучение:</h4><p style='color: black; width:400px;'>"+str(hunter2.univer)+" | "+str(hunter2.degree)+"</p><h4 style='color: slategray;text-align: left;'> Город:</h4><p style='color: black; width:400px;'>"+hunter2.city+" </p><h4 style='color: slategray;text-align: left;'>Сфера деятельности:</h4><p style='color: black; width:400px;'>"+str(hunter2.job_area)+"</p><h4 style='color: slategray;text-align: left;'>Знаю:</h4><p style='color: black; width:400px;'>React js, Django, Git </p></div><div style='width:200px;'><img style='width: 200px; height:200px; border-radius: 100px;' src='""'/><br /><hr /><br /><div style='text-align: center; color:black;padding: 10px; border-radius:20px;'><h4 style='color: slategray;'>Контакты: </h4><p >Email: <i> "+str(request.user.email)+"</i></p><p >Телефон: <i>"+str(hunter2.phone)+"</i></p><p >Github: <i>"+str(hunter2.github_link)+"</i></p><p >Instagram: <i>"+str(hunter2.instagram_link)+"</i></p><p >Linkedin: <i>"+str(hunter2.linkedin_link)+"</i></p></div></div></div></main></body></html>"
        myPdf = pdfkit.from_string(body, 'cv.pdf', options=options)
        serializer = self.serializer_class(hunter, many=True)
        msg = EmailMessage('Jobify', request.user.first_name + ', Привет!', 'ainur.is1701@gmail.com', [request.user.email])
        msg.content_subtype = "html"  
        msg.attach_file("cv.pdf")
        msg.send()
        return Response(serializer.data)
