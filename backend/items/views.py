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
            hunter = Hunter.objects.get(user=request.user)
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
        #body = "<html><body style='background-color: rgb(250, 235, 187)'><main style='margin: 30px;padding: 30px; text-align: center;' ><h2 style='color: slategray;text-align: left;'><b>"+request.user.first_name+" "+request.user.last_name+"</b></h2><hr /><div style='display: flex;'><div style='margin-right: 30px;'><h3 style='color: slategray;text-align: left;width: 150px;'>О себе: </h3><p style='color: black; width:400px;'><i>"+hunter2.about+"</i></p><h4 style='color: slategray;text-align: left;'>Дата рождения: </h4><p style='color:black;'>"+str(hunter2.birthday)+"</i> </p><h4 style='color: slategray;text-align: left;'>Обучение:</h4><p style='color: black; width:400px;'>"+str(hunter2.univer)+" | "+str(hunter2.degree)+"</p><h4 style='color: slategray;text-align: left;'> Город:</h4><p style='color: black; width:400px;'>"+hunter2.city+" </p><h4 style='color: slategray;text-align: left;'>Сфера деятельности:</h4><p style='color: black; width:400px;'>"+str(hunter2.job_area)+"</p><h4 style='color: slategray;text-align: left;'>Знаю:</h4><p style='color: black; width:400px;'>React js, Django, Git </p></div><div style='width:200px;'><img style='width: 200px; height:200px; border-radius: 100px;' src='""'/><br /><hr /><br /><div style='text-align: center; color:black;padding: 10px; border-radius:20px;'><h4 style='color: slategray;'>Контакты: </h4><p >Email: <i> "+str(request.user.email)+"</i></p><p >Телефон: <i>"+str(hunter2.phone)+"</i></p><p >Github: <i>"+str(hunter2.github_link)+"</i></p><p >Instagram: <i>"+str(hunter2.instagram_link)+"</i></p><p >Linkedin: <i>"+str(hunter2.linkedin_link)+"</i></p></div></div></div></main></body></html>"
        body = "<html lang='en' style=' box-sizing: border-box;'><head><meta charset='UTF-8'><title>CV</title></head><body style='font-family: Source Sans Pro, sans-serif; line-height: 1.5; background: #F2F2F2; color: #323232;'><div style='max-width: 960px; margin: 40px auto; padding: 32px; background: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'><section style='display: grid; grid-template-columns: 1fr 4fr; grid-gap: 20px; padding: 24px 0; border-bottom: 1px solid lightgrey;'> <div> </div>  <div><div style='font-size: 48px; line-height: 1;'>"+request.user.first_name+" "+request.user.last_name+"</div><div style='display: flex; margin: 10px 0 20px 0;'><div style='display: flex; align-items: center; flex: 1;'><svg viewBox='0 0 1792 1792' style='margin-right: 6px;' xmlns='http://www.w3.org/2000/svg'><path d='M1664 1504v-768q-32 36-69 66-268 206-426 338-51 43-83 67t-86.5 48.5-102.5 24.5h-2q-48 0-102.5-24.5t-86.5-48.5-83-67q-158-132-426-338-37-30-69-66v768q0 13 9.5 22.5t22.5 9.5h1472q13 0 22.5-9.5t9.5-22.5zm0-1051v-24.5l-.5-13-3-12.5-5.5-9-9-7.5-14-2.5h-1472q-13 0-22.5 9.5t-9.5 22.5q0 168 147 284 193 152 401 317 6 5 35 29.5t46 37.5 44.5 31.5 50.5 27.5 43 9h2q20 0 43-9t50.5-27.5 44.5-31.5 46-37.5 35-29.5q208-165 401-317 54-43 100.5-115.5t46.5-131.5zm128-37v1088q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1472q66 0 113 47t47 113z'/></svg><a href='mailto:email@email.com'>"+request.user.email+"</a></div> <div style='display: flex; align-items: center; flex: 1;'><svg  viewBox='0 0 1792 1792' style='margin-right: 6px;' xmlns='http://www.w3.org/2000/svg'><path d='M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z'/></svg><a href='tel:123-456-7890'>"+str(hunter2.phone)+"</a> </div> </div> </div>  </section> <section style='display: grid; grid-template-columns: 1fr 4fr; grid-gap: 20px; padding: 24px 0; border-bottom: 1px solid lightgrey;'><div style='font-weight: bold; font-size: 18px;'>О себе</div> <div> <div style='padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid lightgray;'><div style='display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 18px;'><div>  <div style='line-height: 1.2;'>"+hunter2.about+"</div> </div>  </div> </div>  </div> <div style='font-weight: bold; font-size: 18px;'>Дата рождения</div><div> <div style='padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid lightgray;'><div style='display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 18px;'> <div> <div style='line-height: 1.2;'>"+str(hunter2.birthday)+"</div> </div>   </div>   </div>   </div> <div style='font-weight: bold; font-size: 18px;'>Сфера деятельности</div> <div> <div style='padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid lightgray;'> <div style='display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 18px;'> <div>  <div style='line-height: 1.2;'>"+str(hunter2.job_area)+"</div>  </div> </div> </div>   </div><div style='font-weight: bold; font-size: 18px;'>Образование</div> <div><div style='padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid lightgray;'><div style='display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 18px;'><div><div style='line-height: 1.2;'>"+str(hunter2.univer)+"</div><div style='display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 18px;'> "+str(hunter2.degree)+"</div> </div> </div>  </div>  </div></section><section style='display: grid; grid-template-columns: 1fr 4fr; grid-gap: 20px; padding: 24px 0; border-bottom: 1px solid lightgrey;'><div style='font-weight: bold; font-size: 18px;'>Знания</div> <div><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 20px; margin-bottom: 24px;'> <ul style='margin-left: 20px; list-style-type: disc;'> <li>React js</li> <li>Django</li><li>Git</li> </ul> </div>  </div> </section> <section style='display: grid; grid-template-columns: 1fr 4fr; grid-gap: 20px; padding: 24px 0; border-bottom: 1px solid lightgrey;'><div style='font-weight: bold; font-size: 18px;'>Ссылки</div> <div class='interests-container'><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 20px; margin-bottom: 24px;'><ul style='margin-left: 20px; list-style-type: disc;'> <li>"+str(hunter2.github_link)+"</li>   <li>"+str(hunter2.instagram_link)+"</li>   <li>"+str(hunter2.linkedin_link)+"</li>  </ul>   </div>   </div> </section> </div></body></html>"
        myPdf = pdfkit.from_string(body, 'cv.pdf', options=options)
        serializer = self.serializer_class(hunter, many=True)
        msg = EmailMessage('Jobify', request.user.first_name + ', Привет!', 'ainur.is1701@gmail.com', [request.user.email])
        msg.content_subtype = "html"  
        msg.attach_file("cv.pdf")
        msg.send()
        return Response(serializer.data)
