from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import users.views

urlpatterns = [
    url(_(r'^register/$'),
        users.views.UserRegisterView.as_view(),
        name='register'),
    url(_(r'^login/$'),
        users.views.UserLoginView.as_view(),
        name='login'),
    url(_(r'^confirm/email/(?P<activation_key>.*)/$'),
        users.views.UserConfirmEmailView.as_view(),
        name='confirm_email'),
    url(_(r'^status/email/$'),
        users.views.UserEmailConfirmationStatusView.as_view(),
        name='status'),
    url(_(r'^profile/$'),
        users.views.UserProfileView.as_view(),
        name='profile'),
    url(_(r'^list-add/$'),
        users.views.UserListCreateView.as_view(),
        name='list_add'),
    url(_(r'^user/(?P<username>.*)/$'),
        users.views.UserRUDView.as_view(),
        name='fetch_user'),
]
