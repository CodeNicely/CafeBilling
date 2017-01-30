from django.shortcuts import render
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
import requests
from django.utils import timezone
import json
from products.models import *
# Create your views here.
def view_order(request):

	return render(request,'order_placed/view.html')
def send_orders():
	print 'sending orders'
	order_list=[]
	orders_list=order_data.objects.filter(server_backup=False)
	for o in orders_list:
		order_details={}
		order_details['order_id']=str(o.order_id)
		order_details['mobile']=str(o.mobile)
		order_details['name']=str(o.name)
		order_details['branch']=str(o.branch)
		order_details['total_price']=o.total_price
		order_details['discount']=o.discount
		order_details['total_price_discounted']=o.total_price_discounted
		order_details['created']=str(timezone.make_aware(timezone.make_naive(o.created)))
		order_details['modified']=str(timezone.make_aware(timezone.make_naive(o.modified)))
		product_data_list=order_details_data.objects.filter(order_id=o.order_id)
		products_list=[]
		for a in product_data_list:
			products_details={}
			products_details['product_id']=str(a.product_id)
			products_details['name']=str(a.name)
			products_details['price']=a.price
			products_details['quantity']=a.quantity
			products_details['modified']=str(timezone.make_aware(timezone.make_naive(a.modified)))
			products_details['created']=str(timezone.make_aware(timezone.make_naive(a.created)))
			products_list.append(products_details)
		order_details['product_list']=products_list
		order_list.append(order_details)
	payload = {}
	payload['order_list']= order_list
	payload['access_token']=KEYS.objects.get(key="access_token").value
	payload['branch']=KEYS.objects.get(key="branch").value
	url='http://sandwichjunction.codenicely.in/send_data/'
	try:
		result = requests.get(url,data=json.dumps(payload))
		result_json	= json.loads(result.text)
		print"result_json",result_json
		if result_json['success']==True:
			orders_list=order_data.objects.filter(server_backup=False)
			for o in orders_list:
				o.server_backup=True
				o.save()
			return True
		else:
			return False
			# return result
	except Exception,e:
		print e
		return False

# @csrf_exempt
# def send(request):
	
# 	if send_orders():
# 		return JsonResponse({'success':True})
# 	else:
# 		return JsonResponse({'success':False})
from threading import Thread

@csrf_exempt
def place_order(request):
	if request.method=="POST":
		#print request.body
		data=json.loads(request.body)
		discount=data['discount']

		print data
		total_price=0
		size=0
		##################################################
		for x in data['product_list']:
			try:
				print x['id']
				print x['quantity']
				size=size+1
			except:
				pass
		###################################################
		if size>0:
			branch=KEYS.objects.get(key='branch').value
			branch_id=KEYS.objects.get(key='branch_id').value
			print"81"
			order_row=order_data.objects.create(mobile=data["mobile"],branch=branch,name=data["name"])
			print"83"
			order_id=branch_id+'SJ'+str(order_row.id)

			for x in data['product_list']:
				try:
					print x['id']
					print x['quantity']
					product_row=product_data.objects.get(id=int(x['id']))
					order_details_data.objects.create(order_id=order_id,
						product_id=product_row.id,
						name=product_row.name,
						price=product_row.price,
						quantity=int(x['quantity'])
						)
					total_price+=(product_row.price)*int(x['quantity'])
				except Exception,e:
					print "@error",e
					pass
			order_row.order_id=order_id
			order_row.total_price=total_price
			order_row.discount=int(discount)
			print total_price
			print discount
			order_row.total_price_discounted=int(total_price-int((total_price*(int(discount)))/100))
			order_row.save()

			response={}
			response['success']=True
			response['order_id']=order_id
			print response
			try:
				t = Thread(target = send_orders)
				t.start()
				print 'Threading'
			except Exception,e:
				print e
		else:
			response={}
			response['success']=False
		
		print response
		return JsonResponse(response)
	return render(request,"place_order/place2.html",{})



# import string,random
# def code_generator(size=3, chars=string.ascii_uppercase + string.digits):
# 	return ''.join(random.choice(chars) for _ in range(size))

@csrf_exempt
def order_placed(request):
	if request.method=='GET':
		order_id=request.GET.get('order_id')
		order_details=order_data.objects.get(order_id=order_id)
		order_products_list=order_details_data.objects.filter(order_id=order_id)
		response_data={}
		response_data['order_id']=order_id
		response_data['mobile']=order_details.mobile
		response_data['created']=str(timezone.make_aware(timezone.make_naive(order_details.created)))[:16]
		response_data['name']=order_details.name
		response_data['total']=order_details.total_price
		response_data['discount']=order_details.discount
		response_data['total_discounted']=order_details.total_price_discounted
		response_data['branch']=KEYS.objects.get(key='branch').value
		bottom_message=CUSTOM.objects.get(key='bottom_message').value
		tin=CUSTOM.objects.get(key='tin').value
		contact_bill_1=CUSTOM.objects.get(key='contact_bill_1').value
		contact_bill_2=CUSTOM.objects.get(key='contact_bill_2').value

		products_list=[]
  		for o in order_products_list:
  			products_details={}
  			products_details["name"]=str(o.name)
  			products_details["quantity"]=o.quantity
  			products_details["price"]=o.price
  			products_list.append(products_details)
  		response_data['product_list']=products_list
  		print response_data
  		data = json.dumps(response_data)
  		print response_data
  		result_data={}
  		result_data['result_data']=data
		return render(request,"order_placed/order_placed.html",{"result_data":data,"tin":tin,"contact_bill_1":contact_bill_1,"contact_bill_2":contact_bill_2,"bottom_message":bottom_message})
	else:
		return JsonResponse({"success":True,"message":"I am a big hacker Out here. Go back or I will hack into your life."})
