import factory
from django.test import TestCase

from accounts.models import User


class UserFactory(factory.DjangoModelFactory):
    is_active = True

    class Meta:
        model = User
        django_get_or_create = ('email',)


class AccountsModelsTests(TestCase):
    def setUp(self):
        self.user = UserFactory.create(email='test@test.com',
                                       username="pipo")

    def test_unicode(self):
        self.assertEqual(str(self.user), 'test@test.com')
        self.assertEqual(self.user.get_short_name(), 'pipo')

    def test_super_user(self):
        super_user = User.objects.create_superuser(email='email@test.com')
        self.assertEqual(super_user.is_superuser, True)

    def test_user(self):
        user = User.objects.create_user(email='email@test.com',
                                        password='test')
        self.assertEqual(user.is_superuser, False)
