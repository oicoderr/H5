var spritesheets = new Array();
~(function () {
  if(qlzRpg_manifest==[])return;
})()
var gameAllConfig = {
  "name": "qlzRpg",
  // "sndBgSrc": "snake_bg.mp3",
  // "effectSoundsFile": "snake_game_effect.mp3",
  // "effectData": [
  //   {'duration': 1150, 'id': 'broken', 'startTime': 0},
  //   {'duration': 4076, 'id': 'countDown', 'startTime': 1650},
  //   {'duration': 4703, 'id': 'gameover', 'startTime': 6226},
  //   {'duration': 575, 'id': 'snake_die', 'startTime': 11429},
  //   {'duration': 392, 'id': 'snake_eat', 'startTime': 12504},
  //   {'duration': 523, 'id': 'snake_graphical', 'startTime': 13396},
  //   {'duration': 601, 'id': 'snake_hit', 'startTime': 14419},
  //   {'duration': 2613, 'id': 'snake_yun', 'startTime': 15520}
  // ],
  "loadManiFest": [ // 场景固定元素（图片）
    {id: "cancel", src: "https://cdn.happysyrup.com/brand/qlz2/img/cancel.png"}
  ],
  "loadSprite": function () { // 入场loading动画
  },

  "qlzRpg_manifest": qlzRpg_manifest,
  "content": {
    "avatar":{    // 头像位置
      x: 20,
      y: 750,
      HDy: 920
    },
    "talkBox":{  // 聊天框位置
      x: 50,
      y: 810,
      HDy: 980
    },
    "pointer":{ // 手指位置
      style:{
        x: 580,
        y: 1010,
        HDy: 1180
      }
    },
    'prompt':{
      pointer:{
        x: 350,
        y: 940,
        HDy: 1060
      },
      info:{
        x: 290,
        y: 880,
        HDy: 990
      }
    },
    'backMirror':{ // 穿越回到现实女主内心os
      talkBox:{
        x: 50,
        y: 810,
        HDy: 980
      },
      talk_body:{
        style:{
          x: 100,
          y: 890,
          HDy: 1040, 
          color: '#fff',
          lineHeight: 46
        },
        content:[
          `不知不觉我吃完了绮炫，恍惚中回到现实\n世界，刚才的故事仿佛发生在镜中的另一\n个世界……`
        ]
      }
    },

    "result":{  // 结果页数据
      chocolate:{
        character:'热情浪漫',
        stickSign: '不许动手，只许动心'
      },
      blackcurrant:{
        character:'神秘高冷',
        stickSign: '我跟你除了恋爱真没什么好谈的'
      },
      peach:{ // 水蜜桃
        character:'清新爽朗',
        stickSign: '你的牙印，一定是爱我的小标记'
      },
      mint:{ // 薄荷
        character:'软萌可爱',
        stickSign: '我不但可爱，我还可爱你了'
      },
      endMenuSelectValue:[
        {
          key: '1.脸红耳热的什么都说不出',
          value: '害羞腼腆'
        },{
          key: '2.笑着说：哈哈，你可真幽默',
          value: '活泼开朗'
        },{
          key: '3.淡定的说：这个棒签语还挺有意思的',
          value: '神秘智慧'
        },{
          key: '4.俏皮的说：比起动心，我更喜欢行动哦！',
          value: '超会撩人'
        }
      ],
      resultCenter:{
        x: 62,
        y: 20,
        HDy: 142
      },
      headImg:{
        x: 80,
        y: 30,
        HDy: 150
      },
      qrCode:{
        x: 80,
        y: 990,
        HDy: 1110
      }
    },

    "first":[   // 第一场景 
      {
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1060, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            `好像漫画里的男生啊...他好像看过来了！心\n跳怎么突然这么快...哎，我在胡思乱想些\n什么，还是看看书吧!`,
          ]
        }
      },
      {
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            'hi，在看书啊，要吃点东西吗？',
            '哦....hi，好哇，你...你有什么可以推荐的吗？',
            '嗯，我们店最近新推出了几款巧乐兹绮炫冰\n淇淋，要不要试试？'
          ] 
        }
      },
      {
        stick:{ // 棒签
          chocolate: '不许动手，只许动心',              // 巧克力棒签语
          blackcurrant: '我跟你除了恋爱真没什么好谈的',  // 黑加仑
          peach: '我不但可爱，我还可爱你了',            // 水蜜桃
          mint: '你的牙印，一定是爱我的小标记'           // 薄荷
        },
        menu_posi:[
          {
            x: 80,
            y: 280,
            HDy: 420
          },{
            x: 80,
            y: 600,
            HDy: 720
          },{
            x: 420,
            y: 280,
            HDy: 420
          },{
            x: 430,
            y: 600,
            HDy: 720
          }
        ]
      },
      {
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '味道真好！'
          ]
        }
      },
      {
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '所以，你是在等人吗？', // 男
            '啊？没有...进来避雨...',
            '哦，以前没见过你，第一次来？',
            '我...我是第一次来，以后会经常来的...我蛮\n喜欢这里，冰淇淋很好吃呢，环境也很好。',
            '那太好了！一定常来哦！',
            '你在这里工作嘛？',
            '嗯，是啊，这是我的店。',
            '原来是老板啊...人帅又热情，好完美的男生啊',
            '你的冰淇淋快化了哦。',
            "啊！不好意思，刚走神了。咦，这上面怎么\n有字... \n '不许动手...'",
            '只许动心'
          ] 
        }
      },
      { // 选择棒签题
        talkBox:{
          x: 0,
          y: 80,
          HDy: 220
        },
        menu_body:{
          style:{
            x: 150,
            color: '#6B3C33',
            selectColor: '#ff69ff',
            lineHeight: 50,
            title:{
              text: '这时候你会：',
              color: '#6C3D3F',
              font: 'bold 40px Arial',
              x: 155,
              y: 340,
              HDy: 460
            },
            posi:[
              {
                y: 420,
                HDy: 540 
              },
              {
                y: 520,
                HDy: 640
              },
              {
                y: 620,
                HDy: 740
              },
              {
                y: 720,
                HDy: 840
              }
            ]
          },
          content:[
            {
              key: '1.脸红耳热的什么都说不出',
              value: '害羞腼腆'
            },{
              key: '2.笑着说：哈哈，你可真幽默',
              value: '活泼开朗'
            },{
              key: '3.淡定的说：这个棒签语还挺有\n意思的',
              value: '神秘智慧'
            },{
              key: '4.俏皮的说：比起动心，我更喜欢\n行动哦！',
              value: '超会撩人'
            }
          ]
        }
      },
      { // 入场女主在冰淇淋店门口
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1060, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            `窗外淅淅沥沥地落下了雨... 这个城市的雨季\n格外闷热，自己却不记得带伞...`,
          ]
        }
      }
    ],

    "second":[  // 第二场景
      { // 入场王子异坐在门口闭着眼睛晒太阳，女主想要买花
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1060, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            `哇，这个男生好可爱啊...心跳得好快！啊！\n他好像醒了。不行，不行，不能这么花痴...\n冷静，冷静...`,
          ]
        }
      },
      { // 第一阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '啊！你好，不好意思，刚才不小心睡着啦！', // 男说
            '嗯，你...你好... 我刚搬到附近，想买点花...\n装点一下房间...',
            '哦，这样啊，我们店里今天刚好有特别的\n冰淇淋花束，你要尝试一下吗？',
            '嗯，好哇！听起来还蛮不错的！',
            '花艺呢，需要技巧与色彩的运用，其中最重\n要的就是主花材的色调，来看看这些主花材，\n你觉得哪个最合适？'
          ]
        }
      },
      { // 第一波菜单选择题
        talkBox:{
          x: 0,
          y: 0,
          HDy: 220
        },
        menuBox:{
          x: 18,
          y: 120,
          HDy: 240
        },
        userWorkPosi:{
          bg:{
            x: 110,
            y: 440,
            HDy: 560
          },
          iceCream:{
            x: 170,
            y: 520,
            HDy: 620
          }
        },
        menu_posi:[
          {
            x: 90,
            y: 280,
            HDy: 420,
            character: '热情浪漫',
            result_flower: 'result_chocolate'
          },
          {
            x: 110,
            y: 600,
            HDy: 720,
            character: '神秘高冷',
            result_flower: 'result_blackcurrant'
          },
          {
            x: 420,
            y: 280,
            HDy: 420,
            character: '软萌可爱',
            result_flower: 'result_peach'
          },
          {
            x: 450,
            y: 560,
            HDy: 720,
            character: '清新爽朗',
            result_flower: 'result_mint'
          }
        ]
      },
      { // 第二阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '哇！你好有花艺天赋哦！主花材的色调选的\n很好呢！', // 男说
            '有...有么？多谢夸奖啦',
            '不过，只有绮炫花还不够丰富，还需要再搭\n配点什么才可以哦。你再选下试试看吧？'
          ]
        }
      },
      { // 第二波菜单选择题
        talkBox:{
          x: 0,
          y: 0,
          HDy: 220
        },
        menuBox:{
          x: 18,
          y: 120,
          HDy: 240
        },
        userWorkPosi:{
          bg:{
            x: 110,
            y: 440,
            HDy: 560
          },
          iceCream:{
            x: 170,
            y: 520,
            HDy: 620
          }
        },
        menu_posi:[
          {
            x: 90,
            y: 280,
            HDy: 420,
            endSelectValue: '神秘智慧',
            result_adorn: 'vanilla' // 兰花
          },
          {
            x: 110,
            y: 600,
            HDy: 720,
            endSelectValue: '活泼开朗',
            result_adorn: 'pistachio' // 开心果
          },
          {
            x: 420,
            y: 280,
            HDy: 420,
            endSelectValue: '害羞腼腆',
            result_adorn: 'raspberry' // 覆盆子
          },
          {
            x: 450,
            y: 560,
            HDy: 720,
            endSelectValue: '超会撩人',
            result_adorn: 'tiramisu' // 提拉米苏
          }
        ]
      },
      { // 第三阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '嗯，不错，不错。可是，你别得意的太早哦，\n我们还有一步没完成呢！', // 男说
            '诶？还需要做什么呢？',
            '当然是花语啦，每朵花都有自己的花语，这\n才是你制作出的花艺的灵魂哦！'
          ]
        }
      },
      { // 第三波菜单选择题
        talkBox:{
          x: 0,
          y: 0,
          HDy: 220
        },
        menuBox:{
          x: 18,
          y: 120,
          HDy: 240
        },
        userWorkPosi:{
          bg:{
            x: 110,
            y: 440,
            HDy: 560
          },
          iceCream:{
            x: 170,
            y: 520,
            HDy: 620
          }
        },
        menu_posi:[
          {
            x: 110,
            y: 180,
            HDy: 300,
            menuValue: '我跟你除了恋爱真没什么好谈的'
          },
          {
            x: 110,
            y: 360,
            HDy: 480,
            menuValue: '你的牙印，一定是爱我的小标记'
          },
          {
            x: 110,
            y: 580,
            HDy: 680,
            menuValue: '不许动手，只许动心'
          },
          {
            x: 110,
            y: 700,
            HDy: 810,
            menuValue: '我不但可爱，我还可爱你了'
          }
        ]
      },
      { // 结果页自定义图片
        userWorkPosi:{
          one:{
            x: 260,
            y: 650,
            HDy: 760
          },
          two:{
            x: 340,
            y: 670,
            HDy: 750
          }
        }
      },
      { // 镜子图
        stick:{ // 情话棒签
          x: 140,
          y: 420,
          HDy: 520
        }
      }
    ],

    "third":[   // 第三场景
      { // 入场男主画画沉思中，女主内心开始OS
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1060, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            `好...好帅啊，本人比新闻上更帅呢。哎，就\n是感觉有点太高冷了，都不知道他到底喜欢\n什么类型的女生呢···`,
          ]
        }
      },
      { // 第一阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '啊，不好意思···今天堵车，所以···所以有点\n晚了···', // 女说
            '嗯，我知道了，没关系',
            '我真的很喜欢你的作品啊。之前只和你在\n邮件里沟通过，你能答应指导我真的是太\n荣幸了！',
            '嗯。今天临摹的作品在都这边，你主画我\n会辅助你，先选要临摹的作品吧。'
          ]
        }
      },
      { // 第一波菜单选择题
        talkBox:{
          x: 0,
          y: 0,
          HDy: 220
        },
        
        menu_posi:[
          {
            x: 86,
            y: 280,
            HDy: 420,
            character: '热情浪漫',
            loveWord: '不许动手，只许动心',
            iceCream: 'userWork_chocolate'
          },
          {
            x: 86,
            y: 600,
            HDy: 720,
            character: '神秘高冷',
            loveWord: '我跟你除了恋爱真没什么好谈的',
            iceCream: 'userWork_backcurrant'
          },
          {
            x: 420,
            y: 600,
            HDy: 720,
            character: '清新爽朗',
            loveWord: '我不但可爱，我还可爱你了',
            iceCream: 'userWork_mint'
          },
          {
            x: 420,
            y: 280,
            HDy: 420,
            character: '软萌可爱',
            loveWord: '你的牙印，一定是爱我的小标记',
            iceCream: 'userWork_peach'
          }
        ]
      },
      { // 第二阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '这···这个，怎么样？', // 女说
            '还算可以。',
            '···哎，真拿他没办法，夸我一句能怎么样\n。算了，算了，谁让我喜欢呢',
            '怎么不说话？有意见？',
            '没，没有啦，只是觉得···',
            '好啦，赶快去准备颜料去吧。'
          ]
        }
      },
      { // 第二波菜单选择题
        talkBox:{
          x: 0,
          y: 0,
          HDy: 220
        },
        menu_posi:[
          {
            x: 80,
            y: 280,
            HDy: 420,
            endSelectValue: '超会撩人',
            userWorkBg: 'userWork_BgChocolate'
          },
          {
            x: 80,
            y: 600,
            HDy: 720,
            endSelectValue: '神秘智慧',
            userWorkBg: 'userWork_BgBlackcurrant'
          },
          {
            x: 420,
            y: 280,
            HDy: 420,
            endSelectValue: '害羞腼腆',
            userWorkBg: 'userWork_BgPeach'
          },{
            x: 430,
            y: 600,
            HDy: 720,
            endSelectValue: '活泼开朗',
            userWorkBg: 'userWork_BgMint'
          }
        ]
      },
      { // 第三阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '我，我选好啦···', // 女说
            '嗯，配色不错。',
            '唔，好累啊，终于完成啦！',
            '好了，今天就到这里吧。',
            '额···你，你很讨厌我吗？',
            '嗯？为什么这么问？',
            '就是···就是···我觉得你对我有点冷漠。'
          ]
        }
      },
      { // 第四阶段聊天（男主给雪糕女主雪糕吃）
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '呐，吃完你就知道了。', // 男说
            '什么啊？'
          ]
        }
      },
      { // 第五阶段展示棒签，女主os
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '我跟你除了恋爱没什么好谈的···',
            '原来他是喜欢我的啊！'
          ]
        }
      },
      { // 结果页自定义图片
        userWorkPosi:{
          one:{
            x: 110,
            y: 440,
            HDy: 560
          },
          two:{
            x: 170,
            y: 520,
            HDy: 620
          }
        }
      }
    ],

    "fourth":[  // 第四场景
      { // 女主拿着巧乐兹绮炫站在篮球场旁os
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1060, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            `咦，丸子学长在打篮球呀 ，过去看看吧`,
          ]
        }
      },
      { // 第一阶段聊天
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '啊！好··好痛···我刚买的绮炫···', // 女说
            '哦，对不起，对不起，你有没有伤到哪里？\n让我看看···',
            '不···不用啦，没事的，只是撞了一下而已···',
            '嗯，那就好。纸巾给你擦一下吧，在这儿\n等我一下，我请你吃冰淇淋，千万别走哦！',
            '哦，好···好的···'
          ]
        }
      },
      { // 选择第一波菜单前的对话
        menuBox:{
          x: 0,
          y: 70,
          HDy: 200
        },
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        menu_posi:[
          {
            x: 86,
            y: 290,
            HDy: 420,
            character: '热情浪漫',
            loveWord: '不许动手，只许动心',
            iceCreamType: 'chocolateSprite'
          },
          {
            x: 86,
            y: 600,
            HDy: 720,
            character: '神秘高冷',
            loveWord: '我跟你除了恋爱真没什么好谈的',
            iceCreamType: 'blackcurrantSprite'
          },
          {
            x: 420,
            y: 600,
            HDy: 720,
            character: '软萌可爱',
            loveWord: '我不但可爱，我还可爱你了',
            iceCreamType: 'mintSprite'
          },
          {
            x: 420,
            y: 280,
            HDy: 420,
            character: '清新爽朗',
            loveWord: '你的牙印，一定是爱我的小标记',
            iceCreamType: 'peachSprite'
          }
        ],
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1060, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '你想要吃什么口味的巧乐兹绮炫？' // 男说
          ]
        }
      },
      { // 选择完第一波菜单后的对话
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '咦？你也喜欢吃这个口味的绮炫呀。给，\n这次我一定保护好你让你吃完。', // 男说
            '哈哈哈，那就谢谢啦。'
          ]
        }
      },
      { // 最后的对话
        talkBox:{
          x: 50,
          y: 810,
          HDy: 980
        },
        avatar:{
          x: 20,
          y: 750,
          HDy: 920
        },
        talk_body:{
          style:{
            x: 100,
            y: 910,
            HDy: 1080, 
            color: '#fff',
            lineHeight: 46
          },
          content:[
            '啊，冰淇淋快化啦，要像这样大口的吃掉哦。', // 男说
            '啊？我…',
            '哈哈哈，我开玩笑的。', // 吃雪糕动画 -> 继续说
            '咦，这上面有字？你的牙印···',
            '一定是爱我的小标记···'
          ]
        }
      },
      { // 最后的菜单选择题（文字版菜单）
        talkBox:{
          x: 0,
          y: 80,
          HDy: 220
        },
        menu_body:{
          style:{
            x: 150,
            color: '#6B3C33',
            selectColor: '#ff69ff',
            lineHeight: 50,
            title:{
              text: '这时候你会：',
              color: '#6C3D3F',
              font: 'bold 40px Arial',
              x: 155,
              y: 340,
              HDy: 460
            },
            posi:[
              {
                y: 420,
                HDy: 540 
              },
              {
                y: 540,
                HDy: 660
              },
              {
                y: 660,
                HDy: 780
              },
              {
                y: 720,
                HDy: 840
              }
            ]
          },
          content:[
            {
              key: '1.脸红着说：我突然想到还有事，\n下次见 ，然后慌忙地跑走',
              value: '害羞腼腆'
            },{
              key: '2.开玩笑的说：咦，我牙很好可不一\n定是小标记哦',
              value: '活泼开朗'
            },{
              key: '3.装作若无其事地说：哦，这样啊！',
              value: '高冷智慧'
            },{
              key: '4.用性感的口吻说：那，学长你已\n经被我的牙印标记了哦！',
              value: '超会撩人'
            }
          ]
        }
      }
    ]
  },
  "qlzRpg_spritesheets": function() { // 所有动画 iceCreamValue.qlzRpg_spritesheets
    spritesheets["crossing"] = new createjs.SpriteSheet({ // 穿越
      "images": [images["crossing"]],
      "frames": [
        [2, 2, 750, 1449], 
        [754, 2, 750, 1449], 
        [1506, 2, 750, 1449], 
        [2258, 2, 750, 1449], 
        [3010, 2, 750, 1449], 
        [3762, 2, 750, 1449], 
        [2, 1453, 750, 1449], 
        [754, 1453, 750, 1449], 
        [1506, 1453, 750, 1449], 
        [2258, 1453, 750, 1449], 
        [3010, 1453, 750, 1449], 
        [3762, 1453, 750, 1449], 
        [2, 2904, 750, 1449], 
        [754, 2904, 750, 1449], 
        [1506, 2904, 750, 1449], 
        [2258, 2904, 750, 1449], 
        [3010, 2904, 750, 1449], 
        [3762, 2904, 750, 1449], 
        [2, 4355, 750, 1449], 
        [754, 4355, 750, 1449], 
        [1506, 4355, 750, 1449],
        [2258, 4355, 750, 1449], 
        [3010, 4355, 750, 1449], 
        [3762, 4355, 750, 1449], 
        [2, 5806, 750, 1449], 
        [754, 5806, 750, 1449], 
        [1506, 5806, 750, 1449], 
        [2258, 5806, 750, 1449], 
        [3010, 5806, 750, 1449], 
        [3762, 5806, 750, 1449]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
          'speed': 0.2,
          'next': true
        }
      },
    });

    spritesheets["rain"] = new createjs.SpriteSheet({ // 下雨
      "images": [images["rain"]],
      "frames": [
        [2, 2, 750, 1449], 
        [754, 2, 750, 1449], 
        [2, 1453, 750, 1449], 
        [754, 1453, 750, 1449], 
        [2, 2904, 750, 1449], 
        [754, 2904, 750, 1449], 
        [2, 4355, 750, 1449], 
        [754, 4355, 750, 1449]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7],
          'speed': 0.1,
          'next': true
        }
      },
    });

    spritesheets["iceCreamFalling"] = new createjs.SpriteSheet({ // 蓝色雪糕被篮球击落
      "images": [images["iceCreamFalling"]],
      "frames": [
        [2, 2, 750, 1206], 
        [754, 2, 750, 1206], 
        [1506, 2, 750, 1206], 
        [2258, 2, 750, 1206], 
        [2, 1210, 750, 1206], 
        [754, 1210, 750, 1206], 
        [1506, 1210, 750, 1206], 
        [2258, 1210, 750, 1206], 
        [2, 2418, 750, 1206], 
        [754, 2418, 750, 1206], 
        [1506, 2418, 750, 1206],
        [1506, 2418, 750, 1206]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          'speed': 0.1,
          'next': false
        }
      },
    });

    spritesheets["chocolateSprite"] = new createjs.SpriteSheet({ // 巧克力冰淇淋吃动画
      "images": [images["chocolateSprite"]],
      "frames": [
        [2, 1453, 750, 1449], 
        [754, 1453, 750, 1449], 
        [1506, 1453, 750, 1449], 
        [2258, 1453, 750, 1449], 
        [3010, 1453, 750, 1449], 
        [2, 2904, 750, 1449], 
        [754, 2904, 750, 1449], 
        [1506, 2904, 750, 1449], 
        [2258, 2904, 750, 1449], 
        [3010, 2904, 750, 1449], 
        [2, 4355, 750, 1449], 
        [754, 4355, 750, 1449], 
        [1506, 4355, 750, 1449], 
        [2258, 4355, 750, 1449], 
        [3010, 4355, 750, 1449], 
        [2, 5806, 750, 1449], 
        [754, 5806, 750, 1449], 
        [1506, 5806, 750, 1449]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          'speed': 0.1,
          'next': false
        }
      },
    });

    spritesheets["blackcurrantSprite"] = new createjs.SpriteSheet({ // 黑加仑冰淇淋吃动画
      "images": [images["blackcurrantSprite"]],
      "frames": [
        [2, 1453, 750, 1449], 
        [754, 1453, 750, 1449], 
        [1506, 1453, 750, 1449], 
        [2258, 1453, 750, 1449], 
        [3010, 1453, 750, 1449], 
        [2, 2904, 750, 1449], 
        [754, 2904, 750, 1449], 
        [1506, 2904, 750, 1449], 
        [2258, 2904, 750, 1449], 
        [3010, 2904, 750, 1449], 
        [2, 4355, 750, 1449], 
        [754, 4355, 750, 1449], 
        [1506, 4355, 750, 1449], 
        [2258, 4355, 750, 1449], 
        [3010, 4355, 750, 1449], 
        [2, 5806, 750, 1449], 
        [754, 5806, 750, 1449], 
        [1506, 5806, 750, 1449]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          'speed': 0.1,
          'next': false
        }
      },
    });

    spritesheets["peachSprite"] = new createjs.SpriteSheet({ // 水蜜桃冰淇淋吃动画
      "images": [images["peachSprite"]],
      "frames": [
        [2, 1453, 750, 1449], 
        [754, 1453, 750, 1449], 
        [1506, 1453, 750, 1449], 
        [2258, 1453, 750, 1449], 
        [3010, 1453, 750, 1449], 
        [2, 2904, 750, 1449], 
        [754, 2904, 750, 1449], 
        [1506, 2904, 750, 1449], 
        [2258, 2904, 750, 1449], 
        [3010, 2904, 750, 1449], 
        [2, 4355, 750, 1449], 
        [754, 4355, 750, 1449], 
        [1506, 4355, 750, 1449], 
        [2258, 4355, 750, 1449], 
        [3010, 4355, 750, 1449], 
        [2, 5806, 750, 1449], 
        [754, 5806, 750, 1449], 
        [1506, 5806, 750, 1449]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          'speed': 0.1,
          'next': false
        }
      },
    });

    spritesheets["mintSprite"] = new createjs.SpriteSheet({ // 薄荷冰淇淋吃动画
      "images": [images["mintSprite"]],
      "frames": [
        [2, 1453, 750, 1449], 
        [754, 1453, 750, 1449], 
        [1506, 1453, 750, 1449], 
        [2258, 1453, 750, 1449], 
        [3010, 1453, 750, 1449], 
        [2, 2904, 750, 1449], 
        [754, 2904, 750, 1449], 
        [1506, 2904, 750, 1449], 
        [2258, 2904, 750, 1449], 
        [3010, 2904, 750, 1449], 
        [2, 4355, 750, 1449], 
        [754, 4355, 750, 1449], 
        [1506, 4355, 750, 1449], 
        [2258, 4355, 750, 1449], 
        [3010, 4355, 750, 1449], 
        [2, 5806, 750, 1449], 
        [754, 5806, 750, 1449], 
        [1506, 5806, 750, 1449]
      ],
      'animations': {
        'play': {
          'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          'speed': 0.1,
          'next': false
        }
      },
    });
  }
}