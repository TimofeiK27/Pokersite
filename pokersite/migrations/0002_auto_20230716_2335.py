# Generated by Django 3.2.6 on 2023-07-17 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokersite', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='hours',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='user',
            name='sessions',
            field=models.IntegerField(default=1),
        ),
    ]
