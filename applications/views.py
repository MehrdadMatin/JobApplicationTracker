from datetime import timedelta
from django.db.models import Q
from django.utils import timezone

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django.http import HttpResponse

from .models import MasterResume, JobApplication, Communication
from .serializers import (
    MasterResumeSerializer,
    JobApplicationSerializer,
    CommunicationSerializer,
)
from notifications.signals import upcoming_tasks_notification


def index(request):
    return HttpResponse("Job Application Organizer.")

class JobApplicationViewSet(viewsets.ModelViewSet):
    """
    CRUD for job applications.
    Query params:
      ?status=applied|interviewing|offered|rejected|on_hold
      ?q=<search in company/position>
      ?due=week|overdue    (filter reminders)
    Actions:
      POST /api/applications/<id>/set_status/   { "status": "interviewing" }
      POST /api/applications/<id>/followup_in_days/ { "days": 7, "note": "Follow-up email" }
      POST /api/applications/<id>/update_notes/ { "notes": "these are the new notes" }
    """
    queryset = JobApplication.objects.all().order_by("-date_applied", "-id")
    serializer_class = JobApplicationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        status_param = self.request.query_params.get("status")
        q = self.request.query_params.get("q")
        due = self.request.query_params.get("due")

        if status_param:
            qs = qs.filter(status=status_param)
        if q:
            qs = qs.filter(Q(company_name__icontains=q) | Q(position__icontains=q))

        if due == "week":
            today = timezone.localdate()
            end = today + timedelta(days=6 - today.weekday())  # end of current week (Sun if Mon=0)
            qs = qs.filter(next_action_due__isnull=False, next_action_due__gte=today, next_action_due__lte=end)
        elif due == "overdue":
            today = timezone.localdate()
            qs = qs.filter(next_action_due__isnull=False, next_action_due__lt=today)

        return qs
    
    def perform_create(self, serializer):
        super().perform_create(serializer)
        upcoming_tasks_notification.send(sender=JobApplication, reminder_date=serializer.validated_data.get("next_action_due"), task=serializer.validated_data.get("next_action"))

    @action(detail=True, methods=["post"])
    def set_status(self, request, pk=None):
        app = self.get_object()
        new_status = request.data.get("status")
        valid = dict(JobApplication.STATUS_CHOICES).keys()
        if new_status not in valid:
            return Response({"detail": f"Invalid status. Must be one of {list(valid)}"},
                            status=status.HTTP_400_BAD_REQUEST)
        app.status = new_status
        app.save()  
        return Response(self.get_serializer(app).data)

    @action(detail=True, methods=["post"])
    def followup_in_days(self, request, pk=None):
        """
        Set next_action and next_action_due = today + N days.
        Body: { "days": 7, "note": "Follow-up email" }
        """
        app = self.get_object()
        try:
            days = int(request.data.get("days", 7))
        except (TypeError, ValueError):
            days = 7
        note = request.data.get("note") or "Follow up"

        app.next_action = note
        app.next_action_due = timezone.localdate() + timedelta(days=days)
        app.save()  
        upcoming_tasks_notification.send(sender=JobApplication, reminder_date=app.next_action_due, task=app.next_action)
        return Response(self.get_serializer(app).data)
    
    @action(detail=True, methods=["post"])
    def update_notes(self, request, pk=None):
        """
        Change the notes field for the job application to the new notes passed in the body
        Body: { "notes": "these are the new notes"}
        """
        app = self.get_object()
        new_notes = request.data.get("notes")

        app.notes = new_notes
        app.save()
        return Response(self.get_serializer(app).data)


class CommunicationViewSet(viewsets.ModelViewSet):
    """
    Log /communications tied to an application.
    Filter by ?application=<id>
    """
    queryset = Communication.objects.all().order_by("-timestamp")
    serializer_class = CommunicationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        app_id = self.request.query_params.get("application")
        if app_id:
            qs = qs.filter(application_id=app_id)
        return qs

class MasterResumeViewSet(viewsets.ModelViewSet):
    """
    Manage master resume file (single).
    Create replaces any existing file
    """
    queryset = MasterResume.objects.all()
    serializer_class = MasterResumeSerializer

    def create(self, request, *args, **kwargs):
        MasterResume.objects.all().delete()
        return super().create(request, *args, **kwargs)
