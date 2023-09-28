from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from accounts.views import ProfileCreateView
from accounts.views import UserProfileDetailView
# from accounts.views import user_profile



urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('profiles/create/', ProfileCreateView.as_view(), name='profile-create'),
    path('user/profile/', UserProfileDetailView.as_view(), name='get_user_profile'),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

