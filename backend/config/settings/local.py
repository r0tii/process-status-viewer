from .base import *
from .base import env

# GENERAL
# ------------------------------------------------------------------------------
DEBUG = env("DEBUG", default=True)

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

INTERNAL_IPS = ["127.0.0.1"]
# APPS
# ------------------------------------------------------------------------------
INSTALLED_APPS += [
    "django_extensions",
    "debug_toolbar",
]
# MIDDLEWARE
# ------------------------------------------------------------------------------
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
