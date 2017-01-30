from django.shortcuts import render
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
from django.utils import timezone
import json


@csrf_exempt
def order_placed(request):
	if request.method=='GET':
		order_id=request.GET.get('order_id')
		order_details=order_data.objects.get(order_id=order_id)
		order_products_list=order_details_data.filer(order_id=order_id)
		response_data=''
		response_data+='<h1>Order Placed</h1><br><h2>Order Id - '+order_id+'</h2><br><h2>Mobile - '+order_details.mobile+'</h2>'
		response_data+='<br><h2>Name - '+order_details.name+'</h2><br>'
		response_data+='<table style="width:100%"><tr><th>Product Name</th><th>Quantity</th><th>Product Price</th></tr>'
  		for o in order_products_list:
  			response_data+='<tr><td>'+o.name+'</td>'
    		response_data+='<td>'+o.quantity+'</td>' 
    		response_data+='<td>'+o.price+'</td></tr>'
		response_data+='</table>'
		return render(request,"order_placed/order_placed",{"response_data":response_data})
	else:
		return JsonResponse({"success":True,"message":"I am a big hacker Out here. Go back or I will hack into your life."})