import pytest
from rest_framework.test import APITestCase
from lib.testutils import CustomTestCase
from tests.python.accounts.test_models import UserFactory


@pytest.mark.django_db
class BaseTestView(CustomTestCase, APITestCase):

    @pytest.fixture(autouse=True)
    def setup_user(self):
        self.user = UserFactory.create(email='pipo@pouet.com',
                                       username='pipo',
                                       gender='M',
                                       has_garden=False,
                                       do_smoke=False,
                                       home_owner=False)
        self.user.set_password('test')
        self.user.save()

        self.staff_user = UserFactory.create(email='pipo_staff@pouet.com',
                                             username='pipo Staff',
                                             gender='M',
                                             has_garden=False,
                                             do_smoke=False,
                                             home_owner=False,
                                             is_staff=True)
        self.staff_user.set_password('test_staff')
        self.staff_user.save()
