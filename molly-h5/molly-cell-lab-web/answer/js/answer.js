/*
  Dialog 弹窗：
    Chrome、Firefox 22+、Opera 9+、Safari、IE10+
    Android 4.0+ (Android 2.3 弹窗动画不够顺畅)
    iOS 8+
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
  function answer(){
    //页面禁止滑动
    $('#content').on('touchmove', function (event) {
      event.preventDefault();
    });
    $('.loading').on('touchmove', function (event) {
      event.preventDefault();
    });

    //返回上一题
    $("#preBtn").on('click',function(){
      answer.prevProblem();
    })

    //最终结果
    this.thisAmswer = null;
    this.resultAnswer = [];

    this.imgs = [
      imageStr + '/answer-bg.png',
      imageStr + '/no0-0.gif',
      imageStr + '/no0-1.gif',
      imageStr + '/no0-2.gif',
      imageStr + '/no0-3.gif',
      imageStr + '/no1-0.gif',
      imageStr + '/no1-1.gif',
      imageStr + '/no1-2.gif',
      imageStr + '/no1-3.gif',
      imageStr + '/no2-0.gif',
      imageStr + '/no2-1.gif',
      imageStr + '/no2-2.gif',
      imageStr + '/no2-3.gif',
      imageStr + '/no3-0.gif',
      imageStr + '/no3-1.gif',
      imageStr + '/no3-2.gif',
      imageStr + '/no3-3.gif',
      imageStr + '/no4-0.gif',
      imageStr + '/no4-1.gif',
      imageStr + '/no4-2.gif',
      imageStr + '/no4-3.gif',
    ]
    this.other_musics = [
      soundStr + '/music1.mp3',
      soundStr + '/music2.mp3',
      soundStr + '/music3.mp3',
      soundStr + '/music4.mp3',
      soundStr + '/music5.mp3'
    ]
  }

  //预加载
  let progressInner = $(".xl-progress__inner"), progressTxt = $('.xl-progress__txt');
  var imageLoad = new Preload.imageLoad({
    isDebug: false,
    sources: {
      imgs: {
        source: [
          imageStr + '/answer-bg.png',
          imageStr + '/internetBreak.jpg',
          imageStr + '/no0-0.gif',
          imageStr + '/no0-1.gif',
          imageStr + '/no0-2.gif',
          imageStr + '/no0-3.gif',
        ],
        callback: function() {
          console.log("队列‘图片1’完成");
        }
      },
      imgs2: {
        source: [
          imageStr + '/no1-0.gif',
          imageStr + '/no1-1.gif',
          imageStr + '/no1-2.gif',
          imageStr + '/no1-3.gif',
        ],
        callback: function() {
          console.log("队列‘图片2’完成");
        }
      },
      imgs3: {
        source: [
          imageStr + '/no2-0.gif',
          imageStr + '/no2-1.gif',
          imageStr + '/no2-2.gif',
          imageStr + '/no2-3.gif',
        ],
        callback: function() {
          console.log("队列‘图片3’完成");
        }
      },
      imgs4: {
        source: [
          imageStr + '/no3-0.gif',
          imageStr + '/no3-1.gif',
          imageStr + '/no3-2.gif',
          imageStr + '/no3-3.gif',
        ],
        callback: function() {
          console.log("队列‘图片4’完成");
        }
      },
      imgs5: {
        source: [
          imageStr + '/no4-0.gif',
          imageStr + '/no4-1.gif',
          imageStr + '/no4-2.gif',
          imageStr + '/no4-3.gif',
        ],
        callback: function() {
          console.log("队列‘图片5’完成");
        }
      }
    },
    loadingOverTime: 60,
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

  //音乐开关
  answer.prototype.musicOnOff = function(){
    $('#off').on('click',function(event){
      $('#answer-bgm').get(0).pause();
      $('#off').addClass('hide');
      $('#on').removeClass('hide');
    })
    $('#on').on('click',function(event){
      $('#answer-bgm').get(0).play();
      $('#on').addClass('hide');
      $('#off').removeClass('hide');
    })
  }

  //开始获取code
  answer.prototype.getCode = function(){
    let code = answer.getUrlParem('code');
    if(code != null && code != '' && code != undefined){
      //code换取'个人openId'
      answer.onRequest(requestUrl.login, {'code': code},function (data) {
        console.log('获得个人信息:')
        console.log(data)
        answer.setStorage(data.data); //储存‘个人信息’
      });
    }
  }

  //储存‘个人信息’数据至localStorage
  answer.prototype.setStorage = function(data){
    localStorage.setItem("userInfo",JSON.stringify(data));
    //获取个人数据  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  //截取url获取code
  answer.prototype.getUrlParem = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var re = window.location.search.substr(1).match(reg); //匹配参数
    if(re != null){
      return unescape(re[2])
    }else{
      return null;
    }
  }

  //发送code，获取openId
  answer.prototype.onRequest = function(url,data,callback){
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

  //点击选项变换样式,同时进入下一题
  answer.prototype.clickOptions = function(){
    var _this = this;

    $('.optionBox li').bind('click', function(event){
      for(let i = 0; i < $('.optionBox li').length; i++){
        $('.optionBox li').css({border:'.04rem solid rgba(128, 128, 128, 1)'})
      }
      //点击的元素变换样式
      $(this).css({border:'.04rem solid rgba(91, 223, 195, 1)'});
      //获取当前是第几道题
      let problemIndex = Number($('.optionBox').attr('index'));
      //获取选择的是第几个答案
      let answerIndex = String($(this).attr('index'));
      
      nextProblem(_this, problemIndex, answerIndex);
    })
    
    function nextProblem(_this,problemIndex,answerIndex){
      let index = problemIndex; //拿到当前题目排序，进行累计计算
      index+=1; 
      if(index < 6){
        //标志下一道题
        $('.optionBox').attr('index', index);
        _this.resultAnswer.push(answerIndex);
        //传入下一道题是第几道题
        answer.animate(index);
      }else{
        index = 4;
      }
      if(index != 4){
        $("#nextBtn").unbind('click');
      }
    }
  }

  //下一题
  answer.prototype.animate = function(index){
    let that = this;
    if(index == 5){
      var no1Answer = that.resultAnswer[0];
      var no2Answer = that.resultAnswer[1];
      var no3Answer = that.resultAnswer[2];
      var no4Answer = that.resultAnswer[3];
      var no5Answer = that.resultAnswer[that.resultAnswer.length-1];
      that.resultAnswer = [];
      that.resultAnswer.push(no1Answer);
      that.resultAnswer.push(no2Answer);
      that.resultAnswer.push(no3Answer);
      that.resultAnswer.push(no4Answer);
      that.resultAnswer.push(no5Answer);
      console.log(that.resultAnswer,1002)
      //编辑数据
      let userInfo = JSON.parse(localStorage.userInfo);
      let openId = userInfo.openid;
      let data = {
        "openId": openId,
        "typeIds": that.resultAnswer
      }
      return false;
    }

    //下一题显示:  1.恢复选项默认边框
    for(let i = 0; i < $('.optionBox li').length; i++){
      $('.optionBox li').css({border:'.04rem solid rgba(128, 128, 128, 1)'})
    }
    //2. 第几道题数 eg: case :1 进入第2道题,将第1题答案提交保存，以此类推
    switch (index){
      case 1:
        console.log("开始第2题！保存第1题答案！并显示第2题");
        $('#questionNum').html('2');
        var no1Answer = that.resultAnswer[that.resultAnswer.length-1];
        that.resultAnswer = [];
        that.resultAnswer.push(no1Answer);
        console.log(that.resultAnswer,1003)
        //将第2题答案添加至选项中
        $(".option").each(function(index, item){
          $(item).attr('src',that.imgs[index+5])
        })
        //开始第二题动画渐淡渐出,1.添加音乐数组第1个
        nextAnimate(1)
        //显示'上一步'按钮
        $('#preBtn').css({display:'inline-block'});
        break;
      case 2:
        console.log("设置第3题！保存第1，2题答案！并显示第3题");
        $('#questionNum').html('3');
        var no1Answer = that.resultAnswer[0];
        var no2Answer = that.resultAnswer[that.resultAnswer.length-1];
        that.resultAnswer = [];
        that.resultAnswer.push(no1Answer);
        that.resultAnswer.push(no2Answer);
        //将第3题答案添加至选项中
        $(".option").each(function(index, item){
          $(item).attr('src',that.imgs[index+9])
        })
        nextAnimate(2);
        break;
      case 3:
        console.log("设置第4题！保存第1，2，3题答案！并显示第4题");
        $('#questionNum').html('4');
        var no1Answer = that.resultAnswer[0];
        var no2Answer = that.resultAnswer[1];
        var no3Answer = that.resultAnswer[that.resultAnswer.length-1];
        that.resultAnswer = [];
        that.resultAnswer.push(no1Answer);
        that.resultAnswer.push(no2Answer);
        that.resultAnswer.push(no3Answer);
        //将第4题答案添加至选项中
        $(".option").each(function(index, item){
          $(item).attr('src',that.imgs[index+13])
        })
        nextAnimate(3);
        break;
      case 4:
        console.log("设置第5题！保存第1，2，3，4，题答案！并显示第5题");
        $('#questionNum').html('5');
        var no1Answer = that.resultAnswer[0];
        var no2Answer = that.resultAnswer[1];
        var no3Answer = that.resultAnswer[2];
        var no4Answer = that.resultAnswer[that.resultAnswer.length-1];
        that.resultAnswer = [];
        that.resultAnswer.push(no1Answer);
        that.resultAnswer.push(no2Answer);
        that.resultAnswer.push(no3Answer);
        that.resultAnswer.push(no4Answer);
        //将第4题答案添加至选项中
        $(".option").each(function(index, item){
          $(item).attr('src',that.imgs[index+17])
        })
        nextAnimate(4);
        $('#preBtn').css({'margin-right':'.1rem'})
        //显示提交‘按钮’
        $('#submit').css({'display':'inline-block'});
        break;    
    }

    function nextAnimate(musicIndex) {
      //切换音效,并播放
      $('#music').attr('src',that.other_musics[musicIndex]);
      $('#answer-bgm').load();

      //显示'暂停'按钮
      $('#off').addClass('hide');
      $('#on').removeClass('hide');

      // 选项可以选择
      $('#preBtn').css({opacity:1})
    }
  }

  answer.prototype.submit = function() {
    let that = this;
    $('#submit').bind('click',function() {
      console.log('开始提交！')
      if(that.resultAnswer && that.resultAnswer.length == 5){
        let resultAnswerStr = that.resultAnswer.join('');
        //结果页跳转
        try {
          //获取ueserInfo
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          console.log('用户信息：'+ userInfo)
          console.log('openid:'+ userInfo.openid)
          let data ={
            "openId": userInfo.openid,
            "typeIds": that.resultAnswer
          };
          //提交数据
          answer.onRequest(requestUrl.submit,data,function(datas){
            console.log("提交答案，返回数据：")
            console.log(datas)
            if(datas.code == "OK"){
              //结果页跳转
              if(testSurr()){
                 window.location.replace( testSurr() + '/molly-cell-lab/result/result.html' + '?val=' + resultAnswerStr);
              }
            }else{
              console.log(datas.code+":"+datas.message);
            }
          })
        }catch(err){
          console.log('错误：'+ err);
        }
        
      }else{
        console.log('所选答案：'+ that.resultAnswer);
        // alert("请选择正确答案");
        // if(testSurr().indexOf('http') != -1){
        //   window.location.href = "http://molly-h5-test.happysyrup.com/molly-cell-lab/";
        // }else{
        //   window.location.href = "https://molly-h5.happysyrup.com/molly-cell-lab/";
        // }
      }
    })
  }

  //上一题
  answer.prototype.prevProblem = function(){
    let that = this;
    let currentProblemIndex = $('.optionBox').attr('index');
    console.log(currentProblemIndex)
    switch (currentProblemIndex){
      case '1':
        back(0,0,1);
        break;
      case '2': 
        back(1,1,5);
        break;
      case '3':
        back(2,2,9);
        break;
      case '4':
        back(3,3,13);
        break;
      case '5':
        back(3,3,13);
        break;
    }
    //淡入淡出'返回上一题'动画
    function back(index,musicIndex,imgIndex){
      if(index == 0){
        //返回到第1题
        $('#preBtn').css({'display':'none'});
        $('#submit').css({'display': 'none'});
        $('#questionNum').html('1');
      }else{
        $('#submit').css({'display':'none'});
        $('#preBtn').css({'opacity':1,'margin-right':0});
        if(index == 3){
          $('#nextBtn').attr('src',imageStr + '/nextBtn.png');
        }
        let int = (index+1);
        $('#questionNum').html(int);
      }
      //清除上一题所选答案(每次删除最后一个所选答案)
      that.resultAnswer.pop();
      console.log(that.resultAnswer)
      //重新设置题数
      $('.optionBox').attr('index',index);
      
      //li 默认样式
      $('.optionBox li').css({border:'.04rem solid rgba(128, 128, 128, 1)'});
      //img图片更换
      $(".option").each(function(index, item){
        $(item).attr('src',that.imgs[imgIndex + index])
      })
      //切换第1题音效,并播放
      $('#music').attr('src',that.other_musics[musicIndex]);
      $('#answer-bgm').load();
    
      //显示'已开启'的播放按钮
      $('#off').addClass('hide');
      $('#on').removeClass('hide');
    }
  }

  var answer = new answer();
  answer.getCode();
  answer.musicOnOff();
  answer.clickOptions();
  answer.submit();
});