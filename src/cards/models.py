import os
from django.db import models
from accounts.models import User

DATA_SOURCE_STATUS = (
    ('VERIFIED', 'Verified'),
    ('UNVERIFIED', 'Unverified')
)

STATS_STATUS = (
    ('ACTIVE', 'Active'),
    ('ARCHIVED', 'Archived')
)

CARDS_STATUS = (
    ('NOT_STARTED', 'Not started'),
    ('NOT_CONCERNED', 'Not concerned'),
    ('STARTED', 'Started'),
    ('DONE', 'Done')
)


def get_card_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('cards', str(instance.slug) + "." + ext)


class DataSource(models.Model):
    name = models.CharField(max_length=256)
    link = models.TextField(max_length=4096)
    status = models.CharField(max_length=16,
                              choices=DATA_SOURCE_STATUS,
                              default='UNVERIFIED')


class CardStat(models.Model):
    waste_reduction = models.DecimalField(decimal_places=1,
                                          max_digits=6)
    co2_reduction = models.DecimalField(decimal_places=1,
                                        max_digits=6)
    water_use_reduction = models.DecimalField(decimal_places=1,
                                              max_digits=6)
    status = models.CharField(max_length=16,
                              choices=STATS_STATUS,
                              default='ACTIVE')
    year = models.SmallIntegerField()
    data_sources = models.ManyToManyField(DataSource)


class Card(models.Model):
    slug = models.SlugField(max_length=1024)
    title = models.CharField(max_length=1024)
    description = models.TextField()
    image = models.ImageField(upload_to=get_card_image_path,
                              blank=True,
                              null=True)

    card_stats = models.ForeignKey(CardStat, blank=True,
                                   null=True)
    # Scores
    waste_reduction_score = models.PositiveSmallIntegerField()
    difficulty_score = models.PositiveSmallIntegerField()
    cost_score = models.SmallIntegerField()

    # External links
    help_links = models.TextField(blank=True, null=True)


class UserCard(models.Model):
    user = models.ForeignKey(User)
    card = models.ForeignKey(Card)
    status = models.CharField(max_length=16,
                              choices=CARDS_STATUS,
                              default='NOT_STARTED')
