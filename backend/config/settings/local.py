import socket
from .base import *
from .base import env

# GENERAL
# ------------------------------------------------------------------------------
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

# Trick to show Django Debug Toolbar when using Docker
hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS = [".".join(ip.split(".")[:-1] + ["1"]) for ip in ips] + env.list(
    "INTERNAL_IPS"
)  # noqa
# APPS
# ------------------------------------------------------------------------------
INSTALLED_APPS += [
    "django_extensions",
    "debug_toolbar",
]
# MIDDLEWARE
# ------------------------------------------------------------------------------
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
# DATABASES
# ------------------------------------------------------------------------------
DATABASES = {
    "default": env.db("DATABASE_URL"),
}
# REST FRAMEWORK
# ------------------------------------------------------------------------------
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [
    "rest_framework.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",
]
# AUTHENTICATION & AUTHORIZATION
# ------------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")
