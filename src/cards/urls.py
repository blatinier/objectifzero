from django.urls import path
from django.utils.translation import ugettext_lazy as _

import cards.views

urlpatterns = [
    path(_('list-add/'),
         cards.views.CardListCreateView.as_view(),
         name='create_card'),
    path(_('card/<slug:slug>/'),
         cards.views.CardRUDView.as_view(),
         name='fetch_card'),
]
