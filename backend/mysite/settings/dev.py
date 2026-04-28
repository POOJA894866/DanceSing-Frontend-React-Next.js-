from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-dancesing-dev-secret-key-change-in-production-123!"

ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Override so media image URLs are built correctly in dev
WAGTAILADMIN_BASE_URL = "http://localhost:8000"

try:
    from .local import *
except ImportError:
    pass
