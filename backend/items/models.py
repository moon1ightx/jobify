from django.db import models
from django.contrib.auth.models import User

class JobArea(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

class Story(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    thumbnailPath = models.ImageField(blank=True, null=True)
    source = models.CharField(max_length=200, blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)

class Hackathon(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    thumbnailPath = models.ImageField(blank=True, null=True)
    place  = models.CharField(max_length=100)
    time = models.DateField(blank=True, null=True)
    source = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    job_area = models.ManyToManyField(JobArea)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(ja.title for ja in self.job_area.all()),
        )
        
class Company(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    description = models.TextField()
    thumbnailPath = models.ImageField(blank=True, null=True)
    linkedin_link = models.CharField(max_length=200,  blank=True, null=True)
    instagram_link = models.CharField(max_length=200,  blank=True, null=True)
    def __str__(self):
        return self.name

class Techno(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.title

class University(models.Model):
    title = models.CharField(max_length=200)
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return self.title

class Stack(models.Model):
    title = models.CharField(max_length=200)
    job_area = models.ForeignKey(JobArea,on_delete=models.CASCADE,related_name='stack')
    description = models.TextField()
    popularity = models.IntegerField(blank=True, null=True)
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    techno = models.ManyToManyField(Techno)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(t.title for t in self.techno.all()),
        )

class Vacancy(models.Model):
    title = models.CharField(max_length=200)
    company = models.ForeignKey(Company,on_delete=models.CASCADE,related_name='vacancies')
    job_area =models.ForeignKey(JobArea,on_delete=models.CASCADE,related_name='vacancies')
    experience = models.IntegerField()
    description = models.TextField()
    salary = models.IntegerField(blank=True, null=True)
    perks = models.TextField(blank=True, null=True)
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    techno = models.ManyToManyField(Techno)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(t.title for t in self.techno.all()),
        )

class Internship(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateField(blank=True, null=True)
    company = models.ForeignKey(Company,on_delete=models.CASCADE,related_name='intenrships')
    job_area =models.ForeignKey(JobArea,on_delete=models.CASCADE,related_name='intenrships')
    description = models.TextField()
    salary = models.IntegerField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    techno = models.ManyToManyField(Techno)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(t.title for t in self.techno.all()),
        )

class Hunter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    phone = models.CharField(max_length=20,blank=True, null=True)
    birthday = models.DateField()
    city = models.CharField(max_length=100)
    univer = models.ForeignKey(University,on_delete=models.CASCADE, blank=True, null=True,related_name='hunters')
    thumbnailPath = models.ImageField(blank=True, null=True)
    job_area =models.ForeignKey(JobArea,on_delete=models.CASCADE,related_name='hunters')
    about = models.CharField(max_length=200)
    github_link = models.CharField(max_length=200, blank=True, null=True)    # TODO change to  Map Field like {'github': "http://...", 'Linkedin':"http://..." }
    linkedin_link = models.CharField(max_length=200,  blank=True, null=True)
    instagram_link = models.CharField(max_length=200,  blank=True, null=True)
    account_created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    techno = models.ManyToManyField(Techno)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(t.title for t in self.techno.all()),
        )
   
class PlanItem(models.Model):
    title = models.CharField(max_length=200)
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    useful_links = models.CharField(max_length=200, blank=True, null=True)
    tutorials = models.CharField(max_length=200, blank=True, null=True)
    techno = models.ManyToManyField(Techno)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(t.title for t in self.techno.all()),
        )

class Roadmap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=200)
    plan = models.ManyToManyField(PlanItem)
    created_on = models.DateField(auto_now_add=True, blank=True, null=True)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(t.title for t in self.plan.all()),
        )

