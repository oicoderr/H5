var cur_selectValue = 1, iceCreamValue='', qlzRpg_manifest = [], menuValue = '', stickSign = '',
showResultText = {
  'nikeName': '',
  'avatarUrl':'',
  'storyName': '',      // 故事名
  'endSelectValue': '', // 结束页选择题答案
  'menuValue': '',      // 专属情话（Eg:"我不但可爱，我还可爱你了"）
  'icreamValue': '',    // 雪糕名（Eg:"巧乐兹绮炫巧克力冰淇淋"）
  'character': '热情浪漫'// 性格(结果页文字描述第一句)
}
// 第二，三场景，用户画作展示
showUserWork = {
  one:'', //bg result_flower
  two:''  //iceCream result_adorn
}
// menuValue：选中的菜单对象(哪个雪糕) stickSign：场景一结束选择题所选答案
iceCreamData = [ // qlzRpg_manifest:静态素材
  {
    id:2,
    type: 'purple',
    title: '画家王子异',
    icreamValue: '巧乐兹绮炫黑加仑冰淇淋',
    qlzRpg_manifest_pluse:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/studio_1.jpg", crossOrigin:true, id: "studio_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/menuBg.jpg", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/chocolate.png", crossOrigin:true, id: "third_chocolate"}, // start 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/blackcurrant.png", crossOrigin:true, id: "third_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/mint.png", crossOrigin:true, id: "third_mint"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/peach.png", crossOrigin:true, id: "third_peach"}, // end 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/chocolate_endMenu.png", crossOrigin:true, id: "chocolate_"}, // start 第二波菜单选择题 巧克力
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/blackcurrant_endMenu.png", crossOrigin:true, id: "blackcurrant_"},                // 黑加仑
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/peach_endMenu.png", crossOrigin:true, id: "peach_"},                              // 水蜜桃
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/mint_endMenu.png", crossOrigin:true, id: "mint_"},// end 第二波菜单选择题              薄荷
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/studio_2.jpg", crossOrigin:true, id: "studio_2"}, // 图二
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/studio_4.jpg", crossOrigin:true, id: "studio_4"}, // 图三
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/studio_6.jpg", crossOrigin:true, id: "studio_6"}, // 图四镜子图（眼前一黑穿越回现实）
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/resultBg.jpg", crossOrigin:true, id: "resultBg"}, // 结果页
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/resultCenter.png", crossOrigin:true, id: "resultCenter"}, // 结果页中心图

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgPeach.png", crossOrigin:true, id: "userWork_BgPeach"},         // 用户画作背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgMint.png", crossOrigin:true, id: "userWork_BgMint"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgChocolate.png", crossOrigin:true, id: "userWork_BgChocolate"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgBlackcurrant.png", crossOrigin:true, id: "userWork_BgBlackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_backcurrant.png", crossOrigin:true, id: "userWork_backcurrant"}, // 用户画作雪糕
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_mint.png", crossOrigin:true, id: "userWork_mint"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_peach.png", crossOrigin:true, id: "userWork_peach"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_chocolate.png", crossOrigin:true, id: "userWork_chocolate"}, 

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 26穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 27穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    qlzRpg_manifest_x:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/third/studio_1.jpg", crossOrigin:true, id: "studio_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/third/menuBg.jpg", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/chocolate.png", crossOrigin:true, id: "third_chocolate"}, // start 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/blackcurrant.png", crossOrigin:true, id: "third_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/mint.png", crossOrigin:true, id: "third_mint"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/peach.png", crossOrigin:true, id: "third_peach"}, // end 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/chocolate_endMenu.png", crossOrigin:true, id: "chocolate_"}, // start 第二波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/blackcurrant_endMenu.png", crossOrigin:true, id: "blackcurrant_"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/peach_endMenu.png", crossOrigin:true, id: "peach_"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/mint_endMenu.png", crossOrigin:true, id: "mint_"}, // end 第二波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/third/studio_2.jpg", crossOrigin:true, id: "studio_2"}, // 图二
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/third/studio_4.jpg", crossOrigin:true, id: "studio_4"}, // 图三
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/third/studio_6.jpg", crossOrigin:true, id: "studio_6"}, // 图四镜子图（眼前一黑穿越回现实）
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/third/resultBg.jpg", crossOrigin:true, id: "resultBg"}, // 结果页
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/resultCenter.png", crossOrigin:true, id: "resultCenter"}, // 结果页中心图

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgPeach.png", crossOrigin:true, id: "userWork_BgPeach"},         // 用户画作背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgMint.png", crossOrigin:true, id: "userWork_BgMint"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgChocolate.png", crossOrigin:true,id: "userWork_BgChocolate"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_BgBlackcurrant.png", crossOrigin:true, id: "userWork_BgBlackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_backcurrant.png", crossOrigin:true, id: "userWork_backcurrant"}, // 用户画作雪糕
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_mint.png", crossOrigin:true, id: "userWork_mint"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_peach.png", crossOrigin:true, id: "userWork_peach"}, 
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/third/userWork_chocolate.png", crossOrigin:true, id: "userWork_chocolate"}, 

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 36穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    result:{}
  },
  {
    id: 1,
    type: 'pink',
    title: '花艺师王子异',
    icreamValue: '巧乐兹绮炫水蜜桃冰淇淋',
    qlzRpg_manifest_pluse:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menuBg.png", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/flowerShop_1.jpg", crossOrigin:true, id: "flowerShop_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/flowerShop_2.jpg", crossOrigin:true, id: "flowerShop_2"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/flowerShop_3.jpg", crossOrigin:true, id: "flowerShop_3"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/flowerShop_4.jpg", crossOrigin:true, id: "flowerShop_4"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_chocolate.png", crossOrigin:true, id: "menu1_chocolate"},   // 第一波菜单选择
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_blackcurrant.png", crossOrigin:true, id: "menu1_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_peach.png", crossOrigin:true, id: "menu1_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_mint.png", crossOrigin:true, id: "menu1_mint"},             // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_vanilla.png", crossOrigin:true, id: "menu2_vanilla"},       // 第二波菜单选择
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_pistachio.png", crossOrigin:true, id: "menu2_pistachio"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_raspberry.png", crossOrigin:true, id: "menu2_raspberry"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_tiramisu.png", crossOrigin:true, id: "menu2_tiramisu"},     // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_mint.png", crossOrigin:true, id: "menu3_mint"},             // 第三波菜单选择
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_chocolate.png", crossOrigin:true, id: "menu3_chocolate"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_peach.png", crossOrigin:true, id: "menu3_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_blackcurrant.png", crossOrigin:true, id: "menu3_blackcurrant"}, // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/mirrorBg.jpg", crossOrigin:true, id: "mirrorBg"},                     // 穿越回现实镜子图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/resultCenter.png", crossOrigin:true, id: "resultCenter"},             // 结果页中心合成图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/resultBg.jpg", crossOrigin:true, id: "resultBg"},                     // 结果页背景图

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_chocolate.png", crossOrigin:true, id: "result_chocolate"}, // 结果页自定义花（拼图）
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_blackcurrant.png", crossOrigin:true, id: "result_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_peach.png", crossOrigin:true, id: "result_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_mint.png", crossOrigin:true, id: "result_mint"},          // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/pistachio.png", crossOrigin:true, id: "pistachio"},              // 结果页自定义花（点缀）
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/raspberry.png", crossOrigin:true, id: "raspberry"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/tiramisu.png", crossOrigin:true, id: "tiramisu"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/vanilla.png", crossOrigin:true, id: "vanilla"},                  // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_one.png", crossOrigin:true, id: "stick_one"},  
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_two.png", crossOrigin:true, id: "stick_two"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_three.png", crossOrigin:true, id: "stick_three"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_four.png", crossOrigin:true, id: "stick_four"},
      
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 36 穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    qlzRpg_manifest_x:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menuBg.png", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/second/flowerShop_1.jpg", crossOrigin:true, id: "flowerShop_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/second/flowerShop_2.jpg", crossOrigin:true, id: "flowerShop_2"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/second/flowerShop_3.jpg", crossOrigin:true, id: "flowerShop_3"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/second/flowerShop_4.jpg", crossOrigin:true, id: "flowerShop_4"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_chocolate.png", crossOrigin:true, id: "menu1_chocolate"},    // 第一波菜单选择
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_blackcurrant.png", crossOrigin:true, id: "menu1_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_peach.png", crossOrigin:true, id: "menu1_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu1_mint.png", crossOrigin:true, id: "menu1_mint"},              // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_vanilla.png", crossOrigin:true, id: "menu2_vanilla"},        // 第二波菜单选择
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_pistachio.png", crossOrigin:true, id: "menu2_pistachio"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_raspberry.png", crossOrigin:true, id: "menu2_raspberry"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu2_tiramisu.png", crossOrigin:true, id: "menu2_tiramisu"},      // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_mint.png", crossOrigin:true, id: "menu3_mint"},              // 第三波菜单选择
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_chocolate.png", crossOrigin:true, id: "menu3_chocolate"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_peach.png", crossOrigin:true, id: "menu3_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/menu3_blackcurrant.png", crossOrigin:true, id: "menu3_blackcurrant"},// end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/second/mirrorBg.jpg", crossOrigin:true, id: "mirrorBg"},                    // 穿越回现实镜子图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/resultCenter.png", crossOrigin:true, id: "resultCenter"},            // 结果页中心合成图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/second/resultBg.jpg", crossOrigin:true, id: "resultBg"},                    // 结果页背景图

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_chocolate.png", crossOrigin:true, id: "result_chocolate"},  // 结果页自定义花（拼图）
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_blackcurrant.png", crossOrigin:true, id: "result_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_peach.png", crossOrigin:true, id: "result_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/result_mint.png", crossOrigin:true, id: "result_mint"},            // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/pistachio.png", crossOrigin:true, id: "pistachio"},                // 结果页自定义花（点缀）
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/raspberry.png", crossOrigin:true, id: "raspberry"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/tiramisu.png", crossOrigin:true, id: "tiramisu"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/vanilla.png", crossOrigin:true, id: "vanilla"},                    // end
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_one.png", crossOrigin:true, id: "stick_one"},  
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_two.png", crossOrigin:true, id: "stick_two"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_three.png", crossOrigin:true, id: "stick_three"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/second/stick_four.png", crossOrigin:true, id: "stick_four"},

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 36穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    result:{}
  },
  {
    id: 0,
    type: 'chocolate',
    title: '甜品师王子异',
    icreamValue: '巧乐兹绮炫巧克力冰淇淋',
    qlzRpg_manifest_pluse:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/menuBg.png", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/iceCreamShop_1.jpg", crossOrigin:true, id: "iceCreamShop_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/iceCreamShop_2.jpg", crossOrigin:true, id: "iceCreamShop_2"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/iceCreamShop_3.jpg", crossOrigin:true, id: "iceCreamShop_3"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/iceCreamShop_4.jpg", crossOrigin:true, id: "iceCreamShop_4"}, // 菜单背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/iceCreamShop_5.jpg", crossOrigin:true, id: "iceCreamShop_5"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/iceCreamShop_6.jpg", crossOrigin:true, id: "iceCreamShop_6"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/mint.png", crossOrigin:true, id: "menu_mint"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/peach.png", crossOrigin:true, id: "menu_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/blackcurrant.png", crossOrigin:true, id: "menu_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/chocolate.png", crossOrigin:true, id: "menu_chocolate"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/resultCenter.png", crossOrigin:true, id: "resultCenter"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/resultBg.jpg", crossOrigin:true, id: "resultBg"},

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 16穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 17穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    qlzRpg_manifest_x:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/menuBg.png", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/iceCreamShop_1.jpg", crossOrigin:true, id: "iceCreamShop_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/iceCreamShop_2.jpg", crossOrigin:true, id: "iceCreamShop_2"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/iceCreamShop_3.jpg", crossOrigin:true, id: "iceCreamShop_3"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/iceCreamShop_4.jpg", crossOrigin:true, id: "iceCreamShop_4"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/iceCreamShop_5.jpg", crossOrigin:true, id: "iceCreamShop_5"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/iceCreamShop_6.jpg", crossOrigin:true, id: "iceCreamShop_6"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/mint.png", crossOrigin:true, id: "menu_mint"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/peach.png", crossOrigin:true, id: "menu_peach"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/blackcurrant.png", crossOrigin:true, id: "menu_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/first/chocolate.png", crossOrigin:true, id: "menu_chocolate"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/resultCenter.png", crossOrigin:true, id: "resultCenter"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/first/resultBg.jpg", crossOrigin:true, id: "resultBg"},
      
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 36穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    result:{}
  },
  {
    id:3,
    type: 'blue',
    title: '学长王子异',
    icreamValue: '巧乐兹绮炫薄荷冰淇淋',
    qlzRpg_manifest_pluse:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/playground_1.jpg", crossOrigin:true, id: "playground_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/playground_2.jpg", crossOrigin:true, id: "playground_2"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/playground_3.jpg", crossOrigin:true, id: "playground_3"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/menuBg_1.png", crossOrigin:true, id: "menuBg_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/chocolate.png", crossOrigin:true, id: "third_chocolate"}, // start 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/blackcurrant.png", crossOrigin:true, id: "third_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/mint.png", crossOrigin:true, id: "third_mint"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/peach.png", crossOrigin:true, id: "third_peach"},         // end 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/playground_4.jpg", crossOrigin:true, id: "playground_4"}, // 男主站在小车前吃雪糕
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/resultCenter.png", crossOrigin:true, id: "resultCenter"}, // 结果页中心图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/resultBg.jpg", crossOrigin:true, id: "resultBg"}, // 结果页背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/playground_7.jpg", crossOrigin:true, id: "playground_7"}, // 穿越回现实背景图

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 15穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 16穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/menuBg.png", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    qlzRpg_manifest_x:[
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/pointer.png", crossOrigin:true, id: "pointer"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/narrationBg.png", crossOrigin:true, id: "narrationBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/talkBox.png", crossOrigin:true, id: "talkBox"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/fourth/playground_1.jpg", crossOrigin:true, id: "playground_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/fourth/playground_2.jpg", crossOrigin:true, id: "playground_2"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/fourth/playground_3.jpg", crossOrigin:true, id: "playground_3"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/menuBg_1.png", crossOrigin:true, id: "menuBg_1"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/chocolate.png", crossOrigin:true, id: "third_chocolate"}, // start 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/blackcurrant.png", crossOrigin:true, id: "third_blackcurrant"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/mint.png", crossOrigin:true, id: "third_mint"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/peach.png", crossOrigin:true, id: "third_peach"},         // end 第一波菜单选择题
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/fourth/playground_4.jpg", crossOrigin:true, id: "playground_4"}, // 男主站在小车前吃雪糕
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/SD/fourth/resultCenter.png", crossOrigin:true, id: "resultCenter"}, // 结果页中心图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/fourth/resultBg.jpg", crossOrigin:true, id: "resultBg"}, // 结果页背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/fourth/playground_7.jpg", crossOrigin:true, id: "playground_7"}, // 穿越回现实背景图

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/crossing.png", crossOrigin:true, id: "crossing"},// 穿越
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/HD/crossingBg.png", crossOrigin:true, id: "crossingBg"}, // 36穿越背景图
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/rain.png", crossOrigin:true, id: "rain"},// 下雨动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/iceCreamFalling.png", crossOrigin:true, id: "iceCreamFalling"},// 雪糕掉落
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/chocolateSprite.png", crossOrigin:true, id: "chocolateSprite"},// 吃巧克力雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/blackcurrantSprite.png", crossOrigin:true, id: "blackcurrantSprite"},// 吃黑加仑雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/peachSprite.png", crossOrigin:true, id: "peachSprite"},// 吃水蜜桃雪糕动画
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/mintSprite.png", crossOrigin:true, id: "mintSprite"},// 吃薄荷雪糕动画

      {src: "https://cdn.happysyrup.com/brand/qlz2/img/menuBg.png", crossOrigin:true, id: "menuBg"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_girl_WeiBo.png", crossOrigin:true, id: "avatar_girl_WeiBo"},// 微博女头
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/avatar_boy.png", crossOrigin:true, id: "avatar_boy"},
      {src: "https://cdn.happysyrup.com/brand/qlz2/img/qrCode.png", crossOrigin:true, id: "qrCode"}
    ],
    result:{}
  }
]; // qlzRpg_manifest: 应该加载对应设备的静态素材