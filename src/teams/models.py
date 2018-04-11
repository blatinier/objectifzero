from django.db import models

from users.models import User


class Team(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='team_owner')
    members = models.ManyToManyField(User, related_name='team_members')
