from django.conf import settings
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.decorators.cache import cache_page

from base.views import IndexView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include(('users.urls', 'users'), namespace='users')),
    path('api/v1/cards/', include(('cards.urls', 'cards'), namespace='cards')),
    path('api/v1/user_cards/', include(('user_cards.urls', 'user_cards'), namespace='user_cards')),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    re_path(r'', cache_page(settings.PAGE_CACHE_SECONDS)(IndexView.as_view()), name='index'),
]
