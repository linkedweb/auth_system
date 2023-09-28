from django.shortcuts import render
from rest_framework import viewsets,generics
from .models import UserProfileAccount
from .serializers import UserProfileAccountSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import requests
from django.http import Http404
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes,api_view
from rest_framework.permissions import IsAuthenticated


class ProfileCreateView(generics.CreateAPIView):
    queryset = UserProfileAccount.objects.all()
    serializer_class = UserProfileAccountSerializer
    permission_classes = [AllowAny]

# @login_required
# def get_user_profile(request):
#     print('get_user')
#     user_profile = UserProfileAccount.objects.get(user=request.user)
#     # user_profile = UserProfileAccount.objects.get(email='drishtiolf@gmail.com')   # Assuming you have a user field in your profile model.
#     serializer = UserProfileAccountSerializer(user_profile)
#     lookup_field = 'email'
#     return Response(serializer.data)
#     # profile_data = {
#     #     "name": user_profile.name,
#     #     "email": user_profile.email,
#     #     "contact": user_profile.contact,
#     #     "designation": user_profile.designation,
#     #     "organization": user_profile.organization,
#     #     # Add more fields as needed
#     # }
#     # print(user_profile.status_code)
#     # return JsonResponse(profile_data)


# class UserProfileDetailView(generics.RetrieveAPIView):
#     queryset = UserProfileAccount.objects.all()
#     serializer_class = UserProfileAccountSerializer
#     lookup_field = 'name'


#     def retrieve(self, request, *args, **kwargs):
#         name = self.kwargs.get('name')
#         try:
#             user_profile = UserProfileAccount.objects.get(name=name)
#             serializer = UserProfileAccountSerializer(user_profile)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except UserProfileAccount.DoesNotExist:
#             raise Http404("User profile not found")
# @authentication_classes([])
# @permission_classes([AllowAny])
class UserProfileDetailView(generics.RetrieveAPIView):
    serializer_class = UserProfileAccountSerializer

    def retrieve(self, request, *args, **kwargs):
        user_profile = request.user.user_accounts_groups  # Assuming UserProfileAccount is related to the user model
        serializer = UserProfileAccountSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile(request):
#     # Retrieve the user's profile data here based on the authenticated user
#     user = UserProfileAccount.objects.get(name=name)  # This will give you the authenticated user
#     # Fetch the user's profile data and serialize it to JSON
#     profile_data = {
#         'name': user.name,
#         'email': user.email,
#         # Add other profile fields here
#     }
#     print(profile_data)
#     return Response(profile_data)