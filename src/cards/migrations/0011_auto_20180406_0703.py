# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-04-06 07:03
from __future__ import unicode_literals

import base.custom_models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0010_auto_20180330_0942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='cost_score',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='difficulty_score',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='waste_reduction_score',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True),
        ),
    ]
