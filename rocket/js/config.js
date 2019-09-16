'use strict';

function GetWarrant() {
  let that = this;
  this.code = null;
  // jssdk获取用户数据(code)
  let urlHead = 'https://qlz.happysyrup.com/api/wx';
  this.requestUrl = {
    getConfig: urlHead + '/jsapi/get-config',
    getUserInfo: urlHead + '/auth/get-user-info',
    getOtherInfo: 'https://qlz.happysyrup.com/api/nybank/mid-autumn/submit-core'
  };

  // 获取音乐播放器绑定getWarrant对象，默认自动播放
  this.player = $('#bgMusic')[0];
  $('.palyBgMusic').on('click', () => {
    that.player.pause();
    $('.palyBgMusic').addClass('hide');
    $('.pauseBgMusic').removeClass('hide');
  });
  $('.pauseBgMusic').on('click', () => {
    that.player.play();
    $('.pauseBgMusic').addClass('hide');
    $('.palyBgMusic').removeClass('hide');
    $(this).addClass('hide');
  });

  this.EventUtil = {
    addHandler: function(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
      } else {
        element['on' + type] = handler;
      }
    }
  };

  this.EventUtil.addHandler(window, 'online', function() {
    $('#internetBreak').attr('class', 'hide');
    let url = window.location.href;
    window.location.replace(url);
  });

  this.EventUtil.addHandler(window, 'offline', function() {
    $('#internetBreak').removeClass('hide');
    return;
  });

  // 禁止更改字体大小
  if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', handleFontSize);
      document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
    }
  }

  // 禁止更改文字大小
  function handleFontSize() {
    WeixinJSBridge.invoke('setFontSizeCallback', {
      fontSize: 0
    });
    WeixinJSBridge.on('menu:setfont', function() {
      WeixinJSBridge.invoke('setFontSizeCallback', {
        fontSize: 0
      });
    });
  }

  //获取当前页面url
  this.localUrl = window.location.href.split('#')[0];
  console.log('当前url==>' + this.localUrl);
  this.requestData = {
    appid: 'wxdd2337ea274c210e', // appid 颜值无限：wxdd2337ea274c210e
    url: encodeURIComponent(window.location.href.split('#')[0]), // 回调链接地址，需转码为URI格式，必须去除#后的参数
    scope: 'snsapi_userinfo', // snsapi_base静默授权，snsapi_userinfo弹出授权页面
    state: '1' // 重定向带的参数
  };
  this.code = this.splitCode('code');
  console.log('code===>' + this.code);
  // 换取config·签名
  if (this.code != null) {
    this.setCurrentUrl();
    this.localUrl = window.location.href.split('#')[0];
    console.info('换取签名的url==>' + this.localUrl);
    let that = this;
    let config_data = { url: this.localUrl, appCode: 'yzwx' }; // flmnix
    this.getRequest(this.requestUrl.getConfig, config_data, function(datas) {
      console.info(datas);
      that.config(datas.data.timestamp, datas.data.nonceStr, datas.data.signature);
    });
  }
}

// 获取code
GetWarrant.prototype.getCode = function() {
  window.location.replace(
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      this.requestData.appid +
      '&redirect_uri=' +
      this.requestData.url +
      '&response_type=code&scope=' +
      this.requestData.scope +
      '&state=' +
      this.requestData.state +
      '#wechat_redirect'
  );
};

// 截取code
GetWarrant.prototype.splitCode = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

//code传后端，返回config
GetWarrant.prototype.getRequest = function(url, data, callback) {
  $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    contentType: 'application/json',
    header: {
      'X-Access-Token': 'test-access-token'
    },
    data: JSON.stringify(data),
    success: function(data, textStatus, jqXHR) {
      if ((data.code = 'OK')) {
        if (callback) callback(data);
      } else {
        console.log(data.code + ':' + data.data.message);
      }
    },
    fail: function(err) {
      console.log(err);
    }
  });
};

// 校验config
GetWarrant.prototype.config = function(timestamp, nonceStr, signature) {
  let that = this;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    appId: that.requestData.appid, // 必填，公众号的唯一标识  巧乐兹: wx822b71f28b6ad987  颜值：wxdd2337ea274c210e  测试：wx2d5c09ecce611b25
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名
    jsApiList: [
      // 必填，需要使用的JS接口列表
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'updateTimelineShareData',
      'updateAppMessageShareData',
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
};

// 重写url
GetWarrant.prototype.setCurrentUrl = function() {
  if (!!(window.history && history.pushState)) {
    // 支持History API
    history.replaceState(null, null, 'https://brand.happysyrup.com/nybank/mid-autumn/index.html');
  }
};

wx.ready(function() {
  console.warn('验证成功！');
  this.player = $('#bgMusic')[0];
  this.player.play(); // 自动播放音乐
  wx.checkJsApi({
    jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'],
    success: function(res) {
      console.info(JSON.stringify(res));
    }
  });
  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容  js => 1.4.0
  wx.updateTimelineShareData({
    title: '与南小粤一起登月赢大奖', // 分享标题
    imgUrl: 'https://brand.happysyrup.com/nybank/mid-autumn/images/share.jpg', // 分享显示的缩略图地址
    link: 'https://brand.happysyrup.com/nybank/mid-autumn/index.html',
    success: function() {
      console.log('分享成功～');
      _czc.push(['_trackEvent', '活动', '点击', '分享页面', 1, 'NYBANK-MID']);
    },
    fail: function(e) {
      console.log(e);
    },
    cancel: function() {
      console.log('用户取消～');
    }
  });

  wx.updateAppMessageShareData({
    title: '与南小粤一起登月赢大奖', // 分享标题
    desc: '与南小粤一起登月赢大奖', // 分享描述
    imgUrl: 'https://brand.happysyrup.com/nybank/mid-autumn/images/share.jpg', // 分享显示的缩略图地址
    link: 'https://brand.happysyrup.com/nybank/mid-autumn/index.html',
    success: function() {
      console.log('分享成功～');
      _czc.push(['_trackEvent', '活动', '点击', '分享页面', 1, 'NYBANK-MID']);
    },
    fail: function(e) {
      console.log(e);
    },
    cancel: function() {
      console.log('用户取消～');
    }
  });

  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
  // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res) {
  console.log(res);
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

var getWarrant = new GetWarrant();
