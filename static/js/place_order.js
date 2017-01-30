
var tmp_str="";
var i=1;

$(document).ready(function(){

  //////////////////////////////////////////////////////////////////////////////////////////////////

function validate(){

  if(document.getElementById("name").value=="")
    {custom_alert("Name must be filled");
      return false}
  if(document.getElementById("mobile").value.length!=10)
  {custom_alert("Mobile must only have 10 digits");return false}
  if(document.getElementById("discount").value>10)
      {custom_alert("Discount cannot be more than 10%");return false}
  if(document.getElementById("discount").value<0)
      {custom_alert("Discount cannot be less than 0");return false}
  var flag_check=0
  for(var it=1;it<i;it++)
  {
    if(document.getElementById("ajax"+it).value!=""){flag_check=1;break;}
  }
  if(flag_check==0){custom_alert("fill atleast 1 item to place bill");return false}
  
  return true;

}

setInterval(function(){
    for (var y=1;y<i;y++)
    {
  var name_id="ajax"+y;
  var price_id="price"+y;
  var name=document.getElementById(name_id).value
  var product_id=id_val[name];
  //alert(product_id)
     //   console.log('called')


  if (product_id==null)
    {document.getElementById(price_id).value=0;
      get_total();
   //   console.log('done')
    } 
  }
},500);
  //////////////////////////////////////////////////////////////////////////////////////////////////

for ( var number_of_rows=0;number_of_rows<1;number_of_rows++){
add_row();

}


function add_row(){

   var tag = '<tr> <td><input type="text" id="ajax'+i+'" list="json-datalist" placeholder="Add Products Here" class="tags"></td>'
       tag+='<td><input type="number" id="quantity'+i+'" value=1 class="quantity" min=0></td>'
       tag+='<td><input class="blue-text text-darken-2" type="number" id="price'+i+'" disabled></td></tr>'
       $("#mytable").append(tag);
       i=i+1;
   
}

var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');
var ListJson={};
var ListJson_cur={};
var id_val={}
var request = new XMLHttpRequest();
var total=0;
$("#mytable").on("input", "input.tags", function(){
//alert('a');
update(this);

});

$("#mytable").on("input change", "input.quantity", function(){
//alert('a');
get_total();

});

$("#discount").on("input change",function(){
//alert('a');
get_total();

});




request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      ListJson = JSON.parse(request.responseText);
      ListJson_cur=JSON.parse(request.responseText);
    }
  }

 $(dataList).empty();
  for(var j = 0; j < ListJson_cur.length; j++) {
    console.log(ListJson[j])
    id_val[ListJson_cur[j].name]=ListJson_cur[j].id
    var option = document.createElement('option');
    option.value = ListJson_cur[j].name;
    dataList.appendChild(option);
   }
};

request.open('GET', '/product_list', true);
request.send();



function get_total(){
  total=0
for (var x=1;x<i;x++){

  quantity_id='quantity'+x;
  price_id='price'+x;
  var quantity=document.getElementById(quantity_id).value;
  var price=document.getElementById(price_id).value;
  total+=(quantity*price);

}

document.getElementById("total_bill").value=total
var discount=document.getElementById("discount").value
document.getElementById("total_bill_discounted").value=total-total*(discount/100)

// alert('Total Price'+total);

}



function update(item){
  
  var name_id=item.id;
  var name=item.value;
  var product_id=id_val[name];
  var price_id="price"+(item.id.slice(4,item.id.length));
for(var x=0;x<ListJson.length;x++)
{
if(product_id==ListJson[x].id)
{
  document.getElementById(price_id).value=ListJson[x].price
  add_row();

  break;
}

}

ListJson_cur=[]
for(var y=0;y<ListJson.length;y++)
{
var flag=0;
  for(var x=1;x<i;x++)      
      {
        product_id=id_val[document.getElementById('ajax'+x).value]  
          if(product_id==ListJson[y].id)
            {flag=1;break;}
        }
        if(flag==0)
         {
          ListJson_cur.push(ListJson[y]);
        }
}
$(dataList).empty();

for(var y=0;y<ListJson_cur.length;y++)
{
    var option = document.createElement('option');
    option.value = ListJson_cur[y].name;
    dataList.appendChild(option);
}

get_total();

}

$("#place_order").click(function(){
  
  product_list_final=[]

  for(var x=1;x<i;x++){

    product_id_final=id_val[document.getElementById('ajax'+x).value]
    quantity_final=(document.getElementById('quantity'+x)).value
    product_list_final.push({'id':product_id_final,'quantity':quantity_final})


  }
var xhr = new XMLHttpRequest();

xhr.open("POST","", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
result_json={}
result_json["product_list"]=product_list_final
result_json["name"]=document.getElementById("name").value
result_json["mobile"]=document.getElementById("mobile").value
result_json["discount"]=document.getElementById("discount").value
var order_id_json

if(validate()==true)
    {
      xhr.send(JSON.stringify(result_json));
      xhr.onreadystatechange = function(response) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Parse the JSON
          // alert(xhr.responseText)
          order_id_json= JSON.parse(xhr.responseText);
          if(order_id_json.success==true)
            {window.location="/order_placed?order_id="+order_id_json.order_id;}
          else{custom_alert("order not placed");}
          
      }}}
      
    //= JSON.parse(xhr.responseText);
    }
    
  });
});
