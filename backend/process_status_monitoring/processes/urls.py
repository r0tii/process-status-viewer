from django.urls import path

from process_status_monitoring.processes import views


app_name = "processes"
urlpatterns = [
    path("processes", views.ProcessListView.as_view(), name="process-list"),
    path(
        "processes/refresh", views.ProcessRefreshView.as_view(), name="process-refresh"
    ),
]
