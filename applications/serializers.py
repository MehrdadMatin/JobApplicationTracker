from rest_framework import serializers
from .models import MasterResume, JobApplication, Communication

class CommunicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Communication
        fields = "__all__"

class JobApplicationSerializer(serializers.ModelSerializer):
    comms = CommunicationSerializer(many=True, read_only=True)

    class Meta:
        model = JobApplication
        fields = "__all__"

class MasterResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterResume
        fields = ["id", "file"]
