from rest_framework import serializers
from users.models import UserCard
from users.serializers import UserSerializer
from cards.serializers import CardSerializer


class UserCardSerializer(serializers.ModelSerializer):
    card = CardSerializer()
    user = UserSerializer()

    class Meta:
        model = UserCard
        fields = ('id', 'status', 'card', 'user')

    def update(self, instance, validated_data):
        instance.status = validated_data['status']
        instance.save()
        return instance
