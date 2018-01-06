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
    url(_(r'^add/$'),
        cards.views.CreateCardView.as_view(),
        name='create_card'),
    url(_(r'^delete/(?P<card_slug>.*)/$'),
        cards.views.DeleteCardView.as_view(),
        name='delete_card'),
    url(_(r'^card/(?P<card_slug>.*)/$'),
        cards.views.CardView.as_view(),
        name='fetch_card'),
]
