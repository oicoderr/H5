/*
    canvas-img: dom-to-image [https://cnpmjs.org/package/dom-to-image]
    author: dw
    time: 2019年9月2日
*/

//是否正在直行点击操作
var isOptioning = false;

'use strict';
(function() {
  function Event() {
    // 定义的事件与回调
    this.defineEvent = {};
    // 定义绘画状态
    this.isDrawRocket = false;
    this.isDrawBg = false;
  }

  Event.prototype = {
    constructor: Event,
    on: function(event, cb) {
      this.register(event, cb); // 注册一个事件名字和回调
    },

    dispatch: function(event, arg) {
      // 分派事件
      if (this.defineEvent[event]) {
        {
          for (var i = 0, len = this.defineEvent[event].length; i < len; ++i) {
            this.defineEvent[event][i](arg);
          }
        }
      }
    },

    register: function(event, cb) {
      !this.defineEvent[event] ? (this.defineEvent[event] = [cb]) : this.defineEvent[event].push(cb);
    },
    removeEvent: function() {
      //销毁自定义事件
      for (var i in this.defineEvent) {
        delete this.defineEvent[i];
      }
    },

    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }
  };

  function RocketGame(allTime, propMill, score) {
    this.speed = 10; // 默认速度
    this.integral = 0; // 默认积分
    this.addIntegral = 4; // 单位积分增量
    this.reduceIntegral = 2; // 单位积分减量
    this.backdrop; // 背景图
    this.tmp = [];
    this.easel = $('gameView'); // 画布

    this.leftBtn = $('.leftBtn');
    this.rightBtn = $('.rightBtn');
    this.stage = new createjs.Stage('gameView');

    this.changem; // 清积分
    this.props = []; // 存放道具
    this.propsTmp = []; // 存放临时数组
    this.showOne = 1;
    this.crash = {
      // 所有物体占的位置,用于碰撞检测
      rocket: {},
      obstacle: []
    };
    this.objCash = []; // 障碍物缓存

    this.quickstate; // 加速的定时
    this.slowstate;

    this.propMill = propMill; // 道具增加或减少路程的值
    this.score = score; // 积分默认值
    this.allTime = allTime; // 倒计时间

    createjs.Touch.enable(this.stage, true, false);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.MotionGuidePlugin.install(); // 使用引导层 必须在初始化中写上
    createjs.Ticker.framerate = 30; // setting - fps
    // FPS.startFPS(this.stage);

    //自定义事件监听
    this.event = new Event();
  }

  RocketGame.prototype = {
    // 初始化
    init: function(manifest) {
      var that = this;
      if (!this.easel) {
        // 缺少画布，初始化失败
        // console.log('缺少画布，初始化失败');
        return;
      }
      this.preLoad(manifest);
      $('#loading').removeClass('hide');
      let timer = setInterval(() => {
        if (this.isDrawRocket && this.isDrawBg) {
          $('#loading').addClass('hide');
          // 显示操作提示
          $('#operation_promptWarp').removeClass('hide');
          $('#operation_promptWarp .imOk').on('click', () => {
            $('#operation_promptWarp').addClass('hide');
            that.event.dispatch('prepareComplete');
            // 恢复动画
            createjs.Ticker.paused = 0;
            console.warn('总时间：' + that.allTime);
            that.gameTime(that.allTime, that.allTime);
          });
          this.bindEvent();
          clearInterval(timer);
        }
      }, 50);
    },

    // 绑定事件
    bindEvent: function() {
      var cw = Math.min(document.body.clientWidth, 540),
        that = this,
        ratio = 750 / cw,
        startX,
        startY,
        islock;

      this.leftBtn.on('click', goLeft); // this.easel handleTouchStart touchstart
      this.rightBtn.on('click', goRight); // this.easel handleTouchMove touchmove

      // 滑动变道
      function handleTouchStart(e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        startX = touch.pageX * ratio;
        startY = touch.pageY * ratio;
        islock = 0;
      }

      function handleTouchMove(e) {
        e.preventDefault();
        if (islock) return;
        var touch = e.targetTouches[0],
          x = touch.pageX * ratio;

        if (x - startX >= 30) {
          // console.log('向右')
          islock = 1;
          that.turnRight(); // 向右
        } else if (x - startX <= -30) {
          // console.log('向左')
          that.turnLeft();
          islock = 1;
        }
      }
      // 按钮变道
      function goLeft(e) {
        e.preventDefault();
        that.turnLeft(); // 向左
        islock = 1;
      }

      function goRight(e) {
        e.preventDefault();
        islock = 1;
        that.turnRight(); // 向右
      }
    },

    // 预加载图片
    preLoad: function(manifest) {
      this.queue = new createjs.LoadQueue(false);
      this.queue.on('complete', handleComplete, this);
      this.queue.loadManifest(manifest);

      // 资源加载成功后
      function handleComplete() {
        var rocket = this.queue.getResult('rocket'),
          prop_add = this.queue.getResult('prop_add'),
          prop_reduce = this.queue.getResult('prop_reduce'),
          bg = this.queue.getResult('bg'),
          jet = this.queue.getResult('jet'),
          explosionSpriteBitmap = this.queue.getResult('explosion'),
          bgLong = this.queue.getResult('bgLong');

        // 障碍物
        var obj = {
          quickObject: [
            {
              type: '加分道具',
              target: this.queue.getResult('prop_add')
            }
          ],
          slowObject: [
            {
              type: '减分陨石',
              target: this.queue.getResult('prop_reduce')
            }
          ]
        };
        let explosionSpriteSheet = new createjs.SpriteSheet({
          //爆炸动画
          images: [explosionSpriteBitmap],
          frames: [
            [506, 254, 250, 250],
            [254, 758, 250, 250],
            [758, 254, 234, 234],
            [254, 506, 250, 250],
            [254, 254, 250, 250],
            [758, 2, 250, 250],
            [506, 2, 250, 250],
            [254, 2, 250, 250],
            [2, 758, 250, 250],
            [2, 506, 250, 250],
            [2, 254, 250, 250],
            [2, 2, 250, 250]
          ],
          animations: {
            play: {
              frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
              speed: 0.1,
              next: false
            }
          }
        });

        this.drawBg(bg, bgLong, explosionSpriteSheet);
        this.drawRole(rocket, prop_add, prop_reduce, jet, explosionSpriteSheet);
        this.drawObstacle(obj);
        this.pause();
      }
    },

    // 是否重叠  参数， 一个车，一个障碍物
    // 重叠返回 true，不重叠返回false
    isCrash: function(rocket, obst) {
      var carXmax = Math.max(rocket.x[0], rocket.x[1]),
        carYmax = Math.max(rocket.y[0], rocket.y[1]),
        carXmin = Math.min(rocket.x[0], rocket.x[1]),
        carYmin = Math.min(rocket.y[0], rocket.y[1]),
        obstXmin = Math.min(obst.x[0], obst.x[1]),
        obstYmin = Math.min(obst.y[0], obst.y[1]),
        obstXmax = Math.max(obst.x[0], obst.x[1]),
        obstYmax = Math.max(obst.y[0], obst.y[1]);

      if (obstXmin < carXmax && obstXmax > carXmin && (obstYmin < carYmax && obstYmax > carYmin)) {
        // console.error('碰撞了');
        return {
          status: true,
          obj: obst,
          item: obst.item
        };
      }
      return false;
    },

    // 批量销毁
    destroy: function() {
      createjs.Ticker.removeEventListener('tick', this.tick);

      //暂停里程，倒计时
      clearInterval(this.changem);
      clearTimeout(this.gametime);

      this.stage.update();
      createjs.Ticker.paused = 1;
    },

    // 绘制背景
    drawBg: function(bg, bgLong) {
      let windHeight = $(document).height();
      let mobileType = MobileDevice.getModels(); // 机型
      var that = this,
        i = 1;
      this.backdrop = new createjs.Bitmap(bg);
      this.backdrop.x = 0;
      this.w = bg.width;
      this.h = bg.height;
      //创建一个背景副本，无缝连接
      var copyy = -bgLong.height - windHeight + 128;
      if (mobileType) {
        // iphoneX
        copyy = -bgLong.height - windHeight + 128 * 3.5;
        this.backdrop.y = -windHeight + 128 * 3.5;
      } else {
        copyy = -bgLong.height - windHeight + 128;
        this.backdrop.y = -windHeight + 128;
      }
      this.stage.addChild(that.backdrop);
      this.copy = new createjs.Bitmap(bgLong);
      this.copy.x = 0;
      this.copy.y = copyy;
      that.stage.addChild(that.backdrop);
      that.stage.addChild(that.copy);

      createjs.Ticker.addEventListener('tick', tick);
      that.stage.update();
      this.isDrawBg = true;
      function tick(e) {
        if (e.paused !== 1) {
          // 舞台逐帧逻辑处理函数
          that.backdrop.y = that.speed + that.backdrop.y;
          that.copy.y = that.speed + that.copy.y;

          if (that.copy.y > -40) {
            that.backdrop.y = that.copy.y + copyy;
          }
          if (that.copy.y > -copyy - 100) {
            that.copy.y = copyy + that.backdrop.y;
          }
          // 障碍物逐帧逻辑处理函数
          var i,
            len = that.props.length;
          for (i = 0; i < len; i++) {
            if (that.props[i]) {
              that.props[i].y += that.speed;
              // 实时更新障碍物的位置
              that.crash.obstacle[i] = {
                x: [that.props[i].x, that.props[i].x + 110],
                y: [that.props[i].y, that.props[i].y + 128]
              };
              // 碰撞检测
              var isc = that.isCrash(that.crash.rocket, that.crash.obstacle[i]);
              if (isc) {
                // 绘制特效
                var name = that.props[i].name;
                if (name == 'quick') {
                  // console.log('加速了');
                  that.changeSpeed('quick', that.props[i].type);
                } else if (name == 'slow') {
                  // console.log('减速了')
                  that.changeSpeed('slow', that.props[i].type);
                }

                that.stage.removeChild(that.props[i]);
                // let rocketRol = that.stage.getChildByName('role');
                // 删除数组的数据
                that.props.splice(i, 1); // splice(i, 1)
                i = i - 1;
              }
            }
          }
          that.stage.update(e);
        }
      }
      this.tick = tick;
    },

    // 绘制火箭 / 爆炸动画
    drawRole: function(rocket, quick, slow, jet, explosionSpriteSheet) {
      let mobileType = MobileDevice.getModels(); // 机型
      var that = this,
        rocketCon = new createjs.Container(),
        roleGroup = new createjs.Container(),
        rocket = new createjs.Bitmap(rocket),
        slow = new createjs.Bitmap(slow),
        jet = new createjs.Bitmap(jet),
        quick = new createjs.Bitmap(quick);
      this.explosionSprite = new createjs.Sprite(explosionSpriteSheet);
      roleGroup.name = 'role';
      rocketCon.name = 'rocketCon';
      jet.x = 37;
      jet.y = 190;
      this.explosionSprite.visible = false;
      this.explosionSprite.x = -60;
      this.explosionSprite.y = -70;
      rocketCon.addChild(jet);
      rocketCon.addChild(rocket);
      rocketCon.addChild(this.explosionSprite);
      console.info(this.explosionSprite);

      let tween = new createjs.Tween.get(jet, { loop: true }).to({ y: 160 }, 500).to({ y: 190 }, 500);
      roleGroup.addChild(rocketCon);
      // 绘制特效
      roleGroup.addChild(quick);
      roleGroup.addChild(slow);
      quick.x = 24;
      quick.y = 40;

      slow.x = 24;
      slow.y = 40;

      quick.name = 'quick';
      slow.name = 'slow';
      quick.visible = false;
      slow.visible = false;
      this, (roleGroup.x = 375 - 50 - 34);
      if (mobileType) {
        // iphoneX
        roleGroup.y = 1344 - 156 - 530 + 150;
      } else {
        roleGroup.y = 1344 - 156 - 740 + 150;
      }
      this.crash.rocket = {
        x: [roleGroup.x, roleGroup.x + 100],
        y: [roleGroup.y, roleGroup.y + 156]
      };
      this.stage.addChild(roleGroup);
      roleGroup.setChildIndex(rocket, roleGroup.children.length - 1);
      // that.stage.update();
      this.isDrawRocket = true;
      // this.stage.setChildIndex(roleGroup,this.stage.children.length - 1);
    },

    // 随机绘制障碍物
    drawObstacle: function(obj) {
      // 随机绘制
      var quick = new createjs.Bitmap(obj.quickObject[0].target),
        slow = new createjs.Bitmap(obj.slowObject[0].target),
        that = this,
        height = $('#gameView').height / 2;
      // 限制不能重复画障碍物
      var len = that.props.length,
        canDraw = false,
        j;
      for (j = 0; j < len; j++) {
        if (that.props[j].y < 100) {
          canDraw = true;
          break;
        }
      }

      if (!canDraw) {
        var num = parseInt(2 * Math.random()) + 1,
          i;
        for (i = 0; i < num; i++) {
          var type = parseInt(10 * Math.random()) + 1;

          // 设置道具出现比例
          if (type >= 1 && type <= 5) {
            // 绘制等分道具
            var qu = quick.clone();
            qu.x = that.getPosition();
            qu.y = 0;
            qu.name = 'quick';
            qu.type = obj.quickObject[0].type;
            qu.integral = obj.quickObject[0].integral;
            that.props.push(qu);
          } else if (type >= 6 && type <= 10) {
            // 绘制减分道具
            var sl = slow.clone();
            sl.x = that.getPosition();
            sl.y = 0;
            sl.name = 'slow';
            sl.type = obj.slowObject[0].type;
            sl.integral = obj.slowObject[0].integral;
            that.props.push(sl);
          }
          that.stage.addChild(that.props[that.props.length - 1]);
          // that.stage.setChildIndex(queue.getResult('rocket'),that.stage.children.length - 1);
        }
      }

      // 删除越界的元素
      for (var i = 0, flag = true, len = that.props.length; i < len; flag ? i++ : i) {
        if (that.props[i]) {
          if (that.props[i].y > height + 300) {
            that.stage.removeChild(that.props[i]);
            that.props.splice(i, 1);
            flag = false;
          } else {
            flag = true;
          }
        }
      }

      var time = parseInt(3 * Math.random()) + 1; //随机取1～3整数

      // 随机时间绘制障碍物
      setTimeout(function() {
        that.propsTmp = []; // 清空
        that.drawObstacle(obj);
      }, time * 400); // 400ms ~ 1200ms
    },

    // 返回随机坐标 x,y
    getPosition: function() {
      var objX,
        idx = parseInt(3 * Math.random()) + 1;

      if (this.propsTmp.indexOf(idx)) {
        this.propsTmp.push(idx);
      } else {
        if (idx != 1) {
          idx = 1;
        } else if (idx != 2) {
          idx = 2;
        } else if (idx != 3) {
          idx = 3;
        }
        this.propsTmp.push(idx);
      }

      switch (idx) {
        case 1:
          objX = 165;
          break;
        case 2:
          objX = 325;
          break;
        case 3:
          objX = 480;
          break;
        default:
          break;
      }
      return objX;
    },

    // 倒计时, 参数总时间  time, 当前时间 nowTime
    gameTime: function(time, nowTime) {
      var that = this;
      nowTime -= 1;
      if (nowTime < 0) {
        that.pause();
        that.event.dispatch('timeout');
        that.gameOver();
      } else {
        this.gametime = setTimeout(function() {
          that.gameTime(time, nowTime);
          $('#integral_clock .clock').html(nowTime);
        }, 1000);
      }
    },

    // 改变速度  参数 quick--加速  slow--变慢  道具名 prop
    changeSpeed: function(speed, prop) {
      var that = this,
        role = this.stage.getChildByName('role');
      this.explosionSprite.visible = true;
      this.explosionSprite.gotoAndPlay();
      this.explosionSprite.on('animationend', function() {
        that.explosionSprite.gotoAndStop();
        // that.explosionSprite.visible = false;
      });
      if (speed == 'quick') {
        // that.speed += 1;
        // if(that.speed > 15){
        //     that.speed = 15;
        // }
        // 增加积分
        that.changeIntegral(role, prop, 'quick');
        // 显示气泡提示
        role.removeChild(that.container);
        that.stage.addChild(role);
        that.showText(role, prop, 'quick');
      }
      if (speed == 'slow') {
        // that.speed -= 1;
        // if(that.speed < 5){
        //     that.speed = 5;
        // }
        // 减少积分
        that.changeIntegral(role, prop, 'slow');
        // 显示气泡提示
        role.removeChild(that.container);
        that.stage.addChild(role);
        that.showText(role, prop, 'slow');
      }
    },

    // 暂停游戏
    pause: function() {
      // 暂停积分，倒计时
      clearInterval(this.changem);
      clearTimeout(this.gametime);

      // 暂停动画
      createjs.Ticker.paused = 1;
      this.propsTmp = [];
    },

    // 重新开始
    reStart: function(manifest) {
      location.reload();
      // this.destroy();
      // this.stage.removeAllChildren();
      // createjs.Ticker.removeEventListener("tick", this.tick);

      // this.props = [];     // 存放道具
      // this.propsTmp = [];  // 存放临时数组
      // this.crash = {       // 所有物体占的位置,用于碰撞检测
      //     rocket: {},
      //     obstacle: []
      // };

      // this.objCash = []; // 障碍物缓存
      // $('#integral_clock .integral').html(0); // reset-Ui
      // $('#integral_clock .clock').html(30);

      // this.event.removeEvent();
      // this.init(manifest);
    },

    turnLeft: function() {

      var rocket = this.stage.getChildByName('role'),
          that = this;
      if (rocket.x < 200) {
        return;
      }

      if(isOptioning){
          return;
      }

      isOptioning = true;

      createjs.Tween.get(rocket).to(
        {
          x: rocket.x - 160
        },
        100
      );

      this.crash.rocket = {
        x: [rocket.x - 160, rocket.x - 160 + 100],
        y: [rocket.y, rocket.y + 156]
      };

      setTimeout(function () {
          isOptioning = false;
      },100);
    },

    turnRight: function() {



      var rocket = this.stage.getChildByName('role');
      if (rocket.x > 400) {
        return;
      }

      if(isOptioning){
            return;
      }

      isOptioning = true;
      createjs.Tween.get(rocket).to(
        {
          x: rocket.x + 160
        },
        100
      );

      this.crash.rocket = {
        x: [rocket.x + 160, rocket.x + 160 + 100],
        y: [rocket.y, rocket.y + 156]
      };

      setTimeout(function () {
          isOptioning = false;
      },100);
    },

    // 游戏结束
    gameOver: function() {
      this.event.dispatch('gameover');
      // 关闭操作提示
      $('#operation_promptWarp').addClass('hide');

      $('.rocket_alert').removeClass('hide');
      $('.rocket_alert_close').on('click', function() {
        $('#J_rocket_lose').addClass('hide');
        $('#shareWrap').removeClass('hide');
      });
      _czc.push(['_trackEvent', '活动', '完成', '完成游戏', 1, 'NYBANK-MID']);
      // 显示排行榜
      this.leaderboard();
      this.destroy();
    },

    //显示提示： 参数 roleGroup -- 汽车对象, obj -- 获得的物体 , speed -- 加速或者减速
    showText: function(roleGroup, obj, speed) {
      let that = this;
      this.container = new createjs.Container();
      var addScoreBitmap = this.queue.getResult('addScore'),
        reduceScoreBitmap = this.queue.getResult('reduceScore');
      this.container.name = 'tip';
      (this.addScore = new createjs.Bitmap(addScoreBitmap)),
        (this.reduceScore = new createjs.Bitmap(reduceScoreBitmap));
      let timer;
      if (speed == 'quick') {
        this.container.addChild(this.addScore);
        timer = setTimeout(() => {
          that.container.removeChild(that.addScore);
          clearTimeout(timer);
          that.stage.update();
        }, 200);
      } else {
        this.container.addChild(this.reduceScore);
        timer = setTimeout(() => {
          that.container.removeChild(that.reduceScore);
          clearTimeout(timer);
          that.stage.update();
        }, 200);
      }
      var w = obj.length * 32 + 20,
        h = 80;

      this.container.y = -100;
      this.container.x = 20;
      roleGroup.addChild(this.container);
      this.stage.addChild(roleGroup);
    },

    // 更新积分changeIntegral
    changeIntegral: function(role, prop, type) {
      let integral = $('#integral_clock .integral');
      if (prop == '加分道具') {
        this.integral += this.addIntegral;
      } else if (prop == '减分陨石') {
        this.integral -= this.reduceIntegral;
      }
      integral.html(this.integral + '');
    },

    // 更新排行榜
    leaderboard: function() {
      let that = this;
      // 隐藏时间/积分显示器
      $('#integral_clock').addClass('hide');
      // 更新登月小知识
      $('#shareWrap .text').html(random.tips);
      // 更新个人分数
      $('.resultScore .score').html(this.integral);
      // 更新排行榜
      let user_data = { code: getWarrant.code, appCode: 'yzwx', withAvatarData: 1 };
      getWarrant.getRequest(getWarrant.requestUrl.getUserInfo, user_data, function(data) {
        let openid = data.data.openid;
        // console.log('openid===>' + openid, 'score===>' + that.integral);
        if (data.code === 'OK') {
          let another_data = { openId: openid, score: that.integral, count: 20 };
          getWarrant.getRequest(getWarrant.requestUrl.getOtherInfo, another_data, function(datas) {
            if (datas.code === 'OK') {
              $('.resultScore .scale i').html(datas.data.ratio + '%');
              console.log('更新完成‘排行榜’');
              that.createListDom(datas.data.items);
              that.bindScroll();
            } else {
              console.log(datas.message);
            }
            // 更新超越全国百分比
            // console.info(datas);
          });
        }
      });
    },

    // 创建other-person-score
    createListDom: function(data) {
      let len = data.length;
      for (let i = 0; i < len; i++) {
        if (data[i].nickname.length > 4) {
          data[i].nickname = data[i].nickname.substr(0, 4) + '..';
        }
        let str = $(`<li>
                    <i class="num">${data[i]['ranking']}.</i>
                    <img src="${data[i].avatarUrl}" class="userHead" />
                    <i class="userName">${data[i].nickname}</i>
                    <i class="userScore">${data[i].score}</i>
                </li>`);
        $('.scrollWrap .list').append(str);
      }
    },

    // 排行榜滚动
    bindScroll: function() {
      // 可滑动元素
      let scroller = document.querySelector('.list');
      // 下拉刷新那几个字
      var refreshBg = document.querySelector('.refresh-bg');
      var myScroll = new IScroll('.scroll', {
        bounceTime: 500,
        probeType: 1,
        interactiveScrollbars: true,
        scrollbars: true,
        shrinkScrollbars: 'clip'
      });
      console.info(myScroll);
      //scroll事件只在iscoll-probe版本可用
      // myScroll.on('scroll', function(){
      //     console.log('scroll')
      //     //如果下拉超过100px就改变“下拉刷新”样式
      //     if(myScroll.y >= 100){
      //         refreshBg.innerText = '赶紧松手'
      //     }else if (myScroll.y>0 && myScroll.y<100){
      //         refreshBg.innerText = '下拉刷新'
      //     }
      // })

      //用于测试
      myScroll.on('scrollEnd', function() {
        console.log(myScroll.y);
      });

      //开始下拉滑块时去除滑块transition样式
      scroller.addEventListener('touchstart', function() {
        scroller.style.transition = '';
      });

      //下拉滑块松手后
      // scroller.addEventListener('touchend', function(){
      //     console.log(myScroll.y)
      //     //如果松手时下拉超过了100px，那就ajax请求新数据
      //     if(myScroll.y >= 100){
      //         scroller.style.marginTop = '50px';
      //         refreshBg.innerText = '加载中...';
      //         //这里用定时器模拟ajax
      //         setTimeout(() => {
      //             scroller.style.marginTop = '0px';
      //             scroller.style.transition = '0.3s';
      //             refreshBg.innerText = '下拉刷新'
      //         }, 2000);
      //     }
      // })
    },

    // 禁止页面滑动
    noTouchMove: function() {
      document.ontouchmove = function() {
        return false;
      };
    }
  };

  window.RocketGame = RocketGame;
})();
