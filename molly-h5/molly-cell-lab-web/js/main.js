/*
  Preload imageLoad
    @author jayzou
    @time 2016-2-23
    @version 2.1.3
    @class Preload
    @param {boolean} isDebug            选填  是否开启debug选项，用于移动端调试，默认false
    @param {object} sources             必填  加载队列容器，支持队列加载以及加载一个队列后传入回调
    @param int      loadingOverTime     选填  预加载超时时间，默认15， 单位:秒
    @param {object} loadingOverTimeCB   选填  预加载超时回调
    @param {object} progress            选填  进度条容器，返回记载进度信息
    @param {object} completeLoad        选填  完成所有加载项执行回调
*/

$(document).ready(function(){
  function login(){
    console.log(window.devicePixelRatio);
    //bgm自动播放,会在图片加载完成前播放bgm，WeixinJSBridgeReady机制所迫
    document.addEventListener("WeixinJSBridgeReady", function () {
      $('#index-bgm').get(0).play();
    }, false);
    //用户主动触发播放bgm
    /*
      document.addEventListener("mousedown", function () {
        $('#index-bgm').get(0).play();
      }, false);
    */
    //页面禁止滑动
    $('#content').on('touchmove', function (event) {
      event.preventDefault();
    });
    $('.loading').on('touchmove', function (event) {
      event.preventDefault();
    });
    //开始游戏
    $('.startGame img').on('click',function(event){
      console.log('事件未解绑');
      //获取传参后微信给拼接的url
      login.spliceUrls();
    })
    //音乐开关
    musicOnOff();
    function musicOnOff(){
      $('#off').on('click',function(event){
        $('#index-bgm').get(0).pause();
        $('#off').addClass('hide');
        $('#on').removeClass('hide');
      })
      $('#on').on('click',function(event){
        $('#index-bgm').get(0).play();
        $('#on').addClass('hide');
        $('#off').removeClass('hide');
      })
    }
      
    //数据请求
    function onRequest(url,data,callback){
      let that = this;
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
  }

  //获取code
  login.prototype.spliceUrls = function(){
    console.log('开始获取code')
    let that = this;
    let AppId = 'wxdd2337ea274c210e';
    // 跳转下个页面链接
    var answerSrc = testSurr() + '/molly-cell-lab/answer/answer.html'; 
    console.log('跳转链接前缀：'+ testSurr())
    if(answerSrc){
      $('#index-bgm').get(0).pause();
      $('#on').addClass('hide');
      $('#off').removeClass('hide');
      console.log('未跳转');
      window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ AppId +'&redirect_uri='+ encodeURIComponent(answerSrc) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ AppId +'&redirect_uri='+ encodeURIComponent(answerSrc) +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
      console.log('已经跳转');
    }
  }

  //首页资源预加载
  let progressInner = $(".xl-progress__inner"), progressTxt = $('.xl-progress__txt');
  var imageLoad = new Preload.imageLoad({
    isDebug: true,
    sources: {
      imgs: {
        source: [
          imageStr + '/index-text-left.png',
          imageStr + '/index-text-right.png',
          imageStr + '/circle.gif',
          imageStr + '/dianyin.gif',
          imageStr + '/molly-bg.png',
          imageStr + '/startBtn.png',
          imageStr + '/indexMusicOff.png',
          imageStr + '/indexMusicOn.png'
        ],
        callback: function() {
          console.log("队列1'图片加载'完成");
        }
      }
    },
    loadingOverTime: 30,
    loadingOverTimeCB: function() {
      console.log("资源加载超时");
    },
    progress: function(completedCount, total) {
      var percent = Math.floor(completedCount / total * 100) + '%';
      progressInner.css("width",percent);
      progressTxt.html(percent);
    },
    completeLoad: function() {
      $('.loading').hide();
      console.log("已完成所有加载项");
    }
  });

  var login = new login();
});