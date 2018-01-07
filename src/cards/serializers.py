from django.utils.text import slugify
from rest_framework import serializers

from cards.models import Card, CardStat, DataSource


class CardShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('slug', 'title', 'description',
                  'waste_reduction_score', 'difficulty_score',
                  'cost_score', 'image')


class DataSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSource
        fields = ('name', 'link', 'status')


class CardStatSerializer(serializers.ModelSerializer):
    data_sources = DataSourceSerializer(many=True)

    class Meta:
        model = CardStat
        fields = ('waste_reduction', 'co2_reduction',
                  'water_use_reduction', 'status',
                  'year', 'data_sources')


class CardSerializer(serializers.ModelSerializer):
    card_stats = CardStatSerializer()

    class Meta:
        model = Card
        fields = ('slug', 'title', 'description',
                  'waste_reduction_score', 'difficulty_score',
                  'cost_score', 'image', 'card_stats',
                  'help_links')

    def create(self, data):
        sources = []
        data_source = data.pop(data_source)
        for data_src in data_source:
            try:
                ds = DataSource.objects.get(link=data_src['data_source_link'])
            except DataSource.DoesNotExist:
                ds = DataSource.objects.create(link=data_src['data_source_link'],
                                               name=data_src['data_source_name'],
                                               status=data_src['data_source_status'])
            sources.append(ds)

        data_stats = data.pop("stats")
        stats = CardStat.objects.create(**data_stats)
        stats.data_sources.add(*sources)
        help_links = ""
        if 'help_links' in data and data['help_links']:
            help_links = '\n'.join(data['help_links'])
        data['help_links'] = help_links
        card = Card.objects.create(card_stats=stats,
                                   slug=slugify(data['title']),
                                   **data)
        return card

    def update(self, instance, validated_data):
        pass
