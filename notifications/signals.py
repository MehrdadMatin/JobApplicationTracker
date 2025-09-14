from .models import Notification
from django.dispatch import receiver
from django.db.models.signals import post_save
from applications.models import JobApplication
from django.dispatch import Signal


upcoming_tasks_notification = Signal(["reminder_date", "task"])


@receiver(post_save, sender=JobApplication)
def job_application_saved(sender, created, **kwargs):
    """
    Callback function that will be called any time the JobApplication model is saved,
    behaviour will differ depending on whether the model is created or updated
    """
    if created:
        n = Notification(message="Job application has been created")
        n.save()
    else: 
        n = Notification(message="Job application has been updated")
        n.save()

@receiver(upcoming_tasks_notification)
def upcoming_task_created(sender, reminder_date, task, **kwargs):
    """
    Callback function that should create a new reminder notification when the signal is sent.
    The signal is sent when the job application is created, and when the next actions are updated.
    """
    message = f"{task} action needs to be done by {reminder_date}"
    n = Notification(message=message)
    n.save()