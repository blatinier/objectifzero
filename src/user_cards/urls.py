from django.urls import path
from django.utils.translation import ugettext_lazy as _

import user_cards.views

urlpatterns = [
    path(_(''),
         user_cards.views.UserCardView.as_view(),
         name='user_cards'),
    path(_('<str:id>/'),
         user_cards.views.UserCardRUDView.as_view(),
         name='fetch_user_card'),
]
