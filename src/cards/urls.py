from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import cards.views

urlpatterns = [
    url(_(r'^user_cards/$'),
        cards.views.UserCardView.as_view(),
        name='user_cards'),
    url(_(r'^list/$'),
        cards.views.ListCardsView.as_view(),
        name='list_cards'),
    url(_(r'^list-add/$'),
        cards.views.CardListCreateView.as_view(),
        name='create_card'),
    url(_(r'^card/(?P<slug>.*)/$'),
        cards.views.CardRUDView.as_view(),
        name='fetch_card'),
]
