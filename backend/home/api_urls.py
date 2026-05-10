from django.urls import path
from .api_views import homepage_api, aboutpage_api, carepage_api, lifestylepage_api, trainingpage_api, calendarpage_api

urlpatterns = [
    path("homepage/",   homepage_api,   name="api-homepage"),
    path("aboutpage/",  aboutpage_api,  name="api-aboutpage"),
    path("carepage/",   carepage_api,   name="api-carepage"),
    path("lifestylepage/", lifestylepage_api, name="api-lifestylepage"),
    path("trainingpage/",  trainingpage_api,  name="api-trainingpage"),
    path("calendarpage/",  calendarpage_api,  name="api-calendarpage"),
]
