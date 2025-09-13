from django.db import models
from django.utils import timezone

# Create your models here.
class JobApplication(models.Model):
    company_name = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    date_applied = models.DateField(default=timezone.now)
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interviewing', 'Interviewing'),
        ('offered', 'Offer Received'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.position} at {self.company_name}"