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
    data_sources = DataSourceSerializer(many=True, required=False)

    class Meta:
        model = CardStat
        fields = ('waste_reduction', 'co2_reduction',
                  'water_use_reduction', 'status',
                  'year', 'data_sources')


class CardSerializer(serializers.ModelSerializer):
    card_stats = CardStatSerializer()
    slug = serializers.CharField(required=False)
    help_links = serializers.ListField(
            child=serializers.CharField(),
            required=False
            )

    class Meta:
        model = Card
        fields = ('slug', 'title', 'description',
                  'waste_reduction_score', 'difficulty_score',
                  'cost_score', 'card_stats', 'help_links', 'published')

    def create(self, data):
        data_stats = data.pop("card_stats", {})
        data_sources = data_stats.pop("data_sources", [])
        sources = self.get_sources(data_sources)
        stats = CardStat.objects.create(**data_stats)
        stats.data_sources.add(*sources)
        card = Card.objects.create(card_stats=stats,
                                   slug=slugify(data['title']),
                                   **data)
        return card

    def update(self, instance, validated_data):
        data_stats = validated_data.pop("card_stats", {})
        data_sources = data_stats.pop("data_sources", [])
        sources = self.get_sources(data_sources)
        stats = instance.card_stats

        # update card
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.slug = slugify(instance.title)
        instance.save()
        # update stats
        for field, value in data_stats.items():
            setattr(stats, field, value)
        stats.save()
        # update data sources
        stats.data_sources.clear()
        stats.data_sources.add(*sources)
        return instance

    def get_sources(self, source_list):
        sources = []
        for data_src in source_list:
            try:
                ds = DataSource.objects.get(**data_src)
            except DataSource.DoesNotExist:
                ds = DataSource.objects.create(**data_src)
            sources.append(ds)
        return sources
