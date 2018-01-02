from rest_framework import serializers

from cards.models import Card


class CardShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('slug', 'title', 'description',
                  'waste_reduction_score', 'difficulty_score',
                  'cost_score', 'image')
