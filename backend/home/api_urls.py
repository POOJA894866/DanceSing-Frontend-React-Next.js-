from django.urls import path
from .api_views import homepage_api, aboutpage_api, carepage_api

urlpatterns = [
    path("homepage/", homepage_api, name="api-homepage"),
    path("aboutpage/", aboutpage_api, name="api-aboutpage"),
    path("carepage/", carepage_api, name="api-carepage"),
]
