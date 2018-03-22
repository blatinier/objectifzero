from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import user_cards.views

urlpatterns = [
    url(_(r'^$'),
        user_cards.views.UserCardView.as_view(),
        name='user_cards'),
    url(_(r'^(?P<id>.*)/$'),
        user_cards.views.UserCardRUDView.as_view(),
        name='fetch_user_card'),
]
