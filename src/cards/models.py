import os
from django.db import models
from accounts.models import User

CARDS_STATUS = (
    ('NOT_STARTED', 'Not started'),
    ('NOT_CONCERNED', 'Not concerned'),
    ('STARTED', 'Started'),
    ('DONE', 'Done')
)


def get_card_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('cards', str(instance.slug) + "." + ext)


class Card(models.Model):
    slug = models.SlugField(max_length=1024)
    title = models.CharField(max_length=1024)
    description = models.TextField()
    image = models.ImageField(upload_to=get_card_image_path,
                              blank=True,
                              null=True)

    # Estimated waste reduction in kg/year
    waste_reduction = models.DecimalField(decimal_places=1,
                                          max_digits=6)
    # Scores
    waste_reduction_score = models.PositiveSmallIntegerField()
    difficulty_score = models.PositiveSmallIntegerField()
    cost_score = models.PositiveSmallIntegerField()

    # External links
    sources = models.TextField(blank=True, null=True)
    help_links = models.TextField(blank=True, null=True)

    def dump(self):
        return {
            'slug': self.slug,
            'title': self.title,
            'description': self.description,
            'image': self.image,
            'waste_reduction': self.waste_reduction,
            'waste_reduction_score': self.waste_reduction_score,
            'difficulty_score': self.difficulty_score,
            'cost_score': self.cost_score,
            'sources': self.sources,
            'help_links': self.help_links,
        }


class UserCard(models.Model):
    user = models.ForeignKey(User)
    card = models.ForeignKey(Card)
    status = models.CharField(max_length=50,
                              choices=CARDS_STATUS,
                              default='NOT_STARTED')

    def dump(self):
        card = self.card.dump()
        card['status'] = self.status
        return card
