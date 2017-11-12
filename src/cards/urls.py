from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import cards.views

urlpatterns = [
    url(_(r'^user_cards/$'),
        cards.views.UserCardView.as_view(),
        name='user_cards'),
]
