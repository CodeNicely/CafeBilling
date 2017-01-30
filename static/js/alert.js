
var close = document.getElementById("close_click")
var disc = document.getElementById("discount")
//alert(disc);
disc.onchange=function(){
//alert("a")
update();
}

//alert(close)
  close.onclick = function(){
  //alert("B");
        var div = this.parentElement;
    div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }

function custom_alert(txt){

	var close = document.getElementById("close_click")
	var message_element=document.getElementById("alert_message")
	message_element.innerHTML="<strong>Warning!</strong>  "+txt
	close.parentElement.style.opacity = "1";
    //alert("A");

	window.scroll(0,findPos(close));
	close.parentElement.style.display="";
    close.style.display="";
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}