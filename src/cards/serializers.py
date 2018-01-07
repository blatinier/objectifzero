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
        data_stats = data.pop("stats")
        data_source = data.pop("data_source")
        sources = self.get_sources(data_source)
        stats = CardStat.objects.create(**data_stats)
        stats.data_sources.add(*sources)
        data['help_links'] = self.format_help_links(data)
        card = Card.objects.create(card_stats=stats,
                                   slug=slugify(data['title']),
                                   **data)
        return card

    def update(self, instance, validated_data):
        data_stats = validated_data.pop("stats")
        data_source = validated_data.pop("data_source")
        validated_data['help_links'] = self.format_help_links(validated_data)
        sources = self.get_sources(data_source)
        stats = instance.card_stats

        # update card
        for field, value in validated_data.items():
            setattr(instance, field, value)
        # update stats
        for field, value in data_stats.items():
            setattr(stats, field, value)
        # update data sources
        stats.data_sources.clear()
        stats.data_sources.add(*sources)

    def get_sources(self, source_list):
        sources = []
        for data_src in source_list:
            try:
                ds = DataSource.objects.get(link=data_src['link'])
            except DataSource.DoesNotExist:
                ds = DataSource.objects.create(**data_src)
            sources.append(ds)
        return sources

    def format_help_links(self, data):
        help_links = ""
        if 'help_links' in data and data['help_links']:
            help_links = '\n'.join(data['help_links'])
        return help_links
