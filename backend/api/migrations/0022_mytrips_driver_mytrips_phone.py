# Generated by Django 5.0.7 on 2024-09-20 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_alter_driveravailability_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='mytrips',
            name='driver',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mytrips',
            name='phone',
            field=models.CharField(default=2, max_length=13),
            preserve_default=False,
        ),
    ]
