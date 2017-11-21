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
    data_sources = models.ForeignKey(DataSource)

    def dump(self):
        return {'waste_reduction': self.waste_reduction,
                'co2_reduction': self.co2_reduction,
                'water_use_reduction': self.water_use_reduction,
                'year': self.year,
                'data_source': self.data_sources.dump()}


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

    def short_dump(self):
        card_data = {
            'slug': self.slug,
            'title': self.title,
            'description': self.description,
            'waste_reduction_score': self.waste_reduction_score,
            'difficulty_score': self.difficulty_score,
            'cost_score': self.cost_score}
        if self.image and hasattr(self.image, 'url'):
            card_data['image'] = self.image
        return card_data

    def dump(self):
        card_data = self.short_dump()
        card_data.update({
            'help_links': self.help_links,
        })
        if self.card_stats:
            card_data.update({
                'stats': self.card_stats.dump(),
            })
        return card_data


class UserCard(models.Model):
    user = models.ForeignKey(User)
    card = models.ForeignKey(Card)
    status = models.CharField(max_length=16,
                              choices=CARDS_STATUS,
                              default='NOT_STARTED')

    def dump(self, short=False):
        if short:
            card = self.card.short_dump()
        else:
            card = self.card.dump()
        card['status'] = self.status
        return card
