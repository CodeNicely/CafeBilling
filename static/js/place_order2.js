function update(){
  document.getElementById('total_text').innerHTML=Math.round(document.getElementById('total').value*(100-document.getElementById('discount').value)/100);

}
var final_json={};

$(document).ready(function(){
  document.body.style.zoom="85%"

var ListJson={};
var request = new XMLHttpRequest();
request.open('GET', '/product_list', true);
request.send();

request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      ListJson = JSON.parse(request.responseText);

    }
  }

var x=0;
var count=0;
var lim=1;
for(x=1;x<ListJson.length;x++)
{
  lim+=1;
if(ListJson[x].category!=ListJson[x-1].category){lim+=1;}
if(ListJson[x].name.length>24){lim+=2;}
}
lim=(lim)/6;
for(x=0;x<ListJson.length&&count<lim;x++)
{
  //alert(x);
  var divid=document.getElementById('list1');
  if(x==0){divid.innerHTML+='<center><div style="font-size:20px;">'+ListJson[x].category+'</div></center>';count+=1;}
  else{
    
      if(ListJson[x-1].category!=ListJson[x].category)
      {divid.innerHTML+='<center><div style="font-size:20px">'+ListJson[x].category+'</div></center>';count+=1;}
    }
  count+=1;
divid.innerHTML+=('<a class="collection-item waves-effect waves-light"><div style="display:none"><input type="hidden" value='+ListJson[x].id+' id="p'+x+'"><input type="hidden" value=0 id="q'+x+'"><span class="closebtn" >&times;</span><span class="new badge"></span></div>'+'<input type="hidden" value="'+ListJson[x].price+'"><div class="price">'+ListJson[x].price+'</div>'+ListJson[x].name+'</a>');}

count=0;
for(;x<ListJson.length&&count<lim;x++)
{
  //alert(x);
var divid=document.getElementById('list2');
  
      if(ListJson[x-1].category!=ListJson[x].category)
      {divid.innerHTML+='<center><div style="font-size:20px">'+ListJson[x].category+'</div></center>';count+=1;}
  
  count+=1;
divid.innerHTML+=('<a class="collection-item waves-effect waves-light"><div style="display:none"><input type="hidden" value='+ListJson[x].id+' id="p'+x+'"><input type="hidden" value=0 id="q'+x+'"><span class="closebtn" >&times;</span><span class="new badge"></span></div>'+'<input type="hidden" value="'+ListJson[x].price+'"><div class="price">'+ListJson[x].price+'</div>'+ListJson[x].name+'</a>');}
count=0;
for(;x<ListJson.length&&count<lim;x++)
{
  var divid=document.getElementById('list3');
  


      if(ListJson[x-1].category!=ListJson[x].category)
      {divid.innerHTML+='<center><div style="font-size:20px">'+ListJson[x].category+'</div></center>';count+=1}
  
count+=1;
divid.innerHTML+=('<a class="collection-item waves-effect waves-light"><div style="display:none"><input type="hidden" value='+ListJson[x].id+' id="p'+x+'"><input type="hidden" value=0 id="q'+x+'"><span class="closebtn" >&times;</span><span class="new badge"></span></div>'+'<input type="hidden" value="'+ListJson[x].price+'"><div class="price">'+ListJson[x].price+'</div>'+ListJson[x].name+'</a>');}

count=0;
for(;x<ListJson.length&&count<lim;x++)
{
  var divid=document.getElementById('list4');
  


      if(ListJson[x-1].category!=ListJson[x].category)
      {divid.innerHTML+='<center><div style="font-size:20px">'+ListJson[x].category+'</div></center>';count+=1}
  
count+=1;
divid.innerHTML+=('<a class="collection-item waves-effect waves-light"><div style="display:none"><input type="hidden" value='+ListJson[x].id+' id="p'+x+'"><input type="hidden" value=0 id="q'+x+'"><span class="closebtn" >&times;</span><span class="new badge"></span></div>'+'<input type="hidden" value="'+ListJson[x].price+'"><div class="price">'+ListJson[x].price+'</div>'+ListJson[x].name+'</a>');}

count=0;
for(;x<ListJson.length&&count<lim;x++)
{
  var divid=document.getElementById('list5');
  


      if(ListJson[x-1].category!=ListJson[x].category)
      {divid.innerHTML+='<center><div style="font-size:20px">'+ListJson[x].category+'</div></center>';count+=1}
  
count+=1;
divid.innerHTML+=('<a class="collection-item waves-effect waves-light"><div style="display:none"><input type="hidden" value='+ListJson[x].id+' id="p'+x+'"><input type="hidden" value=0 id="q'+x+'"><span class="closebtn" >&times;</span><span class="new badge"></span></div>'+'<input type="hidden" value="'+ListJson[x].price+'"><div class="price">'+ListJson[x].price+'</div>'+ListJson[x].name+'</a>');}


for(;x<ListJson.length;x++)
{
  var divid=document.getElementById('list6');
  


      if(ListJson[x-1].category!=ListJson[x].category)
      {divid.innerHTML+='<center><div style="font-size:20px">'+ListJson[x].category+'</div></center>';}
  

divid.innerHTML+=('<a class="collection-item waves-effect waves-light"><div style="display:none"><input type="hidden" value='+ListJson[x].id+' id="p'+x+'"><input type="hidden" value=0 id="q'+x+'"><span class="closebtn" >&times;</span><span class="new badge"></span></div>'+'<input type="hidden" value="'+ListJson[x].price+'"><div class="price">'+ListJson[x].price+'</div>'+ListJson[x].name+'</a>');}


//alert("abc");
//$(function(){
        $('.collection-item').click(function(){

          (this.childNodes)[0].style.display="inline";
          if(!final_json[this.childNodes[0].childNodes[0].value])
          {final_json[this.childNodes[0].childNodes[0].value]=1;}
        else{final_json[this.childNodes[0].childNodes[0].value]+=1;}
          console.log(final_json);
          ((this.childNodes)[0].childNodes)[1].value=parseInt(((this.childNodes)[0].childNodes)[1].value)+1;

          ((this.childNodes)[0].childNodes)[3].innerHTML=((this.childNodes)[0].childNodes)[1].value;
          //alert(((this.childNodes)[1].childNodes)[5].innerHTML);
          $(this).removeClass("collection-item").addClass("collection-item active");

           document.getElementById('total').value=parseInt(document.getElementById('total').value)+parseInt((this.childNodes)[1].value);
        update();
        });
//    });
//$(function(){

        $('.closebtn').click(function(){
          //alert(this.parentElement.parentElementl);
          //(this.parentElement).parentElement.removeClass("collection-item active").addClass("collection-item");
          this.parentElement.style.display="none";
          final_json[this.parentElement.childNodes[0].value]=0;
          console.log(final_json);
          //alert(this.parentElement.parentElement.childNodes[1].value)
          document.getElementById('total').value=parseInt(document.getElementById('total').value)-(parseInt(this.parentElement.parentElement.childNodes[1].value)*parseInt(this.parentElement.childNodes[1].value));

          ((this.parentElement.childNodes)[1]).value=0;

          ((this.parentElement.childNodes)[3]).innerHTML=(this.parentElement.childNodes)[1].value;
          $(this.parentElement.parentElement).removeClass("collection-item active").addClass("collection-item");
          //alert(this.id);
          update();
          event.stopPropagation();
        });
//    });

};

function validate(){

  // if(document.getElementById("name").value=="")
  //   {custom_alert("Name must be filled");
  //     return false}
  // if(document.getElementById("mobile").value.length!=10)
  // {custom_alert("Mobile must only have 10 digits");return false}
  if(document.getElementById("discount").value>10)
      {custom_alert("Discount cannot be more than 10%");return false}
  if(document.getElementById("discount").value<0)
      {custom_alert("Discount cannot be less than 0");return false}
  var flag_check=0
  
    for (var id in final_json){

    //product_id_final=id_val[document.getElementById('ajax'+x).value]
    //quantity_final=(document.getElementById('quantity'+x)).value
    if(final_json[id]>0){
  flag_check=1;
  }

  }
  if(flag_check==0){custom_alert("Select atleast 1 item");return false;}
  return true;

}

$("#place_order").click(function(){
  
  product_list_final=[]

  for (var id in final_json){

    //product_id_final=id_val[document.getElementById('ajax'+x).value]
    //quantity_final=(document.getElementById('quantity'+x)).value
    if(final_json[id]>0){
    product_list_final.push({'id':id,'quantity':final_json[id]});}


  }
var xhr = new XMLHttpRequest();

xhr.open("POST","", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
result_json={}
result_json["product_list"]=product_list_final
result_json["name"]=document.getElementById("name").value
result_json["mobile"]=document.getElementById("number").value
if(document.getElementById("discount").value==''){document.getElementById("discount").value=0;}
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
