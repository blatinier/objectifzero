# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def migrate_help_links(apps, schema_editor):
    Cards = apps.get_model("cards", "Card")
    for card in Cards.objects.all():
        new_value = card.help_links.splitlines()
        card.help_links = new_value
        card.save()


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0009_card_published'),
    ]

    operations = [
        migrations.RunPython(migrate_help_links),
    ]
