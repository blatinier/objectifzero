from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from notifications.views import NotificationListView, NotificationRUDView


urlpatterns = [
    url(_(r'^list/$'),
        NotificationListView.as_view(),
        name='list_notifications'),
    url(_(r'^notification/(?P<slug>.*)/$'),
        NotificationRUDView.as_view(),
        name='update_notification'),
]
