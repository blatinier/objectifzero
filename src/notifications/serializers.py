from django.utils.text import slugify
from rest_framework import serializers

from notifications.models import Notification
from users.serializers import UserSerializer


class NotificationSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    destination_user = UserSerializer()
    slug = serializers.CharField(required=False)

    class Meta:
        model = Notification
        fields = ('created_by', 'destination_user', 'slug', 'status')

    def create(self, data):
        notification = Notification.objects.create(
                slug=slugify(data['destination_user']), **data)
        return notification

    def update(self, instance, validated_data):
        import ipdb; ipdb.set_trace()
        instance.slug = slugify(instance.destination_user)
        instance.save()
        # /!\ UPDATE FRIENDS USER
        return instance
