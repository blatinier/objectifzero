from django.urls import reverse
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from tests.python.users.test_models import UserFactory
from tests.python.users.test_views import get_basic_auth_header


@override_settings(CELERY_EAGER_PROPAGATES_EXCEPTIONS=True, CELERY_ALWAYS_EAGER=True, BROKER_BACKEND='memory')
class BaseTests(APITestCase):
    def setUp(self):
        self.user = UserFactory.create(email='emailwilllogin@mydomain.com')
        self.user.set_password('test')
        self.user.save()

    def test_get_protected_page(self):
        # Ensure we can login with given credentials.
        url = reverse('users:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response.data['token']))

    def test_get_main_page(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
