from copy import deepcopy
from django.core.urlresolvers import reverse
from rest_framework import status

from tests.python.base_test_view import BaseTestView

from cards.models import Card, CardStat, DataSource
from accounts.models import UserCard
from .test_models import CardFactory, CardStatFactory, DataSourceFactory


class CardsTests(BaseTestView):
    POST_DATA_CARD = {
        "title": "test title",
        "description": "Card to be created",
        "image":  None,
        "waste_reduction_score": 3,
        "difficulty_score": 4,
        "cost_score": 7,
        "help_links": "help link 1\nhelp link 2",
        "card_stats": {
            "waste_reduction": 78,
            "co2_reduction": 56,
            "water_use_reduction": 46,
            "stat_status": "ACTIVE",
            "year": 2010,
            "data_sources": [
                {"name": "Source1",
                 "link": "LinkToSource",
                 "status": "VERIFIED"},
                {"name": "Source2",
                 "link": "LinkToSource2",
                 "status": "UNVERIFIED"}
            ]
        }
    }

    CARD_DATA = {
        'slug': 'sample-card',
        'title': 'Sample Card',
        'description': 'Some random text but not so random...',
        'waste_reduction_score': 9,
        'difficulty_score': 7,
        'cost_score': 4,
        'help_links': """https://link1.pipo.com
https://link2.pouet.org"""
    }

    CARD_STATS_DATA = {
        'waste_reduction': 30,
        'co2_reduction': 10,
        'water_use_reduction': 9,
        'status': 'ACTIVE',
        'year': 2009
    }

    DATA_SOURCES_DATA = [
        {'link': 'https://pipo.com', 'name': 'PipoCorp', 'status': 'VERIFIED'},
        {'link': 'https://pouet.com', 'name': 'PouetCorp', 'status': 'UNVERIFIED'}
    ]

    def setUp(self):
        self.sources = []
        for ds in self.DATA_SOURCES_DATA:
            ds_obj = DataSourceFactory.create(**ds)
            self.sources.append(ds_obj)
        self.stat = CardStatFactory.create(**self.CARD_STATS_DATA)
        self.stat.data_sources.add(*self.sources)
        self.card = CardFactory.create(card_stats=self.stat, **self.CARD_DATA)

    def test_create_edit_card_view(self):
        url = reverse('cards:create_card')
        self.client.force_authenticate(user=self.staff_user)
        response = self.client.post(url, self.POST_DATA_CARD, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        card = Card.objects.get(slug='test-title')
        self.assertEqual('test title', card.title)
        self.assertEqual('help link 1\nhelp link 2', card.help_links)
        self.assertEqual(2010, card.card_stats.year)
        self.assertEqual("Source1", card.card_stats.data_sources.all()[0].name)
        self.assertEqual("Source2", card.card_stats.data_sources.all()[1].name)
        # TODO test edit
        url_edit = reverse('cards:fetch_card', kwargs={'slug': 'test-title'})
        put_data = deepcopy(self.POST_DATA_CARD)
        put_data['title'] = "test title edited"
        put_data['help_links'] = "help link 1\nhelp link 2\nhelp link 3"
        put_data['card_stats']['year'] = 2000
        put_data['card_stats']['data_sources'] = [{"name": "SourceEdit1",
                                                   "link": "linkedit1",
                                                   "status": "VERIFIED"}]
        response = self.client.put(url_edit, put_data, format='json')
        with self.assertRaises(Card.DoesNotExist):
            Card.objects.get(slug='test-title')
        card = Card.objects.get(slug='test-title-edited')
        self.assertEqual('test title edited', card.title)
        self.assertEqual('help link 1\nhelp link 2\nhelp link 3', card.help_links)
        self.assertEqual(2000, card.card_stats.year)
        self.assertEqual("SourceEdit1", card.card_stats.data_sources.all()[0].name)

    def test_help_link_not_required(self):
        url = reverse('cards:create_card')
        self.client.force_authenticate(user=self.staff_user)
        post_data = deepcopy(self.POST_DATA_CARD)
        del post_data['help_links']
        post_data['title'] = "Test no help links"
        response = self.client.post(url, post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        card = Card.objects.get(slug='test-no-help-links')
        self.assertIsNone(card.help_links)

    def test_delete_card_view(self):
        url_create = reverse('cards:create_card')
        self.client.force_authenticate(user=self.staff_user)
        self.client.post(url_create, self.POST_DATA_CARD, format='json')
        # Fetch card to ensure it exists
        card = Card.objects.get(slug='test-title')
        url = reverse('cards:fetch_card', kwargs={'slug': 'test-title'})
        self.client.delete(url)
        with self.assertRaises(Card.DoesNotExist):
            Card.objects.get(slug='test-title')
        self.assertEqual(1, Card.objects.count())
        self.assertEqual(1, CardStat.objects.count())
        url = reverse('cards:fetch_card', kwargs={'slug': 'NOP'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
