var canvas,stage,game_current,result_current,stageWidth,stageHeight,stageScale,bitmap, urlCode = 'code';// 当urlCode存在时，不再执行getCode
var scale = 1 / window.devicePixelRatio;
document.querySelector('meta[name="viewport"]').setAttribute('content','width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
// 初始化适配Dom - rem
(function (win, doc) {
  var docEl = doc.documentElement;
  function setRemUnit () {
    var docWidth = docEl.clientWidth;
    var rem = docWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }
  win.addEventListener('resize', function () {
    setRemUnit();
  }, false);

  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  }, false);
 
  setRemUnit();
 
  if (win.devicePixelRatio && win.devicePixelRatio >= 2) {
    var testEl = doc.createElement('div');
    var fakeBody = doc.createElement('body');
    testEl.style.border = '0.5px solid transparent';
    fakeBody.appendChild(testEl);
    docEl.appendChild(fakeBody);
    if (testEl.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
}) (window, document);

/*
  canvas设备适配
  逻辑：
    一. 进入主页 -> 隐藏canvas
                -> 禁止主页滑动
                -> 获取设备信息 ->设置主页Bg图片,按钮
    二. 雪糕选择页 -> 选择雪糕（暴露选择的‘雪糕对象’） -> 进入故事canvas

*/
~(function init() {
  canvas = document.getElementById("mainView");
  // 隐藏canvas
  $('canvas').attr('class','hide');

  // 首页禁止滑动
  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, {passive: false}); //passive 参数不能省略，用来兼容ios和android

  // 设备判断：1.iphoneX系列，2.iphone普通系列，设置首页bg
  if(mobileType){
    console.log('iphoneX 系列');
    $('#indexBg').attr({'src':'https://cdn.happysyrup.com/brand/qlz2/img/HD/indexBg.jpg','class': 'indexBgX'});
    $('#iceCreamBg').attr({'src':'https://cdn.happysyrup.com/brand/qlz2/img/HD/selectValue.jpg','class': 'selectValueX'});
    $('.device').css({'top':'6.8rem'});
  }else{
    console.log('普通手机系列');
    $('#indexBg').attr({'src':'https://cdn.happysyrup.com/brand/qlz2/img/SD/indexBg.jpg','class': 'indexBg'});
    $('#iceCreamBg').attr({'src':'https://cdn.happysyrup.com/brand/qlz2/img/SD/selectValue.jpg','class': 'selectValue'});
  };
  
  // 小星星闪起来
  showHideStar($('.option_0'),600,500);
  showHideStar($('.option_1'),1500,500);
  showHideStar($('.option_2'),1800,500);
  showHideStar($('.option_3'),1000,500);
  showHideStar($('.option_4'),800,500);
  showHideStar($('.option_5'),1000,500);
  /*
    小星星渐隐渐显
      obj: 星星对象
      startTime: 循环执行时间
      time: 渐隐渐显时间ms
  */
  function showHideStar(obj, startTime, speed){
    let timer = setInterval(function(){
      obj.fadeIn(speed,function(){
        obj.fadeOut(speed);
      })
    },startTime);
  }

  // 初始化雪糕选择
  let elementArr = [], swipeable = true;
  window.onload = function () {
    let ele1 = document.querySelector('.ice-box img:nth-child(1)');
    let ele2 = document.querySelector('.ice-box img:nth-child(2)');
    let ele3 = document.querySelector('.ice-box img:nth-child(3)');
    let ele4 = document.querySelector('.ice-box img:nth-child(4)');
    elementArr.push(ele1);
    elementArr.push(ele2);
    elementArr.push(ele3);
    elementArr.push(ele4);
    touch.on('.ice-box', 'swipeleft', function (ev) {
      // console.log('swipeleft')
      if (swipeable) {
        swipeable = false;
        leftMove();
        setTimeout(function () {
          swipeable = true;
          currentItem();
        }, 800);
      }
    })
    touch.on('.ice-box', 'swiperight', function (ev) {
      // console.log('swiperight')
      if (swipeable) {
        swipeable = false;
        rightMove();
        setTimeout(function () {
          swipeable = true;
          currentItem();
        }, 800);
      }
    })
  }
  function rightMove() { // 'translateZ(0) translateX(-0.2rem) translateY(1rem) scale(0.6)
    let img4 = elementArr[3];
    img4.style.transform = 'translateZ(0px) translateX(-0.65rem) translateY(3.2rem) scale(1)';
    img4.style.transition = ' transition: transform 0.8s ease'
    img4.style.zIndex = '-1';

    let img1 = elementArr[0];
    img1.style.transform = 'translateZ(0.65rem) translateX(-1.43333333rem) translateY(0) scale(0.8)';
    img1.style.transition = ' transition: transform 0.8s ease';
    img1.style.zIndex = '-1';

    let img2 = elementArr[1];
    img2.style.transform = 'translateZ(0.66666667rem) translateX(0) translateY(0) scale(1)';
    img2.style.transition = ' transition: transform 0.8s ease'
    img2.style.zIndex = '0'

    let img3 = elementArr[2];
    img3.style.transform = 'translateZ(0.65rem) translateX(1.43333333rem) translateY(0) scale(0.8)';
    img3.style.transition = ' transition: transform 0.8s ease'
    img3.style.zIndex = '0'

    let ele = elementArr.pop();
    elementArr.unshift(ele);
  }

  function leftMove() {
    let img4 = elementArr[3];
    img4.style.transform = 'translateZ(0.66666667rem) translateX(0) translateY(0) scale(1)';
    img4.style.transition = ' transition: transform 0.8s ease'
    img4.style.zIndex = '0';

    let img1 = elementArr[0];
    img1.style.transform = 'translateZ(0.65rem) translateX(1.43333333rem) translateY(0) scale(0.8)';
    img1.style.transition = ' transition: transform 0.8s ease';
    img1.style.zIndex = '-2';

    let img2 = elementArr[1];
    img2.style.transform = 'translateZ(0px) translateX(-0.65rem) translateY(3.2rem) scale(1)';
    img2.style.transition = ' transition: transform 0.8s ease'
    img2.style.zIndex = '-1'

    let img3 = elementArr[2];
    img3.style.transform = 'translateZ(0.65rem) translateX(-1.43333333rem) translateY(0) scale(0.8)';
    img3.style.transition = ' transition: transform 0.8s ease'
    img3.style.zIndex = '0'
    elementArr.push(elementArr.splice(0, 1)[0]);
  }

  function currentItem() {
    cur_selectValue = $(elementArr[2]).data('size');
    $('.iceCream_name').html( $(elementArr[2]).attr('data-iceCream_name') );
    $('.iceCream_scenes').html( $(elementArr[2]).attr('data-iceCream_scenes') );
  }

  // 绑定 ‘进入场景页’ 按钮事件
  $('.gotoScenes').on('click',()=>{
    $('#iceCreamBox').attr('class','hide');
    if($('canvas').hasClass('hide')){
      $('canvas').removeClass('hide');
      if(iceCreamValue == ''){
        iceCreamValue = iceCreamData[cur_selectValue];
      };
      console.log('所选雪糕对象：');console.info(iceCreamValue);
      showResultText['storyName'] = iceCreamValue['title'];
      showResultText['icreamValue'] = iceCreamValue['icreamValue'];
      // 设备判断：1.iphoneX系列，2.iphone普通系列，设置首页bg
      if(mobileType){
        qlzRpg_manifest = iceCreamValue.qlzRpg_manifest_x;
      }else{
        qlzRpg_manifest = iceCreamValue.qlzRpg_manifest_pluse;
      };
      console.log('加载场景素材：');console.info(qlzRpg_manifest);
      // 动态创建js
      loadScript('mainJS/data.js', function () {
        loadScript('mainJS/preLoad.js', function () {
          loadScript('mainJS/main.js',()=>{console.log('js全部加载完毕')}); 
        })
      });
      // 加载场景素材，显示loading
      $('#loading').removeClass('hide');
      // 显示canvas场景舞台, 
      $('canvas').removeClass('hide');
      console.log('显示canvas');
    }
  })

  // 动态创建js
  function loadScript(src, callback) {
    var script = document.createElement('script'),
      body = document.getElementsByTagName('body')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
      script.addEventListener('load', function () {
        if(callback)callback();
      }, false);
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
        var target = window.event.srcElement;
        if (target.readyState == 'loaded') {
          callback();
        }
      });
    }
    body.appendChild(script);
  }
  // createjs.StageGL(canvas,{preserveBuffer:true,antialias:true});
  stage = new createjs.Stage(canvas);//StageGL: 导出图片需要开启preserveBuffer，和抗锯齿antialias
  createjs.Touch.enable(stage, true, false);
  createjs.Ticker.timingMode =  createjs.Ticker.RAF;
  createjs.MotionGuidePlugin.install(); // 使用引导层 必须在初始化中写上
  createjs.Ticker.framerate = 30;       // setting - fps
  game_current = new createjs.Container();
  stage.setTransform()
  stage.addChild(game_current);
  stageBreakHandler();
  createjs.Ticker.addEventListener("tick", stageBreakHandler);
  // FPS.startFPS(stage);
})()

function stageBreakHandler(event){
  if(stageWidth!=document.documentElement.clientWidth||stageHeight!= document.documentElement.clientHeight)
  {
    resize();
  }
  if(game_current) game_current.cache( 0, 0, stageWidth, stageHeight);
  stage.update();
}

function resize() {
  stageWidth =  document.documentElement.clientWidth;
  stageHeight = document.documentElement.clientHeight;
  //外部元素自适应
  canvas.width = stageWidth ;
  canvas.height = stageHeight;
  stageScale = stageWidth/750;
  // stageScale = stageHeight/1206;// 高度自适应两者选一
  game_current.scaleX = stageScale;
  game_current.scaleY = stageScale;
  // stage.updateViewport(canvas.width,canvas.height); //StageGL 用updateViewport
  stage.update();
  // game_current.x = (stageWidth -  750*game_current.scaleX)/2;//高度自适应时解开这个注释 保证图片居中
}