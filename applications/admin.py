from django.contrib import admin
from .models import MasterResume, JobApplication, Communication

# Register your models here.
@admin.register(MasterResume)
class MasterResumeAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return MasterResume.objects.count() < 1

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'position', 'date_applied', 'status', 'next_action_due']
    search_fields = ['company_name', 'position', 'notes', 'resume_variant']
    list_filter = ['status', 'date_applied', 'next_action_due']
    ordering = ['-date_applied', '-id']

@admin.register(Communication)
class CommunicationAdmin(admin.ModelAdmin):
    list_display = ['application', 'timestamp', 'channel', 'summary']
    list_filter = ['channel', 'timestamp']
    search_fields = ['summary', 'application__company_name', 'application__position']
    ordering = ['-timestamp']