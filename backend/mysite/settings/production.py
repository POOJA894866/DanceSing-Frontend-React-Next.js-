from .base import *
import os

DEBUG = False

SECRET_KEY = os.environ.get("SECRET_KEY", "")

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")

WAGTAILADMIN_BASE_URL = os.environ.get("WAGTAILADMIN_BASE_URL", "https://yourdomain.com")
