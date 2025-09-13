from .models import Notification
from django.dispatch import receiver
from django.db.models.signals import post_save
from applications.models import JobApplication

"""
Callback function that will be called any time the JobApplication model is saved,
behaviour will differ depending on whether the model is created or updated
"""
@receiver(post_save, sender=JobApplication)
def job_application_saved(sender, created, **kwargs):
    if created:
        n = Notification(message="Job application has been created")
        n.save()
    else: 
        n = Notification(message="Job application has been updated")
        n.save()