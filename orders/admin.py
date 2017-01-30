from django.contrib import admin
from .models import *

class order_dataAdmin(admin.ModelAdmin):
   list_display=["order_id","branch","mobile","total_price","total_price_discounted","created","modified"]
admin.site.register(order_data,order_dataAdmin)

class order_details_dataAdmin(admin.ModelAdmin):
   list_display=["order_id","product_id","name","price","quantity","created","modified"]
admin.site.register(order_details_data,order_details_dataAdmin)

class KEYS_Admin(admin.ModelAdmin):
   list_display=["key","value"]
admin.site.register(KEYS,KEYS_Admin)

class CUSTOM_Admin(admin.ModelAdmin):
   list_display=["key","value"]
admin.site.register(CUSTOM,CUSTOM_Admin)

class KEYS_LIST_Admin(admin.ModelAdmin):
   list_display=["key"]
admin.site.register(KEYS_LIST,KEYS_LIST_Admin)
