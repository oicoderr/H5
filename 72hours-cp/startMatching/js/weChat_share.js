wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: '', // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
wx.ready(function(){
	//config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
wx.error(function(res){
	//config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

//判断访问终端
var browser = {
  versions: function() {
    var u = navigator.userAgent,
    	  app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == "qq", //是否QQ
      weibo: u.match(/WeiBo/i) == "weibo", //是否微博
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

//注释：在这里，getNowTime()是时间戳函数，gObj.parameterObj是调取接口的公共参数对象;调取接口如果不需要就不加
function shareWX(shareObj){
  /*微信分享*/
  var url = encodeURIComponent(location.href.split('#')[0]);
  gObj.parameterObj.url = url;
  $.ajax({
    type: "post",
    url: "/app/fenzhongkeji/HttpXmlClient/getWeiXin.json?" + getNowTime(),
    data: gObj.parameterObj,
    dataType: 'json',
    success: function(data) {
      data = data.data;
      /*微信接口*/
      var appId = data.appId;
      var timestamp = data.timestamp;
      var nonceStr = data.nonceStr;
      var signature = data.signature;
      var obj = {
        debug: false, // 开启调试模式
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      }
	    /*权限验证配置*/
	    wx.config(obj);
	    if(browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
	        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
	        if(ua.match(/MicroMessenger/i) == "micromessenger") {
	            wx.ready(function() {
	              WeixinJSBridge.call('showOptionMenu');
	              /*加载完数据，能分享的时候隐藏加载层*/
	              $("#preloader").hide();
	              /*1-分享给朋友*/
	              wx.onMenuShareAppMessage(shareObj);
	              /*2-分享给朋友圈*/
	              wx.onMenuShareTimeline(shareObj);
	              /*3-分享到QQ好友*/
	              wx.onMenuShareQQ(shareObj);
	              /*4-分享到QQ空间*/
	              wx.onMenuShareQZone(shareObj);
	              /*5-分享到腾讯微博*/
	              wx.onMenuShareWeibo(shareObj);
	          });
	          wx.error(function(res) {});
	        }else{
	          /*加载完数据，能分享的时候隐藏加载层*/
	          $("#preloader").hide();
	        }
	    }else{
	      $("#preloader").hide();
	    }
  		}
  });
}

/*微信分享*/
var shareName = '分享标题';
var shareDesc= '分享描述';
var sharePic= '分享图片路径';
shareWX({
  title: shareName, 
  desc: shareDesc,
  link: window.location.href, // 分享链接
  imgUrl: sharePic, // 分享图标
  success: function() {},
  cancel: function() {}
})