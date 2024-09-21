# Generated by Django 5.0.7 on 2024-08-25 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_document_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='user',
        ),
        migrations.AddField(
            model_name='document',
            name='email',
            field=models.EmailField(default=1, max_length=254),
            preserve_default=False,
        ),
    ]
