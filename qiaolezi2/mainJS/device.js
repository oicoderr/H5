(function(){
  function getModels(){
    var isIPhoneX, isIPhoneXSMax, isIPhoneXR;
    // iPhone X、iPhone XS
    isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
    // iPhone XS Max
    isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
    // iPhone XR
    isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
    if(isIPhoneX || isIPhoneXSMax || isIPhoneXR){
      return true;
    }else{
      return false;
    }
  }
  // 获取运行平台
  function getUa(){
    var browser = {
      versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
      }()
    }
    if (browser.versions.mobile) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log('微信')
        return 'weChat'
      }
      if (ua.match(/WeiBo/i) == "weibo") {
        console.log('微博')
        return 'WeiBo'
      }
      if (ua.match(/QQ/i) == "qq") {
        console.log('qq')
        return 'QQ';
      }
    } else {
      console.log('pc');
      return 'PC';
    }
  }

  if (window.MobileDevice == undefined) {
    window.MobileDevice = {};
  }
  window.MobileDevice.getModels = getModels;
  window.MobileDevice.getUa = getUa;
})()