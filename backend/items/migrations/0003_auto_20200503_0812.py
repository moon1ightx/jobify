# Generated by Django 3.0.3 on 2020-05-03 08:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_quiz_test'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='stack',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='items.Stack'),
        ),
    ]