from django.contrib import admin

from .models import Hunter, JobArea, Company, Vacancy, Internship, Stack, Roadmap, PlanItem, Story, Hackathon, Techno 

class HunterAdmin(admin.ModelAdmin):
    list_display = (  "about", "user","birthday", "city", "phone")
    search_fields =  (  "about", "user","birthday", "city", "phone")

class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "description")
    search_fields =  ("title","description")

class CompAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "address")
    search_fields =  ("name", "city", "address")

class VacaAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "job_area", 'salary', "perks")
    search_fields =  ("title", "company", "job_area", 'salary',  "perks")
    
class IntAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "job_area",  "description")
    search_fields =  ("title", "company", "job_area","description")

class StackAdmin(admin.ModelAdmin):
    list_display = ("title",  "description")
    search_fields =  ("title",  "description")

class HackAdmin(admin.ModelAdmin):
    list_display = ("title",  "description")
    search_fields =  ("title",  "description")

class TechAdmin(admin.ModelAdmin):
    list_display = ("title",  "description")
    search_fields =  ("title",  "description")

class StoryAdmin(admin.ModelAdmin):
    list_display = ("title",  "description")
    search_fields =  ("title",  "description")


class RoadmapAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields =  ("title",)


class PlanAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields =  ("title",)

admin.site.register(Hunter, HunterAdmin)
admin.site.register(JobArea, JobAdmin)
admin.site.register(Company, CompAdmin)
admin.site.register(Vacancy, VacaAdmin)
admin.site.register(Internship, IntAdmin)
admin.site.register(Stack, StackAdmin)
admin.site.register(Story, StoryAdmin)
admin.site.register(Hackathon, HackAdmin)
admin.site.register(Roadmap, RoadmapAdmin)
admin.site.register(PlanItem, PlanAdmin)
admin.site.register(Techno, TechAdmin)