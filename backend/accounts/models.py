from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, Group, Permission
from django.conf import settings

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()
    groups = models.ManyToManyField(Group, verbose_name='groups', blank=True, related_name='user_accounts_groups')
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='user_account_permissions'  # Unique related_name for UserAccount
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email



class ProfileAccountManager(BaseUserManager):
    def create_profile(self, email,**extra_fields):
        if not email:
            raise ValueError('An email address is required for creating profile')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.save()

        return user

class UserProfileAccount(AbstractBaseUser, PermissionsMixin):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    contact = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    radiodetails = models.CharField(max_length=255)
    radiosetdetails = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    objects = ProfileAccountManager()
    groups = models.ManyToManyField(Group, verbose_name='groups', blank=True, related_name='user_profile_accounts_groups')
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='user_profile_account_permissions'  # Unique related_name for UserProfileAccount
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'designation']

    def get_full_name(self):
        return self.name
    
    def __str__(self):
        return self.email


