# Generated by Django 5.0.7 on 2024-08-25 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_document_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='user',
            field=models.CharField(max_length=100),
        ),
    ]
