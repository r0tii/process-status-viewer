from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class TestView(APIView):
    """
    Get dummy data.
    """

    def get(self, request, *args, **kwargs):
        return Response({"data": "works!"}, status=status.HTTP_200_OK)
