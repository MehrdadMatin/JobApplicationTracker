from django.db import models
from django.utils import timezone

class MasterResume(models.Model):
    file = models.FileField(upload_to='resumes/master/')

    def __str__(self):
        return "Master Resume"


class JobApplication(models.Model):
    company_name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    date_applied = models.DateField(default=timezone.now)

    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interviewing', 'Interviewing'),
        ('offered', 'Offer Received'),
        ('rejected', 'Rejected'),
        ('on_hold', 'On Hold'),
    ]
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='applied')

    next_action = models.CharField(max_length=200, blank=True, default="")
    next_action_due = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, default="")
    resume_variant = models.CharField(max_length=200, blank=True, default="")  # e.g., "Resume_Google_v1.docx"

    # uploaded tailored resume file
    tailored_resume = models.FileField(
        upload_to='resumes/tailored/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.position} at {self.company_name}"


class Communication(models.Model):
    """
    Communication / response log per application
    """
    CHANNEL_CHOICES = [
        ("email", "Email"),
        ("call", "Call"),
        ("portal", "Portal"),
        ("meeting", "Meeting"),
        ("other", "Other"),
    ]
    application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name="comms")
    timestamp = models.DateTimeField(default=timezone.now)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, default="email")
    summary = models.TextField()

    def __str__(self):
        return f"{self.application.company_name}: {self.channel} - {self.summary[:40]}"
