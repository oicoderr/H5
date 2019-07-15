//测试接口/正式接口 的使用
function testSurr() {
	var protocolStr = document.location.protocol;
	if(protocolStr == "http:"){
	  return 'http://molly-h5-test.happysyrup.com';
	}else if(protocolStr == "https:"){
	  return 'https://molly-h5.happysyrup.com';
	}else{
	  return 'http://molly-h5-test.happysyrup.com';
	}
}
const requestUrl = {
  'getSign':'/api/get-sign',
  'login': '/api/login',
  'showImg':'/api/save-base64-image',
  'submit': '/api/molly-cell-lab/submit'
}
//图片/音乐url前缀
const imageStr = 'https://cdn.happysyrup.com/h5/molly-cell-lab-v1/img';
const soundStr = 'https://cdn.happysyrup.com/h5/molly-cell-lab-v1/sound';

~function() {
	function getWarrant() {
		 // 网络断开
	    window.addEventListener("offline", function(e) {
	      $('#internetBreak').removeClass('hide');
	    });
	    // 网络连接
	    window.addEventListener("online", function(e) {
	      $('#internetBreak').attr('class','hide');
	      let url = window.location.href;
	      window.location.replace(url);
	    });
	    //禁止更改字体大小
	    if(typeof WeixinJSBridge=="object"&& typeof WeixinJSBridge.invoke == "function"){
        	handleFontSize();
	    }else{
		    if(document.addEventListener){
		      document.addEventListener("WeixinJSBridgeReady",handleFontSize,false);
		    }else if(document.attachEvent){
	        document.attachEvent("WeixinJSBridgeReady",handleFontSize);
	        document.attachEvent("onWeixinJSBridgeReady",handleFontSize);
	      }
	    };
	   	function handleFontSize(){
         WeixinJSBridge.invoke("setFontSizeCallback",{
          	"fontSize":0
         });
        WeixinJSBridge.on("menu:setfont",function(){
          WeixinJSBridge.invoke("setFontSizeCallback",{
            "fontSize":0
         	});
        });
	    };

		//获取当前页面url
		this.localUrl = window.location.href.split('#')[0];
		console.log(this.localUrl);
	}
	//code传后端，返回config
	getWarrant.prototype.getRequest = function(url, callback) {
		let that = this;
		let data = {'url':that.localUrl};
		$.ajax({
		  type: 'POST',
		  url: testSurr() + url,
		  dataType: 'json',
		  contentType: "application/json",
		  data: JSON.stringify(data),
		  success: function(data, textStatus, jqXHR) {
		  	if(data.code = 'OK'){
		  		if(callback)callback(data);
		  	}else{ console.log(data.code +':'+ data.data) }
		  }
		});
	}

	//校验config
	getWarrant.prototype.config = function (timestamp, nonceStr,  signature) {
		wx.config({
	    debug: false, 								// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
	    appId: 'wxdd2337ea274c210e', 	// 必填，公众号的唯一标识
	    timestamp: timestamp, 				// 必填，生成签名的时间戳
	    nonceStr: nonceStr, 					// 必填，生成签名的随机串
	    signature: signature,					// 必填，签名
	    jsApiList: [									// 必填，需要使用的JS接口列表
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'translateVoice',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard'
	    ] 					
		});
	}

	wx.ready(function(){
		console.log('验证成功！')
		wx.hideMenuItems({
      menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    });
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	    // 通过下面这个API隐藏底部导航栏
	    WeixinJSBridge.call('hideToolbar');
	});
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
		// 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	});

	wx.error(function(res){
		console.log(res)
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
	    //也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	});

	var getWarrant = new getWarrant();
	//换取config·签名
	getWarrant.getRequest(requestUrl.getSign, function(datas) {
		if(datas.code == 'OK'){
			getWarrant.config( datas.data.timestamp, datas.data.noncestr, datas.data.signature );	
		}else{
			console.log(datas.code + ':' + datas.message)
		}
	});
}()