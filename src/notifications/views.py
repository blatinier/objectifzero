from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import (RetrieveUpdateDestroyAPIView,
                                     ListCreateAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from notifications.models import Notification
from notifications.serializers import NotificationSerializer
from users.models import User


class NotificationListCreateView(ListCreateAPIView):
    """ List notifications """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.get_queryset().order_by('-created_at')
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        user = request.user
        friend_username = request.data.get('friend', '')
        friend = User.objects.filter(username=friend_username).first()
        if friend:
            self.serializer_class().create({
                'created_by': user,
                'destination_user': friend,
                })
        return Response(status=status.HTTP_200_OK)


class NotificationRUDView(RetrieveUpdateDestroyAPIView):
    """ Notification management """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    lookup_field = 'slug'
