from rest_framework import serializers

from process_status_monitoring.processes.models import Process


class ProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = "__all__"
