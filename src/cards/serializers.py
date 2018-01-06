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
