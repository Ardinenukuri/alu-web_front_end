from django.urls import path, include
from .views import home, courses
from django.urls import reverse

url = reverse('courses', args=[1]) 

urlpatterns = [
    path('', home, name='home'),
    path('courses/<int:module_id>/', courses, name='courses'),
    
]