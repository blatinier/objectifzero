# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-21 01:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0003_auto_20171113_0118'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardStat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('waste_reduction', models.DecimalField(decimal_places=1, max_digits=6)),
                ('co2_reduction', models.DecimalField(decimal_places=1, max_digits=6)),
                ('water_use_reduction', models.DecimalField(decimal_places=1, max_digits=6)),
                ('status', models.CharField(choices=[('ACTIVE', 'Active'), ('ARCHIVED', 'Archived')], default='ACTIVE', max_length=16)),
                ('year', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='DataSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('link', models.TextField(max_length=4096)),
                ('status', models.CharField(choices=[('VERIFIED', 'Verified'), ('UNVERIFIED', 'Unverified')], default='UNVERIFIED', max_length=16)),
            ],
        ),
        migrations.RemoveField(
            model_name='card',
            name='waste_reduction',
        ),
        migrations.AlterField(
            model_name='usercard',
            name='status',
            field=models.CharField(choices=[('NOT_STARTED', 'Not started'), ('NOT_CONCERNED', 'Not concerned'), ('STARTED', 'Started'), ('DONE', 'Done')], default='NOT_STARTED', max_length=16),
        ),
        migrations.AddField(
            model_name='cardstat',
            name='data_sources',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cards.DataSource'),
        ),
        migrations.AddField(
            model_name='card',
            name='card_stats',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cards.CardStat'),
        ),
    ]
