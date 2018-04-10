# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def migrate_scores(apps, schema_editor):
    Cards = apps.get_model('cards', 'Card')
    for card in Cards.objects.all():
       card.waste_reduction_score /= 2
       card.difficulty_score /= 2
       card.cost_score /= 2
       card.save()


def reverse_migration(apps, schema_editor):
    Cards = apps.get_model('cards', 'Card')
    for card in Cards.objects.all():
       card.waste_reduction_score *= 2
       card.difficulty_score *= 2
       card.cost_score *= 2
       card.save()


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0011_auto_20180406_0703'),
    ]

    operations = [
        migrations.RunPython(migrate_scores, reverse_migration),
    ]
