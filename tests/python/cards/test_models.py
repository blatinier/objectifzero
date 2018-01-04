import factory
from django.test import TestCase

from cards.models import DataSource, CardStat, Card


class DataSourceFactory(factory.DjangoModelFactory):
    class Meta:
        model = DataSource
        django_get_or_create = ('link',)


class CardStatFactory(factory.DjangoModelFactory):
    class Meta:
        model = CardStat


class CardFactory(factory.DjangoModelFactory):
    class Meta:
        model = Card


class CardsModelsTests(TestCase):
    def setUp(self):
        self.data_source = DataSourceFactory.create(name='Ademe',
                                                    link="https://pipo.lala.com",
                                                    status='VERIFIED')

    def test_unicode(self):
        self.assertEqual(str(self.data_source), '<DataSource Ademe:VERIFIED>')
