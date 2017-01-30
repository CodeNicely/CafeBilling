from django.shortcuts import render
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
# Create your v
import json
def products_list(request):
	if request.method=="GET":
		result_array=[]
		for o in product_data.objects.all().order_by('category','order'):
			tmp={}
			tmp['id']=o.id
			tmp['name']=o.name
			tmp['category']=str(o.category)
			tmp['price']=o.price
			tmp['quantity']=0
			result_array.append(tmp)
		return HttpResponse(json.dumps(result_array), content_type = "application/json")

def place_order(request):
	return render(request,"/place_order/place_order.html",{})