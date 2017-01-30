from __future__ import unicode_literals

from django.db import models

# Create your models here.

	
class category_data(models.Model):
	category=models.CharField(max_length=120,unique=True)
	created= models.DateTimeField(auto_now=False,auto_now_add=True,null=True)
	def __unicode__(self):
		return str(self.category)
class product_data(models.Model):
	category=models.ForeignKey(category_data)
	name=models.CharField(max_length=120,blank=False,null=False)
	price=models.IntegerField(default=0)
	modified= models.DateTimeField(auto_now=True,auto_now_add=False)
	created= models.DateTimeField(auto_now=False,auto_now_add=True)
	order=models.IntegerField(default=0)
	
