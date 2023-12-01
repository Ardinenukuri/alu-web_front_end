from django.urls import path
from .views import signup_page, LoginPageView, logout, upload_profile_photo

urlpatterns = [
    path('sign_up/', signup_page, name='signup'),
    path('login/', LoginPageView.as_view(template_name='authentication/login.html',
           redirect_authenticated_user=True), name='login'),
    path('logout/', logout, name='logout' ),
    path('profile-photo/upload', upload_profile_photo, name='upload_profile_photo'),
]
    