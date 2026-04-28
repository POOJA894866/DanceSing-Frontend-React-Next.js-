from django.urls import path
from .api_views import homepage_api

urlpatterns = [
    path("homepage/", homepage_api, name="api-homepage"),
]
