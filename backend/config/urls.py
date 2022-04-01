from django.conf import settings
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
]

api_urlpatterns = [
    path("api/", include("process_status_monitoring.processes.urls")),
]

urlpatterns += api_urlpatterns

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
