function getWarrant() {
	// jssdk获取用户数据(code)
	this.code = null; 
  this.requestUrl = {
		'getConfig': 'https://qlz.happysyrup.com/api/wx/jsapi/get-config',
		'getUserInfo': 'https://qlz.happysyrup.com/api/wx/auth/get-user-info'
	};
	this.openid = '', this.nickname = '', this.headimgurl = '', this.avatarData = '';
	this.EventUtil = {
    addHandler: function (element, type, handler) {
        if(element.addEventListener) {
          element.addEventListener(type, handler, false);
        }else if (element.attachEvent) {
          element.attachEvent("on" + type, handler);
        }else {
          element["on" + type] = handler;
        }
    	}
	};
	this.EventUtil.addHandler(window, "online", function () {
    $('#internetBreak').attr('class','hide');
    let url = window.location.href;
    window.location.replace(url);
	});
	this.EventUtil.addHandler(window, "offline", function () {
    $('#internetBreak').removeClass('hide');
    return;
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
	console.log('当前url==>' + this.localUrl);
	this.requestData = {
		appid: 'wx822b71f28b6ad987',							// appid  
		url: window.location.href.split('#')[0],	// 回调链接地址，需转码为URI格式，必须去除#后的参数
		scope: 'snsapi_userinfo',	  							// snsapi_base静默授权，snsapi_userinfo弹出授权页面
		state: '1' 																// 重定向带的参数
	}
	let code = this.splitCode('code');
	// 换取config·签名
	if(code!=null){
		let that = this;
		urlCode = code;
		let config_data = {'url':this.localUrl,'appCode': 'qlz'};//flmnix
		this.getRequest(this.requestUrl.getConfig, config_data, function(datas) {
			that.config( datas.data.timestamp, datas.data.nonceStr, datas.data.signature );	
		});
		// 获取用户信息
		let user_data = {'code':code,'appCode': 'qlz','withAvatarData': 1};
		this.getRequest(this.requestUrl.getUserInfo, user_data, function(datas){
			console.table(datas.data);
			that.openid = datas.data.openid;
			that.nickname = datas.data.nickname;
			that.headimgurl = datas.data.headimgurl;
			that.avatarData = datas.data.avatarData;
		});
	}
}

// 获取code
getWarrant.prototype.getCode = function(){
	window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.requestData.appid+'&redirect_uri='+this.requestData.url+'&response_type=code&scope='+this.requestData.scope+'&state='+this.requestData.state+'#wechat_redirect')
}

// 截取code
getWarrant.prototype.splitCode = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
  var r = window.location.search.substr(1).match(reg);  
  if (r != null) return unescape(r[2]); return null;
};

//code传后端，返回config
getWarrant.prototype.getRequest = function(url,data,callback) {
	$.ajax({
	  type: 'POST',
	  url: url,
	  dataType: 'json',
	  contentType: "application/json",
	  header:{
	  	'X-Access-Token': 'test-access-token'
	  },
	  data: JSON.stringify(data),
	  success: function(data, textStatus, jqXHR) {
	  	if(data.code = 'OK'){
	  		if(callback)callback(data);
	  	}else{ console.log(data.code +':'+ data.data.message) }
	  },
	  fail: function(err){
	  	console.log(err)
	  }
	});
}

// 校验config
getWarrant.prototype.config = function (timestamp, nonceStr,  signature) {
	wx.config({
    debug: false, 							// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    appId: 'wx822b71f28b6ad987',// 必填，公众号的唯一标识  巧乐兹: wx822b71f28b6ad987  颜值：wxdd2337ea274c210e  测试：wx2d5c09ecce611b25
    timestamp: timestamp, 			// 必填，生成签名的时间戳
    nonceStr: nonceStr, 				// 必填，生成签名的随机串
    signature: signature,				// 必填，签名
    jsApiList: [								// 必填，需要使用的JS接口列表
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
	console.log('验证成功！');
	let player = $('#bgMusic')[0];
	player.play(); // 播放音乐
	$('.palyBgMusic').on('click',function(){
		player.pause();
		$('.palyBgMusic').addClass('hide');
		$('.pauseBgMusic').removeClass('hide');
	});
	$('.pauseBgMusic').on('click',function(){
		player.play();
		$('.palyBgMusic').removeClass('hide');
		$(this).addClass('hide');
	});
	// 重写url
	getWarrant.setCurrentUrl();

	// 分享给朋友/QQ
  wx.updateAppMessageShareData({ 
    title: '巧乐兹绮炫「异」世界', // 分享标题
    desc: '在巧乐兹绮炫「异」世界，和王子异一起开启你的绮炫之旅', // 分享描述
    link: 'https://qlz.happysyrup.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'https://cdn.happysyrup.com/brand/qlz2/img/share.jpg', // 分享图标
    success: function () {

    }
  });

  // 分享到朋友圈/QQ空间
  wx.onMenuShareAppMessage({
		title: '巧乐兹绮炫「异」世界', // 分享标题
		desc: '在巧乐兹绮炫「异」世界，和王子异一起开启你的绮炫之旅', // 分享描述
		link: 'https://qlz.happysyrup.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: 'https://cdn.happysyrup.com/brand/qlz2/img/share.jpg', // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {

		}
	});

	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 通过下面这个API隐藏底部导航栏 此接口已被废弃
    WeixinJSBridge.call('hideToolbar');
	});
	// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
	// 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){
	console.log(res)
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

// 重写url
getWarrant.prototype.setCurrentUrl = function () {
  if (!!(window.history && history.pushState)) {
    // 支持History API
    history.replaceState(null, null, 'https://qlz.happysyrup.com')
  }  
}

// 判断运行平台：weChat：校验config ，other：走默认
getWarrant.prototype.getUa = function(){
	if(getUa == 'WeiBo' || getUa == 'PC'){
		getWarrant.nickname = "你";
		$('.saveResultImgPrompt').html('截屏保存结果页');
		// 更换‘保存’按钮 - 提示
		$('#resultBtn .save').attr('src','https://syrup.oss-cn-beijing.aliyuncs.com/brand/qlz2/img/prompt_captureSaveBtn.png');
		// 设置微博播放器默认样式
		$('.palyBgMusic').addClass('hide');
		$('.pauseBgMusic').removeClass('hide');
		let player = $('#bgMusic')[0];
		$('.gotoSelectIceCream').on('click',()=>{
			playAudio();
		});
		$('.palyBgMusic').on('click',pauseAudio);
		$('.pauseBgMusic').on('click',playAudio);
		function playAudio(){ // 开始播放
			player.play();
			$('.palyBgMusic').removeClass('hide');
			$('.pauseBgMusic').addClass('hide');
		}
		function pauseAudio(){ // 暂停播放
			player.pause();
			$('.palyBgMusic').addClass('hide');
			$('.pauseBgMusic').removeClass('hide');
		}

		if(getUa == 'PC'){
			let promptPc = $("<p class='promptPc'></p>").text("请从微博手机端查看");
      $('body').append(promptPc);
		}
	}else{
		if(urlCode == 'code'){
			getWarrant.getCode();
		}
	} 
};

var getWarrant = new getWarrant();
getWarrant.getUa();
// 绑定‘进入雪糕选择页’按钮事件
$('.gotoSelectIceCream').on('click',()=>{
	// getWarrant.getCode();
	// 验证成功后显示选择雪糕页
	$('#index').attr('class','hide');
	$('#iceCreamBox').removeClass('visible');
})