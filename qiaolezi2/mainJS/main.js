let avatar_girl, circle, avatar_boy, imgDataUrl;

function game_qlzRpg() {
    game_current.removeAllChildren();
    createjs.Ticker.removeEventListener("tick", main_ticker);
    createjs.Ticker.addEventListener("tick", ticker);
    levelContainer = new createjs.Container();
    game_current.addChild(levelContainer);
    let gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest;
    console.log(getUa);
    if (getWarrant.nickname !== '' && getWarrant.avatarData !== '' && getUa != 'WeiBo' &&  getUa != 'PC') { // 微信客户端
      showResultText['nikeName'] = getWarrant.nickname;
      showResultText['avatarUrl'] = getWarrant.avatarData;
      var image = new Image();
      image.src = 'data:image/png;base64,' + getWarrant.avatarData;
      avatar_boy = new createjs.Bitmap(images[curSceneMaterial[curSceneMaterial.length - 2]['id']]);
      avatar_boy.x = gameData['avatar']['x'];
      image.onload = function (e) {
        avatar_girl = new createjs.Bitmap(e.target);
        avatar_girl.x = gameData['avatar']['x'];
        circle = new createjs.Shape();
        // 描边.setStrokeStyle(2,["round"]).beginStroke("#000")
        circle.graphics.beginFill().drawCircle(avatar_boy.getBounds().width / 2, avatar_boy.getBounds().height / 2, avatar_boy.getBounds().width / 2);
        // 进行遮罩处理
        avatar_girl.mask = circle;
        circle.x = gameData['avatar']['x'];
        levelContainer.addChild(avatar_girl, circle, avatar_boy);
        console.log('男头像==>');
        console.info(avatar_boy);
        console.log('我的头像==>');
        console.info(avatar_girl);
        console.log(levelContainer.children);
        // 入场动画-播放loading动画同时init数据  handleLoadSprite(spritesheets["load-door"], qlzRpg_init);
        qlzRpg_init();
      };
    }
    if (getWarrant.nickname !== '' && getUa == 'WeiBo' || getUa == 'PC') { // 微博客户端/PC端
      showResultText['nikeName'] = getWarrant.nickname;
      showResultText['avatarUrl'] = null;
      avatar_girl = new createjs.Bitmap(images[qlzRpg_manifest[qlzRpg_manifest.length - 3]['id']]);
      avatar_boy = new createjs.Bitmap(images[curSceneMaterial[curSceneMaterial.length - 2]['id']]);
      avatar_boy.x = gameData['avatar']
        ['x'];
      avatar_girl.x = gameData['avatar']
        ['x'];
      circle = new createjs.Shape();
      // 描边.setStrokeStyle(2,["round"]).beginStroke("#000")
      circle.graphics.beginFill().drawCircle(avatar_boy.getBounds().width / 2, avatar_boy.getBounds().height / 2, avatar_boy.getBounds().width / 2);
      // 进行遮罩处理
      avatar_girl.mask = circle;
      circle.x = gameData['avatar']['x'];
      levelContainer.addChild(avatar_girl, circle, avatar_boy);
      console.log('男头像==>');
      console.info(avatar_boy);
      console.log('我的头像==>');
      console.info(avatar_girl);
      console.log(levelContainer.children);
      // 入场动画-播放loading动画同时init数据  handleLoadSprite(spritesheets["load-door"], qlzRpg_init);
      qlzRpg_init();
    }
  }
/*
  iceCreamValue.id:
    0: 巧乐兹绮炫冰淇淋屋（室内+剧情）
    1: 巧乐兹绮炫花店（户外+任务）
    2: 巧乐兹绮炫画室（室内+任务）
    3: 薄荷绮炫大学（室外+剧情）
*/

function qlzRpg_init() {

    levelContainer.removeAllChildren();
    let curSceneMaterial = qlzRpg_manifest;
    let gameData = gameAllConfig["content"][curSceneMaterial];
    let crossingSprite, crossingBg;
    // 判断场景，执行对应逻辑
    switch (iceCreamValue.id) {
    case 0:
      console.log('场景一 巧克力');
      _czc.push(["_trackEvent", " 活动", "滑动", "巧克力故事", 4, "iceCreamBox"]);
      crossingSprite = new createjs.Sprite(spritesheets[curSceneMaterial[16]['id']], "play");
      crossingBg = new createjs.Bitmap(images[curSceneMaterial[17]['id']]);
      crossing(crossingSprite, crossingBg, function () {
        first();
      });
      break;
    case 1:
      console.log('场景二 水蜜桃');
      _czc.push(["_trackEvent", " 活动", "滑动", "水蜜桃故事", 5, "iceCreamBox"]);
      crossingSprite = new createjs.Sprite(spritesheets[curSceneMaterial[35]['id']], "play");
      crossingBg = new createjs.Bitmap(images[curSceneMaterial[36]['id']]);
      crossing(crossingSprite, crossingBg, function () {
        second();
      });
      break;
    case 2:
      console.log('场景三 黑加仑');
      _czc.push(["_trackEvent", " 活动", "滑动", "黑加仑故事", 6, "iceCreamBox"]);
      crossingSprite = new createjs.Sprite(spritesheets[curSceneMaterial[26]['id']], "play");
      crossingBg = new createjs.Bitmap(images[curSceneMaterial[27]['id']]);
      crossing(crossingSprite, crossingBg, function () {
        third();
      });
      break;
    case 3:
      console.log('场景四 薄荷');
      _czc.push(["_trackEvent", " 活动", "滑动", "薄荷故事", 7, "iceCreamBox"]);
      crossingSprite = new createjs.Sprite(spritesheets[curSceneMaterial[15]['id']], "play");
      crossingBg = new createjs.Bitmap(images[curSceneMaterial[16]['id']]);
      crossing(crossingSprite, crossingBg, function () {
        fourth();
      });
      break;
    }
  }

// 场景一 巧克力
function first() {
    console.log('=============> 巧克力雪糕 <=============');
    let sex = '';
    let gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest;
    // 加载第一张背景图
    show.gameBg(curSceneMaterial[4]['id']);
    let pointer = new createjs.Bitmap(images[curSceneMaterial[0]['id']]); // 手指
    let talkBox = new createjs.Bitmap(images[curSceneMaterial[1]['id']]); // 旁白背景
    let prompt = new createjs.Text('点击图片选择', '26px Arial', '#200D06'); // 点击图片菜单选择提示
    let prompt_ = new createjs.Text('点击对话选择', '26px Arial', '#200D06'); // 点击文字菜单选择提示
    pointer.scaleX = .8;
    pointer.scaleY = .8;
    // 图片菜单选择icon
    let menu_chocolate = new createjs.Bitmap(images[curSceneMaterial[13]['id']])
    let menu_blackcurrant = new createjs.Bitmap(images[curSceneMaterial[12]['id']])
    let menu_peach = new createjs.Bitmap(images[curSceneMaterial[11]['id']])
    let menu_mint = new createjs.Bitmap(images[curSceneMaterial[10]['id']])
    // 设置头像及对话框位置
    if (mobileType) {
      talkBox.y = gameData['talkBox']['HDy'];
      avatar_girl.y = gameData['avatar']['HDy'];
      avatar_boy.y = gameData['avatar']['HDy'];
      circle.y = gameData['avatar']['HDy'];
    }
    else {
      talkBox.y = gameData['talkBox']['y'];
      avatar_girl.y = gameData['avatar']['y'];
      avatar_boy.y = gameData['avatar']['y'];
      circle.y = gameData['avatar']['y'];
    }
    levelContainer.setChildIndex(circle, levelContainer.children.length - 1);
    // 开启下雨动画
    rain();
    createText_(levelContainer, gameData['first'][6], talkBox, pointer, gameData['pointer']['style'], function () {
      game_current.addEventListener('click', secondPic); // click 关闭动画跳转一张图
    });
    // 第二张图
    function secondPic() {
        levelContainer.removeChildAt(0, 1, 2);
        // levelContainer.removeChildAt(0);// 删除下雨动画
        game_current.removeEventListener('click', secondPic);
        overAnimate(function () { // 开启过渡动画, 动画结束显示场景第二张图
          show.gameBg(curSceneMaterial[5]['id']);
          // 创建girl内心os文本
          createText_(levelContainer, gameData['first'][0], talkBox, pointer, gameData['pointer']['style'], function () {
            game_current.addEventListener('click', thirdPic);
          });
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        });
      }
      // 第三张图

    function thirdPic() {
        levelContainer.removeChildAt(0, 1, 2);
        game_current.removeEventListener('click', thirdPic);
        overAnimate(function () { // 开启过渡动画, 动画结束显示场景第三张图
          show.gameBg(curSceneMaterial[6]['id']);
          // 创建男女对话, 男先开始说话
          createText_(levelContainer, gameData['first'][1], talkBox, pointer, gameData['pointer']['style'], function () {
            console.log('男说1');
            levelContainer.removeChild(avatar_girl);
            game_current.addEventListener('click', beginTalk);
          });
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
          // 女说2
          function beginTalk() {
              console.log('女说2');
              levelContainer.removeChildAt(0, 1, 2);
              levelContainer.removeChildAt(4)
              levelContainer.removeChildAt(4); // 删除上一句男说的话
              game_current.removeEventListener('click', beginTalk);
              levelContainer.removeChild(avatar_boy); // 删除男头像
              gameData['first'][1]['talk_body']['content'].shift(); // 删除对话数组中第一句
              // 显示女说话
              createText_(levelContainer, gameData['first'][1], talkBox, pointer, gameData['pointer']['style'], function () {
                game_current.addEventListener('click', endTalk);
              });
              // levelContainer.addChild(avatar_girl);// 添加女头像
              levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
            }
            // 男说3 结束对话

          function endTalk() {
            console.log('男3,结束对话');
            levelContainer.removeChildAt(0, 1, 2);
            console.info(levelContainer.children)
            levelContainer.removeChildAt(5)
            levelContainer.removeChildAt(5); // 删除上一句女说的话
            game_current.removeEventListener('click', endTalk);
            levelContainer.removeChild(avatar_girl); // 删除男头像
            gameData['first'][1]['talk_body']['content'].shift();
            // 显示男说话
            createText_(levelContainer, gameData['first'][1], talkBox, pointer, gameData['pointer']['style'], function () {
              game_current.addEventListener('click', fourthPic);
            });
            levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
          }
        });
      }
      // 第四张图 创建图片菜单

    function fourthPic() {
        game_current.removeEventListener('click', fourthPic);
        overAnimate(function () {
          levelContainer.removeAllChildren();
          show.gameBg(curSceneMaterial[7]['id']);
          // setData_ : 图片添加自定义属性
          menu_chocolate.setData_ = {
            type: 'chocolate'
          };
          menu_blackcurrant.setData_ = {
            type: 'blackcurrant'
          };
          menu_peach.setData_ = {
            type: 'peach'
          };
          menu_mint.setData_ = {
            type: 'mint'
          };
          menu_chocolate.x = gameData['first'][2]['menu_posi'][0]['x'];
          menu_blackcurrant.x = gameData['first'][2]['menu_posi'][1]['x'];
          menu_peach.x = gameData['first'][2]['menu_posi'][2]['x'];
          menu_mint.x = gameData['first'][2]['menu_posi'][3]['x'];
          pointer.x = gameData['prompt']['pointer']['x'];
          prompt.x = gameData['prompt']['info']['x'];
          if (mobileType) {
            menu_chocolate.y = gameData['first'][2]['menu_posi'][0]['HDy'];
            menu_blackcurrant.y = gameData['first'][2]['menu_posi'][1]['HDy'];
            menu_peach.y = gameData['first'][2]['menu_posi'][2]['HDy'];
            menu_mint.y = gameData['first'][2]['menu_posi'][3]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            menu_chocolate.y = gameData['first'][2]['menu_posi'][0]['y'];
            menu_blackcurrant.y = gameData['first'][2]['menu_posi'][1]['y'];
            menu_peach.y = gameData['first'][2]['menu_posi'][2]['y'];
            menu_mint.y = gameData['first'][2]['menu_posi'][3]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
          // 菜单事件绑定
          menu_chocolate.on('click', debounce(fifthPic, 1000));
          menu_blackcurrant.on('click', debounce(fifthPic, 1000));
          menu_peach.on('click', debounce(fifthPic, 1000));
          menu_mint.on('click', debounce(fifthPic, 1000));
          levelContainer.addChild(menu_chocolate, menu_blackcurrant, menu_peach, menu_mint, prompt, pointer);
          game_current.setChildIndex(levelContainer, game_current.children.length - 1);
        });
      }
      // 第五张图

    function fifthPic() {
        let iceCreamType;
        switch (this.setData_['type']) {
        case 'chocolate':
          showResultText['character'] = '热情浪漫';
          iceCreamType = 'chocolateSprite';
          break;
        case 'blackcurrant':
          showResultText['character'] = '神秘高冷';
          iceCreamType = 'blackcurrantSprite';
          break;
        case 'peach':
          showResultText['character'] = '软萌可爱';
          iceCreamType = 'peachSprite';
          break;
        case 'mint':
          showResultText['character'] = '清新爽朗';
          iceCreamType = 'mintSprite';
          break;
        }
        menuValue = gameData['first'][2]['stick'][this.setData_['type']];
        showResultText['menuValue'] = gameData['first'][2]['stick'][this.setData_['type']];
        overAnimate(function () {
          levelContainer.removeAllChildren();
          show.gameBg(curSceneMaterial[6]['id']);
          console.log('开始吃雪糕动画～:' + iceCreamType);
          iceCreamEat(iceCreamType, function () {
            // 女说完 ‘味道真好’, 跳转第3张图，开始对话
            createText_(levelContainer, gameData['first'][3], talkBox, pointer, gameData['pointer']['style'], function () {
              game_current.addEventListener('click', third_pic);
            });
            levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
          });
        });
      }
      // 跳回第三张图开始对话

    function third_pic() {
      levelContainer.removeAllChildren();
      game_current.removeEventListener('click', third_pic);
      // 创建男女对话, 男先开始说话
      createText_(levelContainer, gameData['first'][4], talkBox, pointer, gameData['pointer']['style'], function () { // 先男说
        sex = true;
        game_current.addEventListener('click', talkContent);
      });
      levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
      // 开始聊骚一波
      function talkContent() {
          if (gameData['first'][4]['talk_body']['content'].length < 2) {
            selectMenu();
            return;
          };
          levelContainer.removeChildAt(1);
          levelContainer.removeChildAt(1); // 删除上一句话
          game_current.removeEventListener('click', talkContent);
          gameData['first'][4]['talk_body']['content'].shift(); // 删除对话数组中第一句
          sex = !sex;
          // 显示当前说话
          createText_(levelContainer, gameData['first'][4], talkBox, pointer, gameData['pointer']['style'], function () {
            game_current.addEventListener('click', talkContent);
          });
          if (sex) {
            levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
          }
          else {
            levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
          }
        }
        // 出现选择题

      function selectMenu() {
        levelContainer.removeAllChildren();
        game_current.removeEventListener('click', talkContent);
        // 画棒签选择题
        createMenuList();
      }
      game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      // 创建选择题menuList
      function createMenuList() {
        let menuBg = curSceneMaterial[3]['id'];
        let posiObj = gameData['first'][5];
        let resultCenter = curSceneMaterial[14]['id'];
        let resultGameBg = curSceneMaterial[15]['id'];
        let mirrorBg = curSceneMaterial[9]['id'];
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt_.x = gameData['prompt']['info']['x'];
        if (mobileType) {
          pointer.y = gameData['prompt']['pointer']['HDy'];
          prompt_.y = gameData['prompt']['info']['HDy'];
        }
        else {
          pointer.y = gameData['prompt']['pointer']['y'];
          prompt_.y = gameData['prompt']['info']['y'];
        }
        createMenu_text(levelContainer, menuBg, posiObj, resultCenter, resultGameBg, mirrorBg, pointer, function () {
          levelContainer.addChild(prompt_, pointer);
        });
      }
    }
  }

// 场景二 水蜜桃（花店）
function second() {
    console.log('=============水蜜桃雪糕=============');
    let sex = '';
    var gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest; // 场景素材
    show.gameBg(curSceneMaterial[4]['id']); // 加载第一张图
    let talkBox = new createjs.Bitmap(images[curSceneMaterial[1]['id']]); // 旁白背景
    let pointer = new createjs.Bitmap(images[curSceneMaterial[0]['id']]); // 手指
    let prompt = new createjs.Text('点击图片选择', '26px Arial', '#200D06'); // 点击图片菜单选择提示
    pointer.scaleX = .8;
    pointer.scaleY = .8;
    levelContainer.setChildIndex(circle, levelContainer.children.length - 1);
    // 设置头像及对话框位置
    if (mobileType) {
      talkBox.y = gameData['talkBox']['HDy'];
      avatar_girl.y = gameData['avatar']['HDy'];
      avatar_boy.y = gameData['avatar']['HDy'];
      circle.y = gameData['avatar']['HDy'];
    }
    else {
      talkBox.y = gameData['talkBox']['y'];
      avatar_girl.y = gameData['avatar']['y'];
      avatar_boy.y = gameData['avatar']['y'];
      circle.y = gameData['avatar']['y'];
    };
    levelContainer.setChildIndex(circle, levelContainer.children.length - 1);
    // 女主内心os
    createText_(levelContainer, gameData['second'][0], talkBox, pointer, gameData['pointer']['style'], function () {
      sex = true;
      game_current.addEventListener('click', startTalk);
    });
    // 开始对话
    function startTalk() {
      levelContainer.removeChildAt(0, 1, 2);
      overAnimate(function () {
        talkContent();
      })
    }
    // 开始聊骚第一波
    function talkContent() {
        levelContainer.removeChildAt(0, 1);
        game_current.removeEventListener('click', startTalk); // 移除事件
        game_current.removeEventListener('click', talkContent); // 先移除click事件
        game_current.removeChildAt(0); // 删除背景第一张
        show.gameBg(curSceneMaterial[5]['id']); // 切换背景第二张
        if (gameData['second'][1]['talk_body']['content'].length < 1) {
          overAnimate(function () {
            createMenuList();
          })
          game_current.removeEventListener('click', talkContent);
          return;
        }
        // 显示当前说话
        createText_(levelContainer, gameData['second'][1], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent); // 动画结束绑定click事件
          gameData['second'][1]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.removeChild(avatar_girl);
          levelContainer.addChild(avatar_boy);
        }
        else {
          levelContainer.removeChild(avatar_boy);
          levelContainer.addChild(avatar_girl);
        }
        sex = !sex;
      }
    // 对话后创建第一波选择题menuList：确定： character
    function createMenuList() {
        game_current.removeChildAt(0, 1);
        levelContainer.removeAllChildren();
        let options = [];
        show.gameBg(curSceneMaterial[7]['id']); // 切换带阳光的背景
        let menuBg = new createjs.Bitmap(images[curSceneMaterial[3]['id']]); // 添加菜单背景
        menuBg.x = gameData['second'][2]['menuBox']['x'];
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt.x = gameData['prompt']['info']['x'];
        for (let i = 0; i < gameData['second'][2]['menu_posi'].length; i++) {
          options.push(new createjs.Bitmap(images[curSceneMaterial[i + 8]['id']]));
        }
        for (let i = 0; i < options.length; i++) {
          options[i].x = gameData['second'][2]['menu_posi'][i]['x'];
          options[i].setData_ = { // 属性绑定
            'character': gameData['second'][2]['menu_posi'][i]['character'],
            'loveWord': gameData['second'][2]['menu_posi'][i]['loveWord'],
            'result_flower': gameData['second'][2]['menu_posi'][i]['result_flower']
          };
          // 事件绑定
          options[i].addEventListener('click', (e) => {
            for(let j = 0; j < options.length;j++){
              options[j].alpha = .5;
            }
            e['currentTarget'].alpha = 1;
            showResultText['character'] = e['currentTarget']['setData_']['character'];
            showResultText['menuValue'] = e['currentTarget']['setData_']['loveWord'];
            showUserWork['one'] = e['currentTarget']['setData_']['result_flower'];
            overAnimate(function () {
              console.log('结果页文字数据==>');
              console.info(showResultText);
              console.log('结果页自定义图片数据==>');
              console.info(showUserWork);
              sex = true;
              talkContent_two();
            });
          }, false);
          if (mobileType) {
            menuBg.y = gameData['second'][2]['menuBox']['HDy'];
            options[i].y = gameData['second'][2]['menu_posi'][i]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            menuBg.y = gameData['second'][2]['menuBox']['y'];
            options[i].y = gameData['second'][2]['menu_posi'][i]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
        }
        levelContainer.addChild(menuBg, options[0], options[1], options[2], options[3], prompt, pointer);
        game_current.addChild(levelContainer);
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
    // 选择完第一波选择题，返回第二张图进行第二波对话

    function talkContent_two() {
        levelContainer.removeAllChildren();
        game_current.removeChildAt(0); // 删除背景第一张
        game_current.removeEventListener('click', talkContent_two);
        show.gameBg(curSceneMaterial[5]['id']); // 切换回第二张背景
        if (gameData['second'][3]['talk_body']['content'].length < 1) {
          game_current.removeEventListener('click', talkContent_two);
          console.log('说完了要做的事');
          sex = true;
          overAnimate(function () {
            createMenuList_two();
          })
          return;
        }
        // 显示当前说话
        createText_(levelContainer, gameData['second'][3], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent_two);
          gameData['second'][3]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
      }
    // 创建第二波选择题createMenuList_two：确定：endSelectValue

    function createMenuList_two() {
        game_current.removeChildAt(0);
        levelContainer.removeAllChildren();
        let options = [];
        show.gameBg(curSceneMaterial[7]['id']); // 切换带阳光的背景
        let menuBg = new createjs.Bitmap(images[curSceneMaterial[3]['id']]); // 添加菜单背景
        menuBg.x = gameData['second'][4]['menuBox']['x'];
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt.x = gameData['prompt']['info']['x'];
        for (let i = 0; i < gameData['second'][4]['menu_posi'].length; i++) {
          options.push(new createjs.Bitmap(images[curSceneMaterial[i + 12]['id']]));
        }
        for (let i = 0; i < options.length; i++) {
          options[i].x = gameData['second'][4]['menu_posi'][i]['x'];
          options[i].setData_ = { // 属性绑定
            'endSelectValue': gameData['second'][4]['menu_posi'][i]['endSelectValue'],
            'result_adorn': gameData['second'][4]['menu_posi'][i]['result_adorn'],
          };
          // 事件绑定
          options[i].addEventListener('click', (e) => {
            for(let j = 0; j < options.length;j++){
              options[j].alpha = .5;
            }
            e['currentTarget'].alpha = 1;
            showResultText['endSelectValue'] = e['currentTarget']['setData_']['endSelectValue'];
            showUserWork['two'] = e['currentTarget']['setData_']['result_adorn'];
            overAnimate(function () {
              console.log('结果页文字数据==>');
              console.info(showResultText);
              console.log('结果页自定义图片数据==>');
              console.info(showUserWork);
              sex = true;
              talkContent_three();
            });
          }, false);
          if (mobileType) {
            menuBg.y = gameData['second'][4]['menuBox']['HDy'];
            options[i].y = gameData['second'][4]['menu_posi'][i]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            menuBg.y = gameData['second'][4]['menuBox']['y'];
            options[i].y = gameData['second'][4]['menu_posi'][i]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
        }
        levelContainer.addChild(menuBg, options[0], options[1], options[2], options[3], prompt, pointer);
        game_current.addChild(levelContainer);
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
    // 选择完第二波选择题，返回第二张图进行第三波对话
    function talkContent_three() {
        levelContainer.removeAllChildren();
        game_current.removeChildAt(0);
        game_current.removeEventListener('click', talkContent_three);
        show.gameBg(curSceneMaterial[5]['id']); // 切换回第二张背景
        if (gameData['second'][5]['talk_body']['content'].length < 1) {
          game_current.removeEventListener('click', talkContent_three);
          console.log('说完了要做的事');
          sex = true;
          overAnimate(function () {
            createMenuList_three();
          })
          return;
        }
        // 显示当前说话
        createText_(levelContainer, gameData['second'][5], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent_three);
          gameData['second'][5]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
      }
    // 创建第三波选择题createMenuList_three：确定：‘情话’
    function createMenuList_three() {
        console.log(game_current.children)
        game_current.removeChildAt(0);
        levelContainer.removeAllChildren();
        let options = [];
        show.gameBg(curSceneMaterial[7]['id']); // 切换带阳光的背景
        let menuBg = new createjs.Bitmap(images[curSceneMaterial[3]['id']]); // 添加菜单背景
        menuBg.x = gameData['second'][6]['menuBox']['x'];
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt.x = gameData['prompt']['info']['x'];
        for (let i = 0; i < gameData['second'][6]['menu_posi'].length; i++) {
          options.push(new createjs.Bitmap(images[curSceneMaterial[i + 16]['id']]));
        }
        for (let i = 0; i < options.length; i++) {

          options[i].x = gameData['second'][6]['menu_posi'][i]['x'];
          options[i].setData_ = { // 属性绑定
            'menuValue': gameData['second'][6]['menu_posi'][i]['menuValue']
          };
          // 事件绑定
          options[i].addEventListener('click', (e) => {
            for(let j = 0; j < options.length;j++){
              options[j].alpha = .5;
            }
            e['currentTarget'].alpha = 1;
            showResultText['menuValue'] = e['currentTarget']['setData_']['menuValue'];
            overAnimate(function () {
              console.log('结果页文字数据==>');
              console.info(showResultText);
              sex = true;
              console.log('展示穿越回现实，镜子图');
              createText_(levelContainer, gameData['backMirror'], talkBox, pointer, gameData['pointer']['style']);
              backMirror();
            });
          }, false);
          if (mobileType) {
            menuBg.y = gameData['second'][6]['menuBox']['HDy'];
            options[i].y = gameData['second'][6]['menu_posi'][i]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            menuBg.y = gameData['second'][6]['menuBox']['y'];
            options[i].y = gameData['second'][6]['menu_posi'][i]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
        }
        levelContainer.addChild(menuBg, options[0], options[1], options[2], options[3], prompt, pointer);
        game_current.addChild(levelContainer);
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
    /*
      回到现实镜子图
        1.stick_one: 不许动手，只许动心
        2.stick_two: 你的牙印，一定是爱我的小标记
        3.stick_three: 我不但可爱，我还可爱你了
        4.stick_four: 我跟你除了恋爱真没什么好谈的
    */
    function backMirror() {
      game_current.removeChildAt(0);
      levelContainer.removeAllChildren();
      let stick;
      switch (showResultText['menuValue']) {
      case '我跟你除了恋爱真没什么好谈的':
        stick = new createjs.Bitmap(images[curSceneMaterial[34]['id']])
        break;
      case '你的牙印，一定是爱我的小标记':
        stick = new createjs.Bitmap(images[curSceneMaterial[32]['id']])
        break;
      case '不许动手，只许动心':
        stick = new createjs.Bitmap(images[curSceneMaterial[31]['id']])
        break;
      case '我不但可爱，我还可爱你了':
        stick = new createjs.Bitmap(images[curSceneMaterial[33]['id']])
        break;
      default:
        stick = new createjs.Bitmap(images[curSceneMaterial[34]['id']])
        break;
      };
      stick.x = gameData['second'][8]['stick']['x'];
      pointer.x = gameData['pointer']['style']['x'];
      if (mobileType) {
        stick.y = gameData['second'][8]['stick']['HDy'];
        pointer.y = gameData['pointer']['style']['HDy'];
      }
      else {
        stick.y = gameData['second'][8]['stick']['y'];
        pointer.y = gameData['pointer']['style']['y'];
      }
      let mirrorBg = curSceneMaterial[20]['id'];
      show.gameBg(mirrorBg);
      // 穿越回显示女主内新的OS
      createText_(levelContainer, gameData['backMirror'], talkBox, pointer, gameData['pointer']['style']);
      game_current.addEventListener('click', goResult, false);
      levelContainer.addChild(pointer, stick);
      game_current.setChildIndex(levelContainer, game_current.children.length - 1);
    }

    function goResult() {
      overAnimate(function () {
        game_current.removeEventListener('click', goResult, false);
        let resultCenter = curSceneMaterial[21]['id'];
        let gameBg = curSceneMaterial[22]['id'];
        let posi = gameData['second'][7]['userWorkPosi']; // 用户画作坐标
        showResult(1, levelContainer, gameBg, resultCenter, showUserWork, posi);
      })
    }
}
// 场景三 黑加仑
function third() {
    console.log('=============黑加仑雪糕=============');
    let sex = '';
    var gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest; // 场景素材
    show.gameBg(curSceneMaterial[3]['id']); // 加载第一张图
    let talkBox = new createjs.Bitmap(images[curSceneMaterial[1]['id']]);   // 旁白背景
    let prompt = new createjs.Text('点击图片选择', '26px Arial', '#200D06');  // 点击图片菜单选择提示
    let prompt_ = new createjs.Text('点击对话选择', '26px Arial', '#200D06'); // 点击文字菜单选择提示
    let pointer = new createjs.Bitmap(images[curSceneMaterial[0]['id']]);   // 手指
    pointer.scaleX = .8;
    pointer.scaleY = .8;
    // 设置头像及对话框位置
    if (mobileType) {
      talkBox.y = gameData['talkBox']['HDy'];
      avatar_girl.y = gameData['avatar']['HDy'];
      avatar_boy.y = gameData['avatar']['HDy'];
      circle.y = gameData['avatar']['HDy'];
    }
    else {
      talkBox.y = gameData['talkBox']['y'];
      avatar_girl.y = gameData['avatar']['y'];
      avatar_boy.y = gameData['avatar']['y'];
      circle.y = gameData['avatar']['y'];
    }
    levelContainer.setChildIndex(circle, levelContainer.children.length - 1);
    // '我的'内心OS
    createText_(levelContainer, gameData['third'][0], talkBox, pointer, gameData['pointer']['style'], function () {
      sex = true;
      game_current.addEventListener('click', talkContent);
    });
    // 开始聊骚第一波
    function talkContent() {
        levelContainer.removeChildAt(0, 1, 2);
        if (gameData['third'][1]['talk_body']['content'].length < 1) {
          selectMenu();
          return;
        }
        game_current.removeEventListener('click', talkContent);
        sex = !sex;
        // 显示当前说话
        createText_(levelContainer, gameData['third'][1], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent);
          gameData['third'][1]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
      }
      // 出现第一波选择题

    function selectMenu() {
        levelContainer.removeAllChildren();
        game_current.removeEventListener('click', talkContent);
        // 画菜单选择界面
        overAnimate(function () {
          createMenuList();
        })
      }
      // 创建第一波选择题menuList

    function createMenuList() {
        let options = [];
        let menuBg = new createjs.Bitmap(images[curSceneMaterial[4]['id']]);
        menuBg.x = 0;
        menuBg.y = 0;
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt.x = gameData['prompt']['info']['x'];
        let tickKey, tickValue;
        for (let i = 0; i < gameData['third'][2]['menu_posi'].length; i++) {
          options.push(new createjs.Bitmap(images[curSceneMaterial[i + 5]['id']]));
        }
        for (let i = 0; i < options.length; i++) {
          options[i].x = gameData['third'][2]['menu_posi'][i]['x'];
          options[i].setData_ = {
            'character': gameData['third'][2]['menu_posi'][i]['character'],
            'loveWord': gameData['third'][2]['menu_posi'][i]['loveWord'],
            'iceCream': gameData['third'][2]['menu_posi'][i]['iceCream'],
          };
          // 事件绑定
          options[i].addEventListener('click', (e) => {
            for(let j = 0; j < options.length;j++){
              options[j].alpha = .5;
            }
            e['currentTarget'].alpha = 1;
            showResultText['character'] = e['currentTarget']['setData_']['character'];
            showResultText['menuValue'] = e['currentTarget']['setData_']['loveWord'];
            showUserWork['two'] = e['currentTarget']['setData_']['iceCream'];
            overAnimate(function () {
              // console.log(showResultText);
              sex = false;
              talkContent_two();
            });
          }, false);
          if (mobileType) {
            options[i].y = gameData['third'][2]['menu_posi'][i]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            options[i].y = gameData['third'][2]['menu_posi'][i]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
        }
        levelContainer.addChild(menuBg, options[0], options[1], options[2], options[3], prompt, pointer);
      }
      // 开始聊骚第二波

    function talkContent_two() {
        levelContainer.removeAllChildren();
        show.gameBg(curSceneMaterial[3]['id']); // 加载第一张图
        if (gameData['third'][3]['talk_body']['content'].length < 1) {
          console.log('第二波对话结束');
          levelContainer.removeAllChildren();
          game_current.removeEventListener('click', talkContent_two);
          overAnimate(function () {
            selectMenu_two();
          })
          return;
        }
        game_current.removeEventListener('click', talkContent_two);
        // 显示当前说话
        createText_(levelContainer, gameData['third'][3], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent_two);
          gameData['third'][3]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
      }
      // 出现第二波选择题

    function selectMenu_two() {
        levelContainer.removeAllChildren();
        // 创建菜单
        let options = [];
        let menuBg = new createjs.Bitmap(images[curSceneMaterial[4]['id']]);
        menuBg.x = 0;
        menuBg.y = 0;
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt.x = gameData['prompt']['info']['x'];
        let tickKey, tickValue;
        for (let i = 0; i < gameData['third'][4]['menu_posi'].length; i++) {
          options.push(new createjs.Bitmap(images[curSceneMaterial[i + 9]['id']]));
        }
        for (let i = 0; i < options.length; i++) {
          options[i].x = gameData['third'][4]['menu_posi'][i]['x'];
          options[i].setData_ = {
            'endSelectValue': gameData['third'][4]['menu_posi'][i]['endSelectValue'],
            'bg': gameData['third'][4]['menu_posi'][i]['userWorkBg']
          };
          // 事件绑定
          options[i].addEventListener('click', (e) => {
            for(let j = 0; j < options.length;j++){
              options[j].alpha = .5;
            }
            e['currentTarget'].alpha = 1;
            showResultText['endSelectValue'] = e['currentTarget']['setData_']['endSelectValue'];
            showUserWork['one'] = e['currentTarget']['setData_']['bg'];
            overAnimate(function () {
              console.warn(showResultText);
              console.log('最后选择题,第三波聊天==>');
              levelContainer.removeAllChildren();
              sex = false;
              talkContent_three();
            });
          }, false);
          if (mobileType) {
            options[i].y = gameData['third'][4]['menu_posi'][i]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            options[i].y = gameData['third'][4]['menu_posi'][i]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
        }
        levelContainer.addChild(menuBg, options[0], options[1], options[2], options[3], prompt, pointer);
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
      // 回到图1继续聊骚第三波

    function talkContent_three() {
        levelContainer.removeAllChildren();
        if (gameData['third'][5]['talk_body']['content'].length < 1) {
          game_current.removeEventListener('click', talkContent_three);
          overAnimate(function () {
            sex = true; // 男先说
            eatIcream();
            game_current.addEventListener('click', eatIcream);
          })
          return;
        }
        game_current.removeEventListener('click', talkContent_three);
        // 显示当前说话
        createText_(levelContainer, gameData['third'][5], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent_three);
          gameData['third'][5]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
      }
      // 给女主吃雪糕并聊天

    function eatIcream() {
        levelContainer.removeAllChildren();
        if (gameData['third'][6]['talk_body']['content'].length < 1) {
          game_current.removeEventListener('click', eatIcream);
          overAnimate(function () {
            showStick();
            game_current.addEventListener('click', showStick);
          })
          return;
        }
        show.gameBg(curSceneMaterial[13]['id'])
        game_current.removeEventListener('click', eatIcream);
        // 显示当前说话
        createText_(levelContainer, gameData['third'][6], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', eatIcream);
          gameData['third'][6]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
      // 展示情话棒签

    function showStick() {
        levelContainer.removeAllChildren();
        game_current.removeEventListener('click', showStick);
        if (gameData['third'][7]['talk_body']['content'].length < 1) {
          game_current.removeEventListener('click', showStick);
          overAnimate(function () {
            console.log('------- 展示穿越回现实，镜子图 -------');
            // 展示穿越镜子
            show.gameBg(curSceneMaterial[15]['id']);
            createText_(levelContainer, gameData['backMirror'], talkBox, pointer, gameData['pointer']['style']);
            levelContainer.addChild(pointer);
            game_current.setChildIndex(levelContainer, game_current.children.length - 1);
            game_current.addEventListener('click', showResult_); // 画结果图
          })
          return;
        }
        show.gameBg(curSceneMaterial[14]['id'])
          // 显示当前说话
        createText_(levelContainer, gameData['third'][7], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', showStick);
          gameData['third'][7]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
      // 展示结果页

    function showResult_() {
      overAnimate(function () {
        game_current.removeEventListener('click', showResult_);
        let resultCenter = curSceneMaterial[17]['id'];
        let gameBg = curSceneMaterial[16]['id'];
        let posi = gameData['third'][8]['userWorkPosi'];
        console.log(posi);
        // 创建结果页
        showResult(2, levelContainer, gameBg, resultCenter, showUserWork, posi);
      })
    }
  }

// 场景四 薄荷
function fourth() {
    console.log('=============薄荷雪糕=============');
    let sex = '';
    let iceCreamType = null; // 选择的吃雪糕动画
    var gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest; // 场景素材
    show.gameBg(curSceneMaterial[3]['id']); // 加载第一张图
    let talkBox = new createjs.Bitmap(images[curSceneMaterial[1]['id']]); // 旁白背景
    let pointer = new createjs.Bitmap(images[curSceneMaterial[0]['id']]); // 手指
    let prompt = new createjs.Text('点击图片选择', '26px Arial', '#200D06'); // 点击图片菜单选择提示
    let prompt_ = new createjs.Text('点击对话选择', '26px Arial', '#200D06'); // 点击文字菜单选择提示
    pointer.scaleX = .8;
    pointer.scaleY = .8;
    // 设置头像及对话框位置
    if (mobileType) {
      talkBox.y = gameData['talkBox']['HDy'];
      avatar_girl.y = gameData['avatar']['HDy'];
      avatar_boy.y = gameData['avatar']['HDy'];
      circle.y = gameData['avatar']['HDy'];
    }
    else {
      talkBox.y = gameData['talkBox']['y'];
      avatar_girl.y = gameData['avatar']['y'];
      avatar_boy.y = gameData['avatar']['y'];
      circle.y = gameData['avatar']['y'];
    }
    levelContainer.setChildIndex(circle, levelContainer.children.length - 1);
    createText_(levelContainer, gameData['fourth'][0], talkBox, pointer, gameData['pointer']['style'], function () { // 女主内心os
      sex = true;
      game_current.addEventListener('click', startTalk);
    });
    // 开始对话
    function startTalk() {
      overAnimate(function () {
        game_current.removeEventListener('click', startTalk); // 移除事件
        levelContainer.removeAllChildren();
        show.gameBg(curSceneMaterial[4]['id']);
        iceCreamFalling(function () {
          talkContent();
        });
      })
    };
    // 开始聊骚第一波
    function talkContent() {
      levelContainer.removeAllChildren();
      game_current.removeEventListener('click', talkContent); // 先移除click事件
      if (gameData['fourth'][1]['talk_body']['content'].length < 1) {
        askIceCream();
        game_current.removeEventListener('click', talkContent);
        return;
      }
      sex = !sex;
      // 显示当前说话
      createText_(levelContainer, gameData['fourth'][1], talkBox, pointer, gameData['pointer']['style'], function () {
        game_current.addEventListener('click', talkContent); // 动画结束绑定click事件
        gameData['fourth'][1]['talk_body']['content'].shift(); // 删除对话数组中第一句
      });
      if (sex) {
        levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
      }
      else {
        levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
      }
    };
    // 出现第一波选择题的小对话
    function askIceCream() {
        levelContainer.removeAllChildren();
        // 画菜单选择界面
        overAnimate(function () {
          // 简单对话
          game_current.addEventListener('click', IceCreamCar);
          IceCreamCar();
        })
      }
      // 冰淇淋车对话

    function IceCreamCar() {
        levelContainer.removeAllChildren();
        show.gameBg(curSceneMaterial[5]['id']); // 冰淇淋车
        if (gameData['fourth'][2]['talk_body']['content'].length < 1) {
          overAnimate(function () {
            game_current.removeEventListener('click', IceCreamCar);
            createMenuList();
            console.log(game_current)
            console.log('第1个菜单选择题来了～')
          })
          return;
        }
        // 显示当前说话
        createText_(levelContainer, gameData['fourth'][2], talkBox, pointer, gameData['pointer']['style'], function () {
          gameData['fourth'][2]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
      }
      // 对话后创建第一波选择题menuList

    function createMenuList() {
        console.log(levelContainer.children);
        let options = [];
        let menuBg = new createjs.Bitmap(images[curSceneMaterial[6]['id']]);
        menuBg.x = 0;
        pointer.x = gameData['prompt']['pointer']['x'];
        prompt.x = gameData['prompt']['info']['x'];
        for (let i = 0; i < gameData['fourth'][2]['menu_posi'].length; i++) {
          options.push(new createjs.Bitmap(images[curSceneMaterial[i + 7]['id']]));
        }
        for (let i = 0; i < options.length; i++) {
          options[i].x = gameData['fourth'][2]['menu_posi'][i]['x'];
          options[i].setData_ = {
            'character': gameData['fourth'][2]['menu_posi'][i]['character'],
            'loveWord': gameData['fourth'][2]['menu_posi'][i]['loveWord'],
            'iceCreamType': gameData['fourth'][2]['menu_posi'][i]['iceCreamType']
          };
          // 事件绑定
          options[i].addEventListener('click', (e) => {
            for(let j = 0; j < options.length;j++){
              options[j].alpha = .5;
            }
            e['currentTarget'].alpha = 1;
            showResultText['character'] = e['currentTarget']['setData_']['character'];
            showResultText['menuValue'] = e['currentTarget']['setData_']['loveWord'];
            iceCreamType = e['currentTarget']['setData_']['iceCreamType'];
            console.log('所选雪糕动画===>' + iceCreamType);
            overAnimate(function () {
              sex = true;
              talkContent_two();
            });
          }, false);
          if (mobileType) {
            menuBg.y = gameData['fourth'][2]['menuBox']['HDy'];
            options[i].y = gameData['fourth'][2]['menu_posi'][i]['HDy'];
            pointer.y = gameData['prompt']['pointer']['HDy'];
            prompt.y = gameData['prompt']['info']['HDy'];
          }
          else {
            menuBg.y = gameData['fourth'][2]['menuBox']['y'];
            options[i].y = gameData['fourth'][2]['menu_posi'][i]['y'];
            pointer.y = gameData['prompt']['pointer']['y'];
            prompt.y = gameData['prompt']['info']['y'];
          }
        }
        levelContainer.addChild(menuBg, options[0], options[1], options[2], options[3], prompt, pointer);
        game_current.setChildIndex(levelContainer, game_current.children.length - 1);
      }
      // 第二波聊天（选完第1次菜单选择题）

    function talkContent_two() {
        levelContainer.removeAllChildren();
        game_current.removeEventListener('click', talkContent_two);
        if (gameData['fourth'][3]['talk_body']['content'].length < 1) {
          game_current.removeEventListener('click', talkContent_two);
          talkContent_three();
          return;
        }
        // 显示当前说话
        createText_(levelContainer, gameData['fourth'][3], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent_two);
          gameData['fourth'][3]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
      }
      // 第三波聊天

    function talkContent_three() {
        console.log('第三波聊天带吃雪糕动画')
        levelContainer.removeAllChildren();
        game_current.removeEventListener('click', talkContent_three);
        show.gameBg(curSceneMaterial[11]['id']);
        if (gameData['fourth'][4]['talk_body']['content'].length < 1) {
          console.log('最后的对话结束～出现最后一次菜单选择题');
          overAnimate(function () {
            selectMenu_two();
          })
          game_current.removeEventListener('click', talkContent_three);
          return;
        }
        if (gameData['fourth'][4]['talk_body']['content'].length == 2) {
          iceCreamEat(iceCreamType, function () {
            console.log(levelContainer.children);
            levelContainer.removeChild(0);
            createText_(levelContainer, gameData['fourth'][4], talkBox, pointer, gameData['pointer']['style'], function () {
              game_current.addEventListener('click', talkContent_three);
              gameData['fourth'][4]['talk_body']['content'].shift(); // 删除对话数组中第一句
            });
            if (sex) {
              levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
            }
            else {
              levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
            }
            sex = !sex;
          })
          return;
        }
        // 显示当前说话
        createText_(levelContainer, gameData['fourth'][4], talkBox, pointer, gameData['pointer']['style'], function () {
          game_current.addEventListener('click', talkContent_three);
          gameData['fourth'][4]['talk_body']['content'].shift(); // 删除对话数组中第一句
        });
        if (sex) {
          levelContainer.addChildAt(avatar_boy, levelContainer.children.length - 1);
        }
        else {
          levelContainer.addChildAt(avatar_girl, levelContainer.children.length - 1);
        }
        sex = !sex;
      }
      // 出现第二波选择题（文字版）

    function selectMenu_two() {
      let menuBg = curSceneMaterial[curSceneMaterial.length-4]['id'];
      let posiObj = gameData['fourth'][5];
      let resultCenter = curSceneMaterial[12]['id'];
      let resultGameBg = curSceneMaterial[13]['id'];
      let mirrorBg = curSceneMaterial[14]['id'];
      pointer.x = gameData['prompt']['pointer']['x'];
      prompt_.x = gameData['prompt']['info']['x'];
      if (mobileType) {
        pointer.y = gameData['prompt']['pointer']['HDy'];
        prompt_.y = gameData['prompt']['info']['HDy'];
      }
      else {
        pointer.y = gameData['prompt']['pointer']['y'];
        prompt_.y = gameData['prompt']['info']['y'];
      }
      createMenu_text(levelContainer, menuBg, posiObj, resultCenter, resultGameBg, mirrorBg, pointer, function () {
        levelContainer.addChild(prompt_, pointer);
      });
    };
  }

// 穿越动画
function crossing(crossingSprit, crossingBg, callback) {
    var crossingCon = new createjs.Container();
    crossingCon.x = 0;
    crossingCon.y = 0;
    crossingBg.x = 0;
    crossingBg.y = 0;
    crossingSprit.x = 0;
    crossingSprit.y = 0;
    crossingSprit.scaleX = 1;
    crossingSprit.scaleY = 1;
    crossingSprit.on('animationend', function () {
      console.log('穿越成功');
      levelContainer.removeChild(crossingCon);
      if (callback) callback();
    });
    crossingCon.addChild(crossingBg, crossingSprit);
    levelContainer.addChildAt(crossingCon, levelContainer.length - 1);
  }
// 下雨动画
function rain() {
    let gameData = gameAllConfig["content"][qlzRpg_manifest];
    let rainSprite = new createjs.Sprite(spritesheets[qlzRpg_manifest[18]['id']], "play");
    rainSprite.x = 0;
    rainSprite.y = 0;
    if (mobileType) {
      rainSprite.scaleX = 1;
      rainSprite.scaleY = 1;
    }
    else {
      rainSprite.scaleX = 1;
      rainSprite.scaleY = .86;
    }
    levelContainer.addChildAt(rainSprite, levelContainer.length - 1);
  }
  
// 薄荷雪糕被篮球击落
function iceCreamFalling(callback) {
    let gameData = gameAllConfig["content"][qlzRpg_manifest];
    let iceCreamFalling = new createjs.Sprite(spritesheets[qlzRpg_manifest[18]['id']], "play");
    iceCreamFalling.x = 0;
    iceCreamFalling.y = 0;
    iceCreamFalling.on('animationend', function () {
      console.log('=======> 雪糕掉动画落结束 <========');
      if (callback) callback();
    });
    levelContainer.addChildAt(iceCreamFalling, levelContainer.length - 1);
    game_current.setChildIndex(levelContainer, game_current.children.length - 1);
  }
  
// 吃雪糕动画
function iceCreamEat(type, callback) {
    let gameData = gameAllConfig["content"][qlzRpg_manifest];
    let iceCreamSprite = new createjs.Sprite(spritesheets[type], "play");
    iceCreamSprite.x = 0;
    iceCreamSprite.y = 0;
    iceCreamSprite.scaleX = 1;
    iceCreamSprite.scaleY = 1;
    iceCreamSprite.on('animationend', function () {
      console.log(' =====> 吃雪糕动画结束 <===== ');
      // levelContainer.removeChild(iceCreamSprite);
      if (callback) callback();
    });
    levelContainer.addChildAt(iceCreamSprite, levelContainer.length - 1);
    game_current.setChildIndex(levelContainer, game_current.children.length - 1);
  }
/*
  创建文字版菜单
  createMenu_text：
    1. containerFather: container
    2. menuBg_: 菜单背景图
    3. posi: 菜单文本数据，位置，样式等
    4. resultCenter: 结果页核心图 (id)
    5. resultGameBg: 结果页背景图（id）
    6. mirrorBg: 穿越背景图
    7. pointer： 手指
    8. containerFather：当前游戏次级层Container（levelContainer）
    9. callback: 回调
*/

function createMenu_text(containerFather, menuBg_, posiObj, resultCenter, resultGameBg, mirrorBg, pointer, callback) {
    let title = new createjs.Text(posiObj['menu_body']['style']['title']['text'], posiObj['menu_body']['style']['title']['font'], posiObj['menu_body']['style']['title']['color']); // 文字选择题固定title
    title.x = posiObj['menu_body']['style']['title']['x'];
    let options = [];let optionsMask = [];
    let menuBg = new createjs.Bitmap(images[menuBg_]);
    menuBg.x = posiObj['talkBox']['x'];
    let color = posiObj['menu_body']['style']['color'];
    for (let i = 0; i < posiObj['menu_body']['content'].length; i++) {
      let shapeMask = new createjs.Shape();
      shapeMask.graphics.beginFill("#fff").drawRect(0, 0, 500, 60);
      shapeMask.alpha = .01;
      options.push(new createjs.Text(posiObj['menu_body']['content'][i]['key'], "34px Arial", color))
      optionsMask.push(shapeMask);
    }
    options.forEach(function(value, index, array) {
      options[index]['setData_'] = {
        'endSelectValue': posiObj['menu_body']['content'][index]['value']
      };
      optionsMask[index].x = posiObj['menu_body']['style']['x'];
      options[index].x = posiObj['menu_body']['style']['x'];
      options[index].lineHeight = posiObj['menu_body']['style']['lineHeight'];
      optionsMask[index].addEventListener('click', (e) => {
        console.log(options[index]);
        option_discolor(options[index], options, posiObj, resultCenter, resultGameBg, mirrorBg, pointer, containerFather); // options解决每次点击菜单颜色恢复默认
      })
      if (mobileType) {
        menuBg.y = posiObj['talkBox']['HDy'];
        title.y = posiObj['menu_body']['style']['title']['HDy'];
        options[index].y = posiObj['menu_body']['style']['posi'][index]['HDy'];
        optionsMask[index].y = posiObj['menu_body']['style']['posi'][index]['HDy']-20;
      }
      else {
        menuBg.y = posiObj['talkBox']['y'];
        title.y = posiObj['menu_body']['style']['title']['y'];
        options[index].y = posiObj['menu_body']['style']['posi'][index]['y'];
        optionsMask[index].y = posiObj['menu_body']['style']['posi'][index]['y']-20;
      }
    });
    containerFather.addChild(menuBg, title, options[0],optionsMask[0], options[1],optionsMask[1], options[2],optionsMask[2], options[3], optionsMask[3],);
    if (callback) callback();
    game_current.setChildIndex(containerFather, game_current.children.length - 1);
  }

/*
  棒签菜单选中后变色 -> 穿越回现实 -> 用户点击后进入结果页
  option_discolor:
    1. e: 点击的对象
    2. options: 所有对象
    3. posiObj: 菜单文本数据，位置，样式等
    4. resultCenter_: 结果页中心图片（id）
    5. resultGameBg: 结果页背景图（id）
    6. mirrorBg: 穿越背景图
    7. pointer： 手指
    8. containerFather：当前游戏次级层Container（levelContainer）
*/

function option_discolor(e, options, posiObj, resultCenter_, resultGameBg, mirrorBg, pointer, containerFather) {
    var gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest;
    let talkBox = new createjs.Bitmap(images[curSceneMaterial[1]['id']]); // 旁白背景
    if (mobileType) {
      talkBox.y = gameData['talkBox']['HDy'];
    }
    else {
      talkBox.y = gameData['talkBox']['y'];
    }
    for (let i = 0; i < options.length; i++) {
      options[i].shadow = new createjs.Shadow(posiObj['menu_body']['style']['selectColor'], 0, 0, 0);
      options[i].color = posiObj['menu_body']['style']['color'];
    }
    e.color = posiObj['menu_body']['style']['selectColor'];
    e.shadow = new createjs.Shadow(posiObj['menu_body']['style']['selectColor'], 0, 2, 6);
    stickSign = e.text; // 棒签赋值
    showResultText['endSelectValue'] = e['setData_']['endSelectValue'];
    // 2s后回到现实
    let timer = setTimeout(function () {
      overAnimate(function () {
        containerFather.removeAllChildren();
        show.gameBg(mirrorBg);
        createText_(levelContainer, gameData['backMirror'], talkBox, pointer, gameData['pointer']['style']);
        containerFather.addChild(pointer);
        game_current.setChildIndex(containerFather, game_current.children.length - 1);
        game_current.addEventListener('click', showResult_);
      })
    }, 2000)

    function showResult_() {
      overAnimate(function () {
        game_current.removeEventListener('click', showResult_);
        // 创建结果页
        showResult(0, levelContainer, resultGameBg, resultCenter_, null, null);
      })
    }
  }
/*
  展示对应结果
    0. scenesIndex : 场景值 0:场景1 1:场景2 ...
    1. con_father: 场景container,当前场景顶级con
    2. gameBg: 结果背景图
    3. resultCenterImg: 背景核心图
    4. showUserWork：与resultCenterImg共同绘画，用户画作
*/

function showResult(scenesIndex, con_father, gameBg_, resultCenterImg, addPic, addPicPosi) {
    _czc.push(["_trackEvent", " 活动", "点击", "结果页展示", 0, "iceCreamBox"]);
    var gameData = gameAllConfig["content"];
    let curSceneMaterial = qlzRpg_manifest;
    // 清空canvas元素
    con_father.removeAllChildren();
    game_current.removeAllChildren();
    game_current.addChild(con_father);
    // 画结果
    drawResult();

    function drawResult() {
        // 加载背景图
        show.gameBg(gameBg_);
        $('#resultBtn').removeClass('hide'); // 显示保存，重玩按钮
        // 保存
        $('.save').on('click', () => {
            _czc.push(["_trackEvent", " 活动", "点击", "保存结果页", 1, "saveResult"]);
            game_current.addChild(qrCode);
            $('#resultBtn').attr('class', 'hide');
            let timer = setTimeout(function () { // 解决保存图片时动态将二维码添加到画布,生成结果页
              // stage.setTransform(0, 0, 1, -1, 0, 0); // 坐标还原
              getBase64(canvas, function (dataUrl) {
                var newImg = document.createElement("img");
                imgDataUrl = dataUrl;
                newImg.src = dataUrl;
                $('#resultImg').append(newImg);
                // createCanvas();
                // 删除canvas Qrcode
                game_current.removeChild(qrCode);
              });
              // 逻辑 begin 
              if ($('.resultImg')) {
                $('.resultImg').remove();
              };
              $('#resultImg').removeClass('hide');
              $('#resultImg img').attr('class', 'resultImg');
              // $('#resultImg img').css({'transform':'matrix(-1, 0, 0, 1, 0, 0) rotate(180deg)'}); // 解决真机上canvas图片反方向被截取
              $('#resultImg').css({
                'position': 'absolute',
                'z-index': '101'
              });
              // 点击灰色区域：关闭结果图显示
              $('#resultImg').on('click', function () {
                $('#resultImg').attr('class', 'hide');
                $('#resultBtn').removeClass('hide');
              });
              // 逻辑 end
            }, 15);
          })
          // 重玩
        $('.replay').on('click', () => {
          _czc.push(["_trackEvent", " 活动", "点击", "再玩一次", 2, "replay"]);
          gameReplay();
        });
        let resultCenter = new createjs.Bitmap(images[resultCenterImg]);
        let qrCode = new createjs.Bitmap(images[curSceneMaterial[curSceneMaterial.length - 1]['id']]); // 二维码
        resultCenter.x = gameData['result']['resultCenter']['x'];
        qrCode.x = gameData['result']['qrCode']['x'];
        avatar_girl.x = gameData['result']['headImg']['x'];
        circle.x = gameData['result']['headImg']['x'];
        if (addPic == null && addPicPosi == null) {
          console.error('此场景没有用户自定画作')
          if (mobileType) {
            resultCenter.y = gameData['result']['resultCenter']['HDy'];
            avatar_girl.y = gameData['result']['headImg']['HDy'];
            circle.y = gameData['result']['headImg']['HDy']; //gameData['result']['headImg']['HDy']
            qrCode.y = gameData['result']['qrCode']['HDy'];
          }
          else {
            resultCenter.y = gameData['result']['resultCenter']['y'];
            avatar_girl.y = gameData['result']['headImg']['y'];
            circle.y = gameData['result']['headImg']['y'];
            qrCode.y = gameData['result']['qrCode']['y'];
          }
          game_current.addChild(resultCenter, avatar_girl, circle);
        }
        else {
          for (let i in addPic) {
            if (addPic[i] == '') {
              console.error('未找到用户画作数据')
              return;
            }
          }
          console.log('用户画作=====》');
          console.info(addPic);
          // 图片变量，位置常量
          let userOne = new createjs.Bitmap(images[addPic['one']]);
          let userTwo = new createjs.Bitmap(images[addPic['two']]);
          userOne.x = addPicPosi['one']['x'];
          userTwo.x = addPicPosi['two']['x'];
          if (mobileType) {
            resultCenter.y = gameData['result']['resultCenter']['HDy'];
            userOne.y = addPicPosi['one']['HDy'];
            userTwo.y = addPicPosi['two']['HDy'];
            avatar_girl.y = gameData['result']['headImg']['HDy'];
            circle.y = gameData['result']['headImg']['HDy'];
            qrCode.y = gameData['result']['qrCode']['HDy'];
          }
          else {
            userOne.y = addPicPosi['one']['y'];
            userTwo.y = addPicPosi['two']['y'];
            resultCenter.y = gameData['result']['headImg']['y'];
            avatar_girl.y = gameData['result']['headImg']['y'];
            circle.y = gameData['result']['headImg']['y'];
            qrCode.y = gameData['result']['qrCode']['y'];
          }
          game_current.addChild(resultCenter, userOne, userTwo, avatar_girl, circle);
        }
        // 创建结果文字描述
        createResultText();
      }
 /*
    *结果页展示重要对象：
      showResultText：
        0. nikeName 微信昵称
        1. avatarUrl 微信头像
        2. storyName 故事名
        3. menuValue 选择的菜单雪糕对象 
        4. endSelectValue 结束页选择题对应关系
        5. character 性格
    Eg: Hi，【character】的【nikeName】，这是你在巧乐兹绮炫异世界的炫彩时刻
        在巧乐兹绮炫异世界【storyName】与【endSelectValue】的你度过了绮炫时刻。
        你的专属棒签情话是：【menuValue】不许动手，只许动心。
        这个夏天巧乐兹绮炫巧克力冰淇淋更适合你哦！
  */

    function createResultText() {
        // console.log(showResultText);
        console.log('首页所选雪糕对象iceCreamValue:');
        console.info(iceCreamValue);
        for (var key in showResultText) {
          if (showResultText[key] == '') {
            $('#resultBtn').attr('class', 'hide');
            createMask('异常!未获取到结果信息！', 220, 440); // 1.文字 2 位置x,y
            return;
          }
        }
        let slogan = new createjs.Text('这是你在巧乐兹绮炫世界的炫彩时刻', '24px Arial', '#5F2D2D'); //slogan.font = "bold 36px Arial"
        let headText = new createjs.Text("HI," + showResultText['character'] + "的" + showResultText['nikeName'], '30px Arial', '#5F2D2D');
        let footText = new createjs.Text("在巧乐兹绮炫「异」世界\n" + showResultText['storyName'] + "与" + '' + showResultText['endSelectValue'] + "的你度过了绮炫时刻。\n" + "你的专属棒签情话是：「" + showResultText['menuValue'] + "」\n" + "这个夏天" + showResultText['icreamValue'] + "更适合你哦！", '24px Arial', '#5F2D2D');
        slogan.x = 206;
        headText.x = 206;
        footText.x = 80;
        slogan.lineHeight = 24;
        headText.lineHeight = 30;
        footText.lineHeight = 36;
        if (mobileType) {
          headText.y = 200;
          slogan.y = 240;
          footText.y = 980;
        }
        else {
          headText.y = 70;
          slogan.y = 110;
          footText.y = 840;
        }
        game_current.addChild(slogan, headText, footText);
      }
      // 获取canvas的base64图片的dataURL（图片格式为image/jpeg）   

    function getBase64(canvas, callback) {
      var dataURL = canvas.toDataURL("image/jpeg", '1'); // png 无需质量系数
      if (typeof callback !== undefined) {
        callback(dataURL);
      }
    }
}
/* 
  创建对白文字  
    1. container: 最高父级levelContainer
    2. 对话文本对象（文字，位置，样式）
    3. 对话文本背景图
    4. 手指对象图片
    5. 手指（位置，样式）
    6. 回调
*/
function createText_(container, textObj, bg, pointer, pointerStyle, callback) {
    // container.removeAllChildren();
    container.removeChild(text);
    let alpha = 0;
    var text = new createjs.Text(textObj['talk_body']['content'][0], "30px Arial", textObj['talk_body']['style']['color']);
    text.x = textObj['talk_body']['style']['x'];
    bg.x = textObj['talkBox']['x'];
    pointer.x = pointerStyle['x'];
    if (mobileType) {
      text.y = textObj['talk_body']['style']['HDy'];
      bg.y = textObj['talkBox']['HDy'];
      pointer.y = pointerStyle['HDy'];
    }
    else {
      text.y = textObj['talk_body']['style']['y'];
      bg.y = textObj['talkBox']['y'];
      pointer.y = pointerStyle['y'];
    }
    text.alpha = alpha;
    pointer.alpha = alpha;
    text.textBaseline = "alphabetic";
    text.lineHeight = textObj['talk_body']['style']['lineHeight'];
    let timer = setInterval(() => {
      alpha += 0.1;
      text.alpha = alpha;
      pointer.alpha = alpha;
      if (alpha >= 1) {
        clearInterval(timer);
        if (callback) callback();
      }
    }, 20);
    bg.cache(0, 0, bg.image.width, bg.image.height);
    container.addChild(bg, text, pointer);
    game_current.setChildIndex(container, game_current.children.length - 1);
  }

// 防抖函数
function debounce(func, wait = 0) {
  let timer, gameData = gameAllConfig["content"];

  function debounced(...args) {
    const self = this;
    timer == null && invokeFunc();
    timer != null && clearTimer();
    timer = setTimeout(clearTimer, wait);

    function invokeFunc() {
      func.apply(self, args);
    }
  }
  return debounced;

  function clearTimer() {
    clearTimeout(timer);
    timer = null;
  }
}

function ticker() {
  stage.update();
}