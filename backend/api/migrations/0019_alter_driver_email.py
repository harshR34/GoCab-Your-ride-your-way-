# Generated by Django 5.0.7 on 2024-09-20 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_driver_documentstatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='driver',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
