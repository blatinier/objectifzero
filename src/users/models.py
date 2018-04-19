import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from cards.models import Card


CARDS_STATUS = (
    ('NOT_STARTED', 'Not started'),
    ('NOT_CONCERNED', 'Not concerned'),
    ('STARTED', 'Started'),
    ('DONE', 'Done')
)


class MyUserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        """
        Create and save an User with the given email, password, name and phone number.

        :param email: string
        :param password: string
        :param is_staff: boolean
        :param is_superuser: boolean
        :param extra_fields:
        :return: User
        """
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(email=email,
                          is_staff=is_staff,
                          is_active=True,
                          is_superuser=is_superuser,
                          last_login=now,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password, **extra_fields):
        """
        Create and save an User with the given email, password and name.

        :param email: string
        :param password: string
        :param extra_fields:
        :return: User
        """

        return self._create_user(email, password, is_staff=False, is_superuser=False,
                                 **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create a super user.

        :param email: string
        :param password: string
        :param extra_fields:
        :return: User
        """
        return self._create_user(email, password, is_staff=True, is_superuser=True,
                                 **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Model that represents an user.

    To be active, the user must register and confirm his email.
    """

    EDITABLE_FIELDS = ['username', 'gender', 'has_garden',
                       'do_smoke', 'home_owner']
    GENDER_MALE = 'M'
    GENDER_FEMALE = 'F'
    GENDER_CHOICES = (
        (GENDER_MALE, 'Male'),
        (GENDER_FEMALE, 'Female')
    )

    # we want primary key to be called id so need to ignore pylint
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # pylint: disable=invalid-name

    username = models.CharField(_('Username'), max_length=50, unique=True)
    first_name = models.CharField(_('First Name'), max_length=50, blank=True, null=True)
    last_name = models.CharField(_('Last Name'), max_length=50, blank=True, null=True)
    email = models.EmailField(_('Email address'), unique=True)

    confirmed_email = models.BooleanField(default=False)

    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)
    is_active = models.BooleanField(_('active'), default=True)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)

    activation_key = models.UUIDField(unique=True, default=uuid.uuid4)  # email

    # Friendship
    friends = models.ManyToManyField('self', blank=True)

    # Zero Waste fields
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default=GENDER_MALE, blank=True, null=True)
    has_garden = models.BooleanField(default=False)
    do_smoke = models.BooleanField(default=False)
    home_owner = models.BooleanField(default=False)
    cards = models.ManyToManyField(Card, through='UserCard')

    USERNAME_FIELD = 'email'

    objects = MyUserManager()

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.email

    def activation_expired(self):
        """
        Check if user's activation has expired.

        :return: boolean
        """
        return self.date_joined + timedelta(days=settings.ACCOUNT_ACTIVATION_DAYS) < timezone.now()

    def confirm_email(self):
        """
        Confirm email.

        :return: boolean
        """
        if not self.activation_expired() and not self.confirmed_email:
            self.confirmed_email = True
            self.save()
            return True
        return False

    def get_short_name(self):
        return self.username

    def add_friend(self, friend_username):
        friend = User.objects.filter(username=friend_username).first()
        if friend:
            self.friends.add(friend)
            self.save()

class UserCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    status = models.CharField(max_length=16,
                              choices=CARDS_STATUS,
                              default='NOT_STARTED')
