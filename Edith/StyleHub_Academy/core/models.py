# core/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class EducationalModule(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

class UserProfile(AbstractUser):
    profile_photo = models.ImageField(upload_to='')
    role = models.CharField(choices=[('CREATOR', 'Creator'), ('SUBSCRIBER', 'Subscriber')], max_length=30)

    # Add unique related_name attributes for the groups and user_permissions fields
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_profiles_groups',
        related_query_name='user_profile_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_profiles_permissions',
        related_query_name='user_profile_permissions',
        blank=True
    )

    def __str__(self):
        return self.username
    
    password = models.CharField(max_length=128, default='')


class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    module = models.ForeignKey(EducationalModule, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class FashionCourse(Course):
    designer_instructor = models.CharField(max_length=100)
    garment_types = models.CharField(max_length=200, help_text="e.g., Dresses, Accessories")
    fashion_trends = models.TextField(help_text="Current and upcoming fashion trends")
    portfolio_requirements = models.TextField(help_text="Requirements for creating a fashion portfolio")

    def __str__(self):
        return self.title

class WellnessCourse(Course):
    wellness_instructor = models.CharField(max_length=100)
    fitness_level = models.CharField(max_length=20, choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')])
    nutrition_topics = models.TextField(help_text="Key nutrition topics covered in the course")
    mindfulness_techniques = models.TextField(help_text="Techniques for mindfulness and stress reduction")
    yoga_experience_required = models.BooleanField(default=False, help_text="Is prior yoga experience required?")

    def __str__(self):
        return self.title