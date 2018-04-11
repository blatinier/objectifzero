from knox.auth import TokenAuthentication
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from notifications.models import Notification
from notifications.serializers import NotificationSerializer


class NotificationListView(ListAPIView):
    """ List notifications """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.get_queryset().order_by('-created_at')
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )


class NotificationRUDView(RetrieveUpdateDestroyAPIView):
    """ Notification management """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    lookup_field = 'slug'
