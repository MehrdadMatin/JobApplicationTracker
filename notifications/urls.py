from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"notifications", views.NotificationsViewSet, basename="notifications")

urlpatterns = [
    path("api/", include(router.urls)),       # "/api/..." for the React app
]