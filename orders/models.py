from __future__ import unicode_literals

from django.db import models

# Create your models here.
class order_data(models.Model):
    order_id=models.CharField(max_length=20,blank=True,null=True)
    name=models.CharField(max_length=20,blank=True,null=True)
    mobile=models.CharField(max_length=11,blank=True,null=True)
    branch=models.CharField(max_length=300)
    total_price=models.IntegerField(default=0)
    discount=models.IntegerField(default=0)
    total_price_discounted=models.IntegerField(default=0)
    server_backup=models.BooleanField(default=False)
    modified= models.DateTimeField(auto_now=True,auto_now_add=False)
    created= models.DateTimeField(auto_now=False,auto_now_add=True)

# class category_data(models.Model):
#     category=models.CharField(max_length=120,unique=True)
#     def __unicode__(self):
#         return str(self.category)

class order_details_data(models.Model):
    
    order_id=models.CharField(max_length=120,blank=True,null=True)
    product_id=models.IntegerField(default=0)
    name=models.CharField(max_length=120,blank=False,null=False)
    price=models.IntegerField(default=0)
    quantity=models.IntegerField(default=0)
    modified= models.DateTimeField(auto_now=True,auto_now_add=False)
    created= models.DateTimeField(auto_now=False,auto_now_add=True)


class KEYS_LIST(models.Model):
    key=models.CharField(max_length=120,unique=True)
    def __unicode__(self):
        return str(self.key)

class KEYS(models.Model):
    key=models.ForeignKey(KEYS_LIST,to_field='key')
    value=models.CharField(max_length=120,blank=True,null=True)

class CUSTOM(models.Model):
    key=models.ForeignKey(KEYS_LIST,to_field='key')
    value=models.CharField(max_length=120,blank=True,null=True)