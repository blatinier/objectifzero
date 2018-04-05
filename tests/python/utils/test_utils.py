from django.test import TestCase

from lib.utils import validate_email


class BaseTests(TestCase):
    def test_validate_email(self):
        self.assertEqual(validate_email('fail'), False)
        self.assertEqual(validate_email(''), False)
