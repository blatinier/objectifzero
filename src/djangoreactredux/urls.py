from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.cache import cache_page

from base.views import IndexView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/cards/', include('cards.urls', namespace='cards')),
    url(r'^api/v1/user_cards/', include('user_cards.urls', namespace='user_cards')),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
