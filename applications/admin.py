from django.contrib import admin
from .models import MasterResume, JobApplication

# Register your models here.
@admin.register(MasterResume)
class MasterResumeAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if MasterResume.objects.count() >= 1:
            return False
        return True

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'position', 'date_applied', 'status']
