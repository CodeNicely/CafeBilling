from django.contrib import admin
from .models import *
from django import forms
# Register your models here.
class product_dataAdmin(admin.ModelAdmin):
    list_display=["id","name","price","category","modified"]
    fields=["name","price","category"]
admin.site.register(product_data,product_dataAdmin)


class ItemInline(admin.StackedInline):
    model = product_data
    fields = ['name','price','order']

class CategoryForm(forms.ModelForm):
    model = category_data
    class Media:
        js = (
            '/static/js/jquery-latest.js',
            '/static/js/jquery-ui.js',
            '/static/js/menu-sort.js',
        )

class category_data_Admin(admin.ModelAdmin):
     list_display=["category"]

admin.site.register(category_data,category_data_Admin,
    inlines = [ItemInline],
    form = CategoryForm,
)