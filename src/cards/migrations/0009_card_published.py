# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-03-22 13:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0008_auto_20180127_2022'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='published',
            field=models.BooleanField(default=False, verbose_name='published'),
        ),
    ]
