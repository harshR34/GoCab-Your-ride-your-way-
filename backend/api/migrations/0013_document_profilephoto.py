# Generated by Django 5.0.7 on 2024-09-12 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_document_profilephoto'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='profilePhoto',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]
