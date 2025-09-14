from django.db import models
from django.utils import timezone

# Create your models here.
class Notification(models.Model):
    message = models.CharField(max_length=200)
    pub_date = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.message