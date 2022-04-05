from rest_framework import generics, status
from rest_framework.response import Response
from django.core.management import call_command

from process_status_monitoring.processes.serializers import ProcessSerializer
from process_status_monitoring.processes.models import Process


class ProcessListView(generics.ListAPIView):
    """
    Get a list of all processes.
    """

    serializer_class = ProcessSerializer

    def get_queryset(self):
        return Process.objects.order_by("-id")


class ProcessRefreshView(generics.GenericAPIView):
    """
    Triggers a process refresh and returns a list of updated processes.
    """

    serializer_class = ProcessSerializer

    def get_queryset(self):
        return Process.objects.order_by("-id")

    def get(self, request, *args, **kwargs):
        # Has potential to be blocking (when there are a lot
        # of running processes, parsing the whole str, etc)
        # and should be moved out of the request-response cycle.
        # For now, it should be ok with with'batch_create' for the MVP.
        call_command("store_ps_output")
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
