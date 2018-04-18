from django.urls import path
from django.utils.translation import ugettext_lazy as _

from notifications.views import NotificationListCreateView, NotificationRUDView


urlpatterns = [
    path(_('list-add/'),
         NotificationListCreateView.as_view(),
         name='create_notifications'),
    path(_('<action>/<slug:slug>/'),
         NotificationRUDView.as_view(),
         name='update_notification'),
]
