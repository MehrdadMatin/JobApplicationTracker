from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"applications", views.JobApplicationViewSet, basename="applications")
router.register(r"comms", views.CommunicationViewSet, basename="comms")
router.register(r"resume", views.MasterResumeViewSet, basename="resume")

urlpatterns = [
    path("", views.index, name="index"),
    path("api/", include(router.urls)),       # "/api/..." for the React app
]
