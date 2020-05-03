from rest_framework import serializers
from .models import Hunter, JobArea, Company, Vacancy, Internship,Quiz,Test,Stack, Roadmap, PlanItem, Story, Hackathon, Techno , University, Degree
from myauth.serializers import UserSerializer

class JobAreaSerializer(serializers.ModelSerializer):
	class Meta:
		model = JobArea
		fields = ('id', 'title', "description", 'created_on')

class TechSerializer(serializers.ModelSerializer):
	class Meta:
		model = Techno
		fields = ('id', 'title', "description", 'created_on')

class UniSerializer(serializers.ModelSerializer):
	class Meta:
		model = University
		fields = ('id', 'title', 'created_on')

class DegreeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Degree
		fields = ('id', 'title', 'created_on')

class CompanySerializer(serializers.ModelSerializer):
	class Meta:
		model = Company
		fields = ('id', 'name','address','city','description', 'thumbnailPath','linkedin_link', 'instagram_link')

class StackSerializer(serializers.ModelSerializer):
	job_area = JobAreaSerializer(read_only=True)
	techno = TechSerializer(read_only=True, many=True)
	class Meta:
		model = Stack
		fields = ('id', 'title', 'description', 'created_on', 'job_area', 'techno', 'popularity')

class VacancySerializer(serializers.ModelSerializer):
    job_area = JobAreaSerializer(read_only=True)
    company = CompanySerializer(read_only=True) 
    techno = TechSerializer(read_only=True, many=True)
    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'description', 'created_on','company','experience','salary', 'perks', 'job_area', 'techno')

class IntershipSerializer(serializers.ModelSerializer):
    job_area = JobAreaSerializer(read_only=True)
    company = CompanySerializer(read_only=True) 
    techno = TechSerializer(read_only=True, many=True) 
    class Meta: 
        model = Internship 
        fields = ('id', 'title', 'description', 'created_on','company','duration','salary', 'start_date', 'job_area', 'techno')

class HackatonSerializer(serializers.ModelSerializer):
	job_area = JobAreaSerializer(read_only=True, many=True)
	class Meta:
		model = Hackathon
		fields = ('id', 'title', 'description', 'created_on','thumbnailPath','place', 'time', 'job_area','source' )

class StorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Story
		fields = ('id', 'title', 'description', 'created_on','thumbnailPath','source' )

class HunterSerializer(serializers.ModelSerializer):
    degree = DegreeSerializer(read_only=True)
    univer = UniSerializer(read_only=True)
    job_area = JobAreaSerializer(read_only=True) 
    techno = TechSerializer(read_only=True, many=True)
    user = UserSerializer(read_only=True) 
    class Meta: 
        model = Hunter
        fields = ('user', 'about', 'techno', 'phone','birthday','city','linkedin_link',"github_link", 'instagram_link','account_created_on','thumbnailPath','degree', 'job_area','univer' )

class PlanSerializer(serializers.ModelSerializer):
    techno = TechSerializer(read_only=True, many=True) 
    class Meta: 
        model = PlanItem 
        fields = ('id', 'title', 'useful_links', 'created_on','tutorials','techno' )


class RoadmapSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True, many=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = Roadmap
        fields = ('id', 'title', 'user', 'created_on','plan' )


class QuizSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True, many=True)
    class Meta:
        model = Quiz
        fields = ('id', 'plan', 'quesiton', 'created_on','answer' , "var1", "var2")

class TestSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True, many=True)
    stack = StackSerializer(read_only=True)
    class Meta:
        model = Test
        fields = ('id', 'quiz', 'title', 'created_on','stack')