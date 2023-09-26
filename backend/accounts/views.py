from django.shortcuts import render
from rest_framework import viewsets,generics
from .models import UserProfileAccount
from .serializers import UserProfileAccountSerializer
from rest_framework.permissions import AllowAny


class ProfileCreateView(generics.CreateAPIView):
    queryset = UserProfileAccount.objects.all()
    serializer_class = UserProfileAccountSerializer
    permission_classes = [AllowAny]


