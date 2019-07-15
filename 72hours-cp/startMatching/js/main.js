  
function getTime(url){
	if(window.WebSocket){  
		ws = new WebSocket(url); 
		ws.addEventListener('open', Open, false);
		ws.addEventListener("message", getMessage, false);
		ws.addEventListener("close", Close, false);
		ws.addEventListener("error", Error, false);//出现连接，处理，接收，发送数据失败的时候就会触发onerror事件
  }else{
  		alert("不支持WS");
  		return false;
  }
  function Open(){
  		ws.send('当前本地时间戳');
  }
  function getMessage(event){
		var data = event.data;
		var _this = event.target;
		resultDate(event.data);
  }
  function Close(event){
  		console.log('收到服务端发送close请求!');
  }
  function Error(event){
  		console.log("出现错误:"+ event);
  }
  //将返回的‘服务器当前时间戳’+72小时 设置为'获取最终匹配结果'时间
  	function resultDate(data){
  		
		alert( "今天星期 "+"天一二三四五六 ".charAt(new   Date(data).getDay())); 
	}
  	
}

$(document).ready(function(evt) {
	var elements = `<section id='mathch'>
									  <ul>
									  		<li id='getResultTime'>
									  			<span class='month'>5月</span>
									  			<span class='date'>20日<i>&nbsp</i></span>
									  			<span class='week'>(周五)<i>&nbsp</i></span>
									  			<span class="isHour">20</span><i>&nbsp</i>:
									  			<span class="isMinute">00</span>
									  		</li>
									  		<li id='showResultMessage'></li>
									  		<li id='laveTime'>
									  			<a class='timeBox'>
									  				<span class='hour'>160</span>&nbsp:&nbsp<span class='minute'>32</span>&nbsp:&nbsp<span class='second'>66</span>
									  			</a>
									  		</li>
									  		<li id='openNoticeBtn'></li>
									  		<li id='inclusionRateBox'>
									  			<span class='rate'>100</span>
									  		</li>
									  		<li id='shareBtn'></li>
									  		<li id='meetSweetBtn'></li>
									  </ul>
								</section>
								<div id="weixinTip">
									<img src="img/live_weixin.png" alt="微信打开"/>
									<p class='promptInfo'></p>
								</div>	
								<div id='caveatWrap' class='hide'>
	 	  							<div id='caveatBox'></div>
								</div>`
	$(document.body).append(elements);
	var confiData = {
		'weChatShare':'点击右上角‘...’ 并分享呦!',
		'notWeChatShare':'请在微信中打开分享哦!',
		'iosUrl':'https://itunes.apple.com/cn/app/id1126015311',
		'androidUrl':'http://sj.qq.com/myapp/detail.htm?apkName=com.tencent.mobileqq'
	}
	//开启通知 + '遇见甜蜜Btn' = 下载app
  $("#openNoticeBtn").bind("click",function(){
		iosOrAndroid(confiData['iosUrl'],confiData['androidUrl']);
  });
  $("#meetSweetBtn").bind("click",function(){
		iosOrAndroid(confiData['iosUrl'],confiData['androidUrl']);
  });
  //提示分享
  $("#shareBtn").bind("click",function(){
  		shareUrl(confiData['weChatShare'], confiData['notWeChatShare']);
  })
  
  //关闭'按钮'提示
  $("#weixinTip").bind("click",function(){
  		$("#weixinTip").css({"display":"none"});
  })
	//分享提示
	function shareUrl(weChat,notWeChat){
		var ua = navigator.userAgent.toLowerCase();
  		if (ua.match(/MicroMessenger/i) == "micromessenger") {
  			$("#weixinTip").css({"display":"block"});
  			$(".promptInfo")[0].innerText = weChat;
  		}else {
  			if($("#caveatWrap").hasClass("hide")){
  				$("#caveatWrap").removeClass("hide");
  				$("#caveatBox")[0].innerText = notWeChat;
  			}
		}
	}
	//iso android设备判断进行下载
	function iosOrAndroid(iosUrl,androidUrl){
		var u = navigator.userAgent;
	  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	  if(isAndroid){
	  		$(location).attr('href',androidUrl );
	  }
	  if(isiOS){
	  		$(location).attr('href',iosUrl );
	  }
	}
	//关闭'错误提示'
	$("#caveatWrap").bind("click",function(){
		if( $("#caveatWrap").hasClass("hide") == false){
			$("#caveatWrap").addClass("hide");
			$("#caveatBox")[0].innerText = '';
  		}
	})
})