from django.urls import path
from django.utils.translation import ugettext_lazy as _

import users.views

urlpatterns = [
    path(_('register/'),
         users.views.UserRegisterView.as_view(),
         name='register'),
    path(_('login/'),
         users.views.UserLoginView.as_view(),
         name='login'),
    path(_('confirm/email/<str:activation_key>/'),
         users.views.UserConfirmEmailView.as_view(),
         name='confirm_email'),
    path(_('status/email/'),
         users.views.UserEmailConfirmationStatusView.as_view(),
         name='status'),
    path(_('profile/'),
         users.views.UserProfileView.as_view(),
         name='profile'),
    path(_('list-add/'),
         users.views.UserListCreateView.as_view(),
         name='list_add'),
    path(_('user/<str:username>/'),
         users.views.UserRUDView.as_view(),
         name='fetch_user'),
]
