from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.generics import (RetrieveUpdateDestroyAPIView, ListAPIView,
                                     ListCreateAPIView)
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from users.models import User
from users.serializers import UserRegistrationSerializer, UserSerializer
from lib.utils import AtomicMixin


class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        """User registration view."""
        return self.create(request)


class UserLoginView(GenericAPIView):
    serializer_class = UserSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """User login with username and password."""
        token = AuthToken.objects.create(request.user)
        return Response({
            'user': self.get_serializer(request.user).data,
            'token': token
        })


class UserConfirmEmailView(AtomicMixin, GenericAPIView):
    serializer_class = None
    authentication_classes = ()

    def get(self, request, activation_key):
        """
        View for confirm email.

        Receive an activation key as parameter and confirm email.
        """
        user = get_object_or_404(User, activation_key=str(activation_key))
        if user.confirm_email():
            return Response(status=status.HTTP_200_OK)

        log.warning(message='Email confirmation key not found.',
                    details={'http_status_code': status.HTTP_404_NOT_FOUND})
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserEmailConfirmationStatusView(GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        user = self.request.user
        return Response({'status': user.confirmed_email}, status=status.HTTP_200_OK)


class UserProfileView(GenericAPIView):
    """Return user profile data."""
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return profile data."""
        user = self.request.user
        return Response(self.get_serializer(user).data, status=status.HTTP_200_OK)

    def post(self, request):
        """Process POST requtest to update profile"""
        user = self.request.user
        for field, value in request.data.items():
            if field in user.EDITABLE_FIELDS:
                setattr(user, field, value)
        user.save()
        return Response(self.get_serializer(user).data, status=status.HTTP_200_OK)


class UserListCreateView(ListCreateAPIView):
    """List & create card."""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)


class UserRUDView(RetrieveUpdateDestroyAPIView):
    """User management."""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)
    lookup_field = "username"

    def delete(self, request):
        """Delete User."""
        import ipdb; ipdb.set_trace()
        # Remove user information like username, ... but keep stat info
        # soft_delete user
        # logout


class UserFriendsView(ListAPIView):
    """ User friends list """
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return user friends."""
        user = self.request.user
        return Response(self.get_serializer(user).data['friends'],
                        status=status.HTTP_200_OK)


class UserFriendsRUDView(RetrieveUpdateDestroyAPIView):
    """ User Friends management """
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @classmethod
    def delete(cls, request):
        user = request.user
        friend_id = request.data
        friend = User.objects.filter(id=friend_id).first()
        # Friends are deleted on both sides
        user.friends.remove(friend)
        friend.friends.remove(user)
        user.save()
        friend.save()
        return Response(status=status.HTTP_200_OK)
