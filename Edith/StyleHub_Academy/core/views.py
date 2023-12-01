from django.shortcuts import render
from core.models import EducationalModule, Course

def home(request):
    modules = EducationalModule.objects.all()
    return render(request, 'core/home.html', {'modules': modules})

def courses(request, module_id):
    educational_module = EducationalModule.objects.get(pk=module_id)
    courses = Course.objects.filter(module=educational_module)
    
    
    return render(request, 'courses.html', {'courses': courses})