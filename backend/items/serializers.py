from rest_framework import serializers
from .models import Hunter, JobArea, Company, Vacancy, Internship, Stack, Roadmap, PlanItem, Story, Hackathon, Techno , University, Degree
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
	jobArea = JobAreaSerializer(read_only=True)
	techno = TechSerializer(read_only=True, many=True)
	class Meta:
		model = Stack
		fields = ('id', 'title', 'description', 'created_on', 'job_area', 'techno', 'popularity')

class VacancySerializer(serializers.ModelSerializer):
	jobArea = JobAreaSerializer(read_only=True)
	techno = TechSerializer(read_only=True, many=True)
    company = CompanySerializer(read_only=True)
	class Meta:
		model = Vacancy
		fields = ('id', 'title', 'description', 'created_on','company','experience','salary', 'perks', 'job_area', 'techno')

class IntershipSerializer(serializers.ModelSerializer):
	jobArea = JobAreaSerializer(read_only=True)
	techno = TechSerializer(read_only=True, many=True)
    company = CompanySerializer(read_only=True)
	class Meta:
		model = Internship
		fields = ('id', 'title', 'description', 'created_on','company','duration','salary', 'start_date', 'job_area', 'techno')
        