from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import cards.views

urlpatterns = [
    url(_(r'^list-add/$'),
        cards.views.CardListCreateView.as_view(),
        name='create_card'),
    url(_(r'^card/(?P<slug>.*)/$'),
        cards.views.CardRUDView.as_view(),
        name='fetch_card'),
]
