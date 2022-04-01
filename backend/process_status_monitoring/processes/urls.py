from django.conf.urls import url

from process_status_monitoring.processes import views


app_name = "processes"
urlpatterns = [
    url("test-data", views.TestView.as_view(), name="test-view"),
]
