import os
from django.db import models
from django.utils.translation import ugettext_lazy as _

from base.custom_models import ListField

DATA_SOURCE_STATUS = (
    ('VERIFIED', 'Verified'),
    ('UNVERIFIED', 'Unverified')
)

STATS_STATUS = (
    ('ACTIVE', 'Active'),
    ('ARCHIVED', 'Archived')
)


def get_card_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('cards', str(instance.slug) + "." + ext)


class DataSource(models.Model):
    name = models.CharField(max_length=256, blank=True, null=True)
    link = models.TextField(max_length=4096, blank=True, null=True)
    status = models.CharField(max_length=16,
                              choices=DATA_SOURCE_STATUS,
                              default='UNVERIFIED', blank=True, null=True)

    def __str__(self):
        return "<DataSource {name}:{status}>".format(name=self.name,
                                                     status=self.status)


class CardStat(models.Model):
    waste_reduction = models.DecimalField(decimal_places=1, max_digits=6,
                                          blank=True, null=True)
    co2_reduction = models.DecimalField(decimal_places=1, max_digits=6,
                                        blank=True, null=True)
    water_use_reduction = models.DecimalField(decimal_places=1, max_digits=6,
                                              blank=True, null=True)
    status = models.CharField(max_length=16, choices=STATS_STATUS,
                              default='ACTIVE', blank=True, null=True)
    year = models.SmallIntegerField(blank=True, null=True)
    data_sources = models.ManyToManyField(DataSource)


class Card(models.Model):
    slug = models.SlugField(max_length=1024)
    title = models.CharField(max_length=1024)
    description = models.TextField()
    image = models.ImageField(upload_to=get_card_image_path,
                              blank=True,
                              null=True)

    card_stats = models.ForeignKey(CardStat, blank=True, null=True,
                                   on_delete=models.PROTECT)
    # Scores
    waste_reduction_score = models.PositiveSmallIntegerField()
    difficulty_score = models.PositiveSmallIntegerField()
    cost_score = models.SmallIntegerField()

    # External links
    help_links = ListField(blank=True, null=True)

    published = models.BooleanField(_('published'), default=False)

    def delete(self, using=None):
        super().delete(using)
        self.card_stats.delete()
