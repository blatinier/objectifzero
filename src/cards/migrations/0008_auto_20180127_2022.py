# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-27 20:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0007_auto_20180104_0159'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usercard',
            name='card',
        ),
        migrations.RemoveField(
            model_name='usercard',
            name='user',
        ),
        migrations.DeleteModel(
            name='UserCard',
        ),
    ]