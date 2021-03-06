import uuid

import base64
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lib.testutils import CustomTestCase
from tests.python.users.test_serializers import UserRegistrationSerializerTest
from .test_models import UserFactory


def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(('%s:%s' % (username, password)).encode('ascii')).decode()


class AccountTests(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': {'email': 'emailwilllogin@mydomain.com',
                  'password': 'teste',
                  'username': 'test views user 1'},
         'error': ('non_field_errors', ['Unable to login with provided credentials.']),
         'label': 'Invalid login credentials.',
         'method': 'POST',
         'status': status.HTTP_401_UNAUTHORIZED
         },
    ]
    VALID_DATA_DICT = [
        {'email': 'emailwilllogin@mydomain.com', 'password': 'test',
         'username': 'test views user 2'},
    ]

    def setUp(self):
        self.user = UserFactory.create(email='emailwilllogin@mydomain.com',
                                       username="test views user 3")
        self.user.set_password('test')
        self.user.save()
        self.user_2 = UserFactory.create(email='emailwilllogininserializer@mydomain.com',
                                         username="test views user 4")

    def test_account_register_unsuccessful(self):
        self.assert_invalid_data_response(invalid_data_dicts=UserRegistrationSerializerTest.INVALID_DATA_DICT,
                                          url=reverse('users:register'))

    def test_account_login_unsuccessful(self):
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'wrong'))
        response = self.client.post(reverse('users:login'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_account_register_successful(self):
        url = reverse('users:register')
        data = {
            'email': 'emailsuccess@mydomain.com',
            'username': 'test views user 5',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        url_login = reverse('users:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response_login = self.client.post(url_login, format='json')
        self.assertTrue('token' in response_login.data)
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response_login.data['token']))

    def test_account_register_email_already_exists(self):
        url = reverse('users:register')
        data = {
            'email': 'emailsuccess@mydomain.com',
            'username': 'test views user 6',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        url_login = reverse('users:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response_login = self.client.post(url_login, format='json')
        self.assertTrue('token' in response_login.data)
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)

        url = reverse('users:register')
        data = {
            'email': 'emailsuccess@mydomain.com',
            'username': 'test views user 7',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'], ['Email already in use, please use a different email address.'])

    def test_account_login_successful_and_perform_actions(self):
        # Ensure we can login with given credentials.
        url = reverse('users:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response.data['token']))

        # user confirmed account unsuccessfully
        url = reverse('users:status')
        response = self.client.get(url)
        self.assertEqual(response.data['status'], False)

    def test_account_confirm_email_unsuccessful(self):
        # wrong activation key
        invalid_data = {'status': status.HTTP_404_NOT_FOUND, 'method': 'GET', 'data': {}, 'label': 'Not found'}
        self.assert_invalid_data_response(url=reverse('users:confirm_email', args=[str(uuid.uuid4())]),
                                          invalid_data_dicts=[invalid_data])

    def test_account_confirm_email_successful(self):
        user = UserFactory.create(email='emailtoconfirm@mydomain.com',
                                  confirmed_email=False)

        # confirm email successful
        url = reverse('users:confirm_email', args=[str(user.activation_key)])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # email already confirmed
        url = reverse('users:confirm_email', args=[str(user.activation_key)])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_account_profile_view_update(self):
        url_profile = reverse('users:profile')
        url_login = reverse('users:login')
        # Login
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response_login = self.client.post(url_login, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response_login.data['token']))

        # Tests
        response_profile = self.client.get(url_profile, format='json')
        prof = response_profile.data
        self.assertFalse(prof['has_garden'])
        self.assertFalse(prof['home_owner'])
        self.assertFalse(prof['do_smoke'])
        self.assertEqual('M', prof['gender'])

        data = {
            'gender': 'F',
            'has_garden': True,
            'do_smoke': True,
            'home_owner': True
        }
        self.client.post(url_profile, data, format='json')
        response_profile = self.client.get(url_profile, format='json')
        prof = response_profile.data
        self.assertTrue(prof['has_garden'])
        self.assertTrue(prof['home_owner'])
        self.assertTrue(prof['do_smoke'])
        self.assertEqual('F', prof['gender'])
