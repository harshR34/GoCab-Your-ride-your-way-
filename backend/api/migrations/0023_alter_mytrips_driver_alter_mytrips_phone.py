# Generated by Django 5.0.7 on 2024-09-20 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_mytrips_driver_mytrips_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mytrips',
            name='driver',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='mytrips',
            name='phone',
            field=models.CharField(blank=True, max_length=13),
        ),
    ]
