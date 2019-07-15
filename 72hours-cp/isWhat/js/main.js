$(document).ready(function(evt) {
	var elements = `<section id='container'>
										<div id='scrollBox'>
											<p id='titleInfoOne'></p>
										  <p id='titleInfoTwo'></p>
										  <p id='personInfo'></p>
										  <p id='searchUs'></p>
										  <p id='QRcode'>
										  		<img src='img/QRcode.png' class='code'/>
										  </p>
										</div>
								</section>`;
	$(document.body).append(elements);
	
	$('body').on('touchmove', function (event) {event.preventDefault();});
})
window.onload = function(){
	var container = document.querySelector("#container");
  var scrollBox = document.querySelector("#scrollBox");
  xScroll.scroll(scrollBox,0,container.offsetHeight - scrollBox.offsetHeight,true,function(e,o){
    if(undefined == o)
        return;
  });
}
