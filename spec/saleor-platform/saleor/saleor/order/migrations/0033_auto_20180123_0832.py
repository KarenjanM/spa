# Generated by Django 1.11.9 on 2018-01-23 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("order", "0032_orderline_is_shipping_required")]

    operations = [
        migrations.AlterField(
            model_name="orderline",
            name="is_shipping_required",
            field=models.BooleanField(),
        )
    ]
