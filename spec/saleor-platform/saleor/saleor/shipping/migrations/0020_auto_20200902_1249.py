# Generated by Django 3.1 on 2020-09-02 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shipping", "0019_remove_shippingmethod_meta"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shippingmethod",
            name="maximum_order_price_amount",
            field=models.DecimalField(
                blank=True, decimal_places=3, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="shippingmethod",
            name="minimum_order_price_amount",
            field=models.DecimalField(
                blank=True, decimal_places=3, default=0, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="shippingmethod",
            name="price_amount",
            field=models.DecimalField(decimal_places=3, default=0, max_digits=12),
        ),
    ]
