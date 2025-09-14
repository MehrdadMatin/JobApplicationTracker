from rest_framework import viewsets
from .models import Notification
from .serializers import NotificationSerializer
# Create your views here.

class NotificationsViewSet(viewsets.ModelViewSet):
    """
    List all notifications
    """
    queryset = Notification.objects.all().order_by("-pub_date")
    serializer_class = NotificationSerializer