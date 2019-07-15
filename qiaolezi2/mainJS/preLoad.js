var replayBtn = null, sndBtn, nosndBtn, replayBtn_click, current_level = 0,
  current_answerIndex = 0, gradeTime = 0, dateTimer = null, gameIsEnd = false,
  loadEffectSound = false, images = []; //images:一些静态文件

var allSounds = {
  sndUrl: "sounds/",
  sndBgId: "soundBg",
  sndBgSrc: gameAllConfig.sndBgSrc,
  sndBgInstance: null,                            // 游戏背景音函数
  // effectSoundInstance: null,                      // 游戏音效函数
  // effectSoundsId: "effectSound",
  // effectSoundsFile: gameAllConfig.effectSoundsFile,// 游戏音效文件,
  // effectData: gameAllConfig.effectData,
  isMute: false
}

var gameManifest, function_prepWorld = null;
var load_preload = new createjs.LoadQueue(false);
var main_preload = new createjs.LoadQueue(false);
createjs.Ticker.addEventListener("tick", main_ticker);
var loadAnimation = null;
function addSoundsEffect() {
  createjs.HTMLAudioPlugin.enableIOS = true;
  var sounds = [
    {
      id: allSounds.sndBgId,
      src: allSounds.sndBgSrc
    },
    {
      id: allSounds.effectSoundsId,
      src: allSounds.effectSoundsFile,
      data: {
        audioSprite: allSounds.effectData
      }
    }
  ]

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", function (o) {
    if (o.id == "effectSound") {
      loadEffectSound = true;
    } else {
      // allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
    }
  });
  createjs.Sound.registerSounds(sounds, allSounds.sndUrl);  // register sounds, which preloads by default
}

function playBgSound() {
  allSounds.sndBgInstance = createjs.Sound.play(allSounds.sndBgId, {loop: -1, volume: 0.2});
}

function stopBgSound() {
  allSounds.sndBgInstance.stop();
}

function playEffectSound(id, callback) {
  if (allSounds.effectSoundInstance) {
    allSounds.effectSoundInstance.stop();
  }
  allSounds.effectSoundInstance = createjs.Sound.play(id);
  if (callback) {
    allSounds.effectSoundInstance.addEventListener("complete", callback);
  }
}

function muteBgSound() {
  if (allSounds.isMute) {
    nosndBtn.visible = false;
    sndBtn.visible = true;
    playBgSound();
  } else {
    nosndBtn.visible = true;
    sndBtn.visible = false;
    stopBgSound();
  }
  allSounds.isMute = !allSounds.isMute;
}

load_preload.loadManifest(gameAllConfig.loadManiFest);     // 定义加载列表
load_preload.addEventListener("complete", handleMainLoad); // 加载完成固定元素素材

function handleMainLoad(o) {
  // addSoundsEffect();
  gameManifest = gameAllConfig[gameAllConfig.name + "_manifest"]; // 加载对应场景素材
  // gameAllConfig.loadSprite();
  document.getElementById("mainView").style.zIndex = 100;

  //重玩按钮
  // replayBtn = new createjs.Bitmap(load_preload.getResult("replay-btn"));
  // replayBtn.visible = true;
  // replayBtn.regX = replayBtn.image.width / 2;
  // replayBtn.regY = replayBtn.image.height / 2;
  // replayBtn.x = 230;
  // replayBtn.y = 60;
  // replayBtn.addEventListener("click", function () {
  //   gameReplay();
  //   replayBtn_click.visible = true;
  //   createjs.Tween.get(this)
  //     .call(function () {
  //       replayBtn.visible = false;
  //       replayBtn_click.visible = true;
  //     })
  //     .wait(500)
  //     .call(function () {
  //       replayBtn.visible = true;
  //       replayBtn_click.visible = false;
  //     })
  // })

  // replayBtn_click = new createjs.Bitmap(load_preload.getResult("replay-click"));
  // replayBtn_click.visible = false;
  // replayBtn_click.regX = replayBtn_click.image.width / 2;
  // replayBtn_click.regY = replayBtn_click.image.height / 2;
  // replayBtn_click.x = 230;
  // replayBtn_click.y = 60;

  // 背景音乐按钮
  // sndBtn = new createjs.Bitmap(load_preload.getResult("snd-btn"));
  // sndBtn.regX = sndBtn.getBounds().width / 2;
  // sndBtn.regY = sndBtn.getBounds().height / 2;
  // sndBtn.x = 310;
  // sndBtn.y = 60;
  // sndBtn.addEventListener("click", muteBgSound)

  // nosndBtn = new createjs.Bitmap(load_preload.getResult("nosnd-btn"));
  // nosndBtn.visible = false;
  // nosndBtn.regX = nosndBtn.getBounds().width / 2;
  // nosndBtn.regY = nosndBtn.getBounds().height / 2;
  // nosndBtn.x = 310;
  // nosndBtn.y = 60;
  // nosndBtn.addEventListener("click", muteBgSound);

  main_preload.addEventListener("fileload", handleFileLoad); // 加载静态资源
  main_preload.addEventListener("complete", handleComplete); // 加载完成静态资源，开始加载其他资源
  main_preload.loadManifest(gameManifest); // 队列场景对应素材
}

function handleFileLoad(o) {
  // 将场景对应素材放入images中
  if (o.item.type == createjs.LoadQueue.IMAGE) {
    images[o.item.id] = o.result;
    images.push(o.result);
    images[images.length - 1].id = o.item.id;
  }
}

function handleComplete() {
  // if (!isIOS()) {
  //   playBgSound();
  // }
  // 场景素材加载完毕，关闭dom_Loading
  $('#loading').attr({'class':'hide'});
  gameSprites();
  // stage.addChild(sndBtn);
  // stage.addChild(nosndBtn)
  // stage.addChild(replayBtn);
  // stage.addChild(homeBtn);
  // stage.addChild(replayBtn_click);
  // stage.addChild(homeBtn_click);
  // stage.setChildIndex(replayBtn, stage.children.length - 1);
  // stage.setChildIndex(homeBtn, stage.children.length - 1);
  function_prepWorld = "game_" + gameAllConfig.name;
  mainWorld();
}

function main_ticker() {
  stage.update();
}

function mainWorld() {
  game_current.removeAllChildren();
  if (typeof(window[function_prepWorld]) === "function") window[function_prepWorld]();
}

// 加载loading 同时执行init
function handleLoadSprite(spriteSheet, callback) {
  game_current.removeChild(loadAnimation);
  var sprite = new createjs.Sprite(spriteSheet, "play");
  var spriteBounds = sprite.getBounds();
  sprite.regX = spriteBounds.width / 2;
  sprite.regY = spriteBounds.height / 2;
  sprite.scaleX = canvas.width / spriteBounds.width;
  sprite.scaleY = canvas.height / spriteBounds.height;
  sprite.x = canvas.width / 2;
  sprite.y = canvas.height / 2;
  game_current.addChild(sprite);
  game_current.setChildIndex(sprite, game_current.children.length - 1);
  if (callback)callback();
  createjs.Tween.get(sprite)
    .wait(3000)
    .call(function () {
      game_current.removeChild(sprite);
    })
}

// 切关的动画
function switchAnimation(spritesheet, callback) {
  if (spritesheet) {
    var animate = new createjs.Sprite(spritesheet, "play");
    animate.scaleX = stage.canvas.width / animate.getBounds().width;
    animate.scaleY = stage.canvas.height / animate.getBounds().height;
    game_current.addChild(animate);
    animate.addEventListener("animationend", function () {
      game_current.removeChild(this);
    })
  }
  if (callback)callback();
}

//创建mask异常提示
function createMask(text,x,y,fun) {
  var mask = new createjs.Shape();
  var dialogCon = new createjs.Container();
  var text = new createjs.Text(text, '30px Arial', '#fff');
  var textBg =  new createjs.Bitmap('./img/abnormalBg.png');
  text.x = x;text.y = y;
  textBg.x = 120;textBg.y = 300;
  dialogCon.addChild(textBg,text);
  mask.graphics.beginFill("#000000").drawRect(0, 0, canvas.width, canvas.height)
  mask.alpha = 0.5;
  mask.on('click',function(){
    game_current.removeChild(mask,dialogCon);
    gameReplay();// 重玩
    stage.update();
  })
  game_current.addChild(mask,dialogCon);
  game_current.setChildIndex(mask, game_current.children.length - 2);
  game_current.setChildIndex(dialogCon, game_current.children.length - 1);
  stage.update();
}

function isIOS() {
  var UA = navigator.userAgent;
  if (UA.match(/iPad/i) || UA.match(/iPhone/i) || UA.match(/iPod/i)) {
    return true;
  } else {
    return false;
  }
}

//所有动图
function gameSprites() {
  if (typeof(gameAllConfig[gameAllConfig.name + "_spritesheets"]) == "function") {
    gameAllConfig[gameAllConfig.name + "_spritesheets"]();
  }
}

//重玩
function gameReplay() {
  window.location.reload();
  // $('#one').attr('class','hide');
  // $('#mainView').attr('class','hide');
  // $('#iceCreamBox').removeClass('visible');
  // $('#iceCreamBox').removeClass('hide');
  // $('#resultBtn').attr('class','hide'); // 隐藏按钮
  // $('.resultImg').remove(); // 结果页图删除
  // game_current.removeAllChildren();
  // mainWorld();
}


//获取游戏ID
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}


var show = {
  gameBg: function (bitmap,cb) {
    var gameBg = new createjs.Bitmap(images[bitmap]);
    // gameBg.scaleX = canvas.width / gameBg.image.width;
    // gameBg.scaleY = canvas.height / gameBg.image.height;
    gameBg.cache(0, 0,  gameBg.image.width, gameBg.image.height);
    game_current.addChild(gameBg);
    if(cb)cb(gameBg);
  }
}


// 创建每张图片切换的过渡动画（遮罩）
function overAnimate(callback) {
  game_current['_listeners']['click'] = [];
  // console.log(game_current['_listeners']);
  let alpha = 0;
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#000").drawRect(0, 0, canvas.width, canvas.height);
  shape.alpha = alpha;
  game_current.addChild(shape);
  game_current.setChildIndex(shape, game_current.children.length - 1);
  game_current.mask = alpha;
  stage.update();
  let timer = setInterval(()=>{
    alpha+=.1;
    shape.alpha = alpha;
    if(alpha >= 1){
      clearInterval(timer);
      if(callback)callback();
      game_current.removeChild(shape);
    }
  },30);
}

//向服务器传送数据
function toServerData(scoreData) {
  if (scoreData) {
    if (scoreData.score > 100) {
      scoreData.score = 100;
    }
    $.ajax({
      type: "POST",
      url: "/learning/create_game_record/",
      data: scoreData,
      success: function (result) {
        if (result.success) {
          // console.log("data to server success");
          reward.url = result.redirect_url;
          reward.waterList = result.waterList;
          show.gameReward(reward, gameAllConfig.rewardPosition, gameOverAnimation, 36, "#3c3c3c")
        }
      },
      error: function () {
        var result = {
          "waterList": [{"count": 3, "type": "mineral"}],
          "redirect_url": "/learning/student_navigation/",
          "success": true
        };
        reward.url = result.redirect_url;
        reward.waterList = result.waterList;
        show.gameReward(reward, gameAllConfig.rewardPosition, gameOverAnimation, 36, "#3c3c3c")
      }
    })
  }
}

//动画结束后/或直接将游戏数据传到后台
function scoreToServer(scoreData, spriteSheet, callback) {
  game_current.removeAllChildren();
  if (spriteSheet) {//播放结束动画
    if (callback) {
      callback(scoreData, spriteSheet)
    } else {
      var sprite = new createjs.Sprite(spritesheets[spriteSheet], "play");
      var _spriteBounds = sprite.getBounds();
      sprite.regX = _spriteBounds.width / 2;
      sprite.regY = _spriteBounds.height / 2;
      sprite.x = canvas.width / 2;
      sprite.y = canvas.height / 2;
      game_current.addChild(sprite);
      sprite.addEventListener("animationend", function () {
        game_current.removeChild(this);
        toServerData(scoreData);
      })
    }
  } else {
    toServerData(scoreData)
  }
}