from rest_framework import status
from rest_framework.test import APITestCase

from accounts.serializers import UserRegistrationSerializer, UserSerializer
from lib.testutils import CustomTestCase
from tests.python.accounts.test_models import UserFactory


class UserRegistrationSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': {'email': 'test1@mailinator.com',
                  'password': 'test',
                  'username': 'test user 1'},
         'error': ('email', ['Please use a different email address provider.']),
         'label': 'Invalid email.',
         'method': 'POST',
         'status': status.HTTP_400_BAD_REQUEST
         },

        {'data': {'email': 'test1@gmail',
                  'password': 'test',
                  'username': 'test user 2'},
         'error': ('email', ['Enter a valid email address.']),
         'label': 'Bad email format.',
         'method': 'POST',
         'status': status.HTTP_400_BAD_REQUEST
         },
    ]
    VALID_DATA_DICT = [
        {'email': 'emailsuccess@gmail.com',
         'password': 'test',
         'username': 'test user 3'},
    ]

    def setUp(self):
        self.required_fields = ['email', 'password', 'username']
        self.not_required_fields = ['id']
        self.user = UserFactory.create(email='emailwilllogininserializer@mydomain.com',
                                       username='test serializers user')

    def test_fields(self):
        serializer = UserRegistrationSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = UserRegistrationSerializer
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_validate_success(self):
        serializer = UserRegistrationSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)
