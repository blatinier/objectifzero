from django.db import models

from users.models import User

NOTIFICATION_STATUSES = (
    ('PENDING', 'Pending'),
    ('ACCEPTED', 'Accepted'),
    ('REJECTED', 'Rejected'),
)

class Notification(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,
                                   related_name='notification_created_by')
    destination_user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=1024)
    status = models.CharField(max_length=16, choices=NOTIFICATION_STATUSES,
                              default='PENDING', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def accept(self):
        self.status = 'ACCEPTED'
        user1 = self.created_by
        user2 = self.destination_user
        user1.friends.add(user2)
        user2.friends.add(user1)
        user1.save()
        user2.save()
        self.save()

    def reject(self):
        self.status = 'REJECTED'
        self.save()
