~function(){
  //页面禁止滑动
  $('#content').on('touchmove', function (event) {
    event.preventDefault();
  });
  $('#myCanvas').on('touchmove', function (event) {
    event.preventDefault();
  });
  $('#content .loading').on('touchmove', function (event) {
    event.preventDefault();
  });
  
  //预加载
  let progressInner = $(".xl-progress__inner"), progressTxt = $('.xl-progress__txt');
  var imageLoad = new Preload.imageLoad({
    isDebug: true,
    sources: {
      constantImg: { //常量img
        source: [
          './img/titlePic.png',
          './img/qrCode.png',
          './img/batteryBg-edm.png',
          './img/batteryBg-Techno.png',
          './img/batteryBg-psyTrance..png',
          './img/batteryBg-zqb.png'
        ],
        posi:[
          {
            x: 193, y: 57.5,
            width: 130,height: 79,
          },
          {
            x: 187.5, y: 518,
            width: 351, height: 78,
          },
          {
            x: 52.5, y: 419,
            width: 81, height: 101,
          },
          {
            x: 142.5, y: 419,
            width: 81,height: 101,
          },
          {
            x: 232.5, y: 419,
            width: 81, height: 101,
          },
          {
            x: 322.5, y: 419,
            width: 81, height: 101
          }
        ],
        callback: function() {
          console.log("常量图片加载完成");
        }
      },
      batteryImg: {
        source: [
          //电量
          './img/power1.png',
          './img/power2.png',
          './img/power3.png',
          './img/power4.png',
          './img/power5.png',
        ],
        posi:[
          {
            x: 53, y: 405.5,
            width: 30, height: 43,
          },
          {
            x: 143, y: 405.5,
            width: 30, height: 43,
          },
          {
            x: 233, y: 405.5,
            width: 30, height: 43,
          },
          {
            x: 322, y: 405.5,
            width: 30, height: 43,
          }
        ],
        callback: function() {
          console.log("电量图片加载完成");
        }
      },
      headImg: {
        source: [
          //头像挂件
          './img/head3.png',//蒸汽波
          './img/head1.png',//Techno
          './img/head2.png',//psy-trance
          './img/head4.png',//edm
        ],
        posi:[
          {
            x: 210, y: 218.5,
            width: 40, height: 35
          },
          {
            x: 194, y: 190.5,
            width: 84, height: 84
          },
          {
            x: 192, y: 153.5,
            width: 53, height: 43
          },
          {
            x: 193, y: 160.5,
            width: 86, height: 18
          }
        ],
        callback: function() {
          console.log("头像框图片加载完成");
        }
      },
      bgImg:{
        source: [
          //背景
          './img/zqb.jpg',
          './img/Techno.jpg',
          './img/psy-trance.jpg',
          './img/EDM.jpg',
        ],
        posi:[
          {
            x: 187.5, y: 306,
            width: 375, height: 612
          }
        ],
        callback: function() {
          console.log("背景图片加载完成");
        }
      }
    },
    loadingOverTime: 50,//单位s
    loadingOverTimeCB: function() {
      console.log("资源加载超时");
    },
    progress: function(completedCount, total) {
      let percent = Math.floor(completedCount / total * 100) + '%';
      progressInner.css("width",percent);
      progressTxt.html(percent);
    },
    completeLoad: function() {
      //获取答案并展示答案
      result.urlSplit();
      // $('.loading').hide();
    }
  });
      
  function result() {
    this.canvas = $('#myCanvas')[0];
    this.musicType = [
      {
        'zqb':['昭和原住民','乙女心','醉梦者'],
        'techno':['抖腿永动机','冷酷杀手','建筑工地'],
        'psyTrance':['最後嬉皮士','Goa构建者','灵性种子'],
        'edm':['甩头怪兽','哪哪都有我','魔鬼的步伐']
      },
      {
        'psyTrance':['银河拯救者','召幻药师','宇宙能量池'],
        'zqb':['霓虹追蹤者','葡萄糖酸心','保持悲傷'],
        'techno':['4/4拍','未来之声','共振狂魔'],
        'edm':['頑主','潮流老油条','Player']
      },
      {
        'edm':['时尚ICON','娱乐玩家','探店高手'],
        'zqb':['喪氣滿滿','電波接收器','賽博未來人'],
        'psyTrance':['ACID','高维物种','後飛行家'],
        'techno':['性冷淡','科学怪人','工業重機器']
      },
      {
        'edm':['深海炸弹','蹦迪老司机','耳膜燥裂'],
        'zqb':['宇宙最甜','極致浪漫','万有引力波'],
        'techno':['機械迷城','鐵克諾戰士','靈魂律動'],
        'psyTrance':['顱內高潮','平衡萬物','ॐ']
      },
      {
        'techno':['極簡主義','精準鉴定师','天際漫遊'],
        'psyTrance':['如来大儿子','合法致幻','現世薩滿'],
        'zqb':['超高壓鍋','沖繩衝浪手','蒸口氣'],
        'edm':['製霸舞池','無酒自HIGH','黑桃A灭霸']
      }
    ]
    // 解决canvas 图片导入虚化问题
    let context = this.canvas.getContext("2d");
    let devicePixelRatio = window.devicePixelRatio || 1,backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1, ratio = devicePixelRatio / backingStoreRatio;
    let oldWidth = myCanvas.width; 
    let oldHeight = myCanvas.height; 
    this.canvas.width = oldWidth * ratio; 
    this.canvas.height = oldHeight * ratio;
    this.canvas.style.width = oldWidth/100*2 + 'rem'; 
    this.canvas.style.height = oldHeight/100*2 + 'rem'; 
    context.scale(ratio, ratio);
  }

  //逻辑函数
  result.prototype.main = function(loc) {
    let that = this;
    //清空画布
    $('#myCanvas').clearCanvas();
    let answers = loc.split('');
    // 确定词
    let selectTextArr = {
      'zqb':[],
      'techno':[],
      'psyTrance':[],
      'edm':[]
    };
    console.log(answers)
    // 如果第一题选择x=0则选择zqb
    for(let x in answers){
      switch(x){
        case '0':
          getText(that,answers,0)
        break;
        case '1':
          getText(that,answers,1)
          break;
        case '2':
          getText(that,answers,2)
          break;
        case '3':
          getText(that,answers,3)
          break;
        case '4':
          getText(that,answers,4)
          break;
      }
    }
    function getText(that,obj,x) {
      if(x == 0){
        switch(obj[x]){
          case '1':
            if(that.musicType[x]['zqb'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['zqb'].push(that.musicType[x]['zqb'][i])
              }
            }
            break;
          case '2':
            if(that.musicType[x]['techno'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['techno'].push(that.musicType[x]['techno'][i])
              }
            }
            break;
          case '3':
            if(that.musicType[x]['psyTrance'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['psyTrance'].push(that.musicType[x]['psyTrance'][i])
              }
            }
            break;
          case '4':
            if(that.musicType[x]['edm'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['edm'].push(that.musicType[x]['edm'][i])
              }
            }
            break;
        }
      }
      if(x == 1){
        switch(obj[x]){
          case '1':
            if(that.musicType[x]['psyTrance'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['psyTrance'].push(that.musicType[x]['psyTrance'][i])
              }
            }
            
            break;
          case '2':
            if(that.musicType[x]['zqb'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['zqb'].push(that.musicType[x]['zqb'][i])
              }
            }
            
            break;
          case '3':
            if(that.musicType[x]['techno'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['techno'].push(that.musicType[x]['techno'][i])
              }
            }
            break;
          case '4':
            if(that.musicType[x]['edm'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['edm'].push(that.musicType[x]['edm'][i])
              }
            }
            break;
        }
      }
      if(x == 2){
        switch(obj[x]){
          case '1':
            if(that.musicType[x]['edm'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['edm'].push(that.musicType[x]['edm'][i])
              }
            }
            
            break;
          case '2':
            if(that.musicType[x]['zqb'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['zqb'].push(that.musicType[x]['zqb'][i])
              }
            }
            break;
          case '3':
            if(that.musicType[x]['psyTrance'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['psyTrance'].push(that.musicType[x]['psyTrance'][i])
              }
            }
            break;
          case '4':
            if(that.musicType[x]['techno'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['techno'].push(that.musicType[x]['techno'][i])
              }
            }
            break;
        }
      }
      if(x == 3){
        switch(obj[x]){
          case '1':
            if(that.musicType[x]['edm'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['edm'].push(that.musicType[x]['edm'][i])
              }
            }
            
            break;
          case '2':
            if(that.musicType[x]['zqb'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['zqb'].push(that.musicType[x]['zqb'][i])
              }
            }
            break;
          case '3':
            if(that.musicType[x]['techno'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['techno'].push(that.musicType[x]['techno'][i])
              }
            }
            break;
          case '4':
            if(that.musicType[x]['psyTrance'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['psyTrance'].push(that.musicType[x]['psyTrance'][i])
              }
            }
            break;
        }
      }
      if(x == 4){
        switch(obj[x]){
          case '1':
            if(that.musicType[x]['techno'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['techno'].push(that.musicType[x]['techno'][i])
              }
            }
            break;
          case '2':
            if(that.musicType[x]['psyTrance'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['psyTrance'].push(that.musicType[x]['psyTrance'][i])
              }
            }
            break;
          case '3':
            if(that.musicType[x]['zqb'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['zqb'].push(that.musicType[x]['zqb'][i])
              }
            }
            break;
          case '4':
            if(that.musicType[x]['edm'].length > 0){
              for(let i = 0; i < 3; i++){
                selectTextArr['edm'].push(that.musicType[x]['edm'][i])
              }
            }
            break;
        }
      }
    }
    // console.log(selectTextArr)
    let percent = {
      'zqb': 0,
      'techno': 0,
      'psyTrance': 0,
      'edm': 0
    }
    //确认所选词默认字体大小 + 什么字体
    this.selectWords = [
      {
        'fontSize': '12',
        'zqb': []
      },
      {
        'fontSize': '12',
        'techno': []
      },
      {
        'fontSize': '12',
        'psyTrance': []
      },
      {
        'fontSize': '12',
        'edm': []
      }
    ]
    // 计算百分比
    resultPercent(selectTextArr['zqb'],'zqb');
    resultPercent(selectTextArr['techno'],'techno');
    resultPercent(selectTextArr['psyTrance'],'psyTrance');
    resultPercent(selectTextArr['edm'],'edm');
    //计算最终百分比 + 确认所选词
    function resultPercent(obj,musictType) {
      if(obj){
        if(obj.length > 1){
          let num =  parseInt(obj.length / 3);
          percent[musictType] = parseFloat(num / 5)
        }else{ //没有词
          percent[musictType] = 0;
        }
      }
      //将百分比转化成要选多少词
      switch (musictType){
        case 'zqb':
          selectWord('zqb',selectTextArr['zqb']);
          break;
        case 'techno':
          selectWord('techno',selectTextArr['techno']);
          break;
        case 'psyTrance':
          selectWord('psyTrance',selectTextArr['psyTrance']);
          break;
        case 'edm':
          selectWord('edm',selectTextArr['edm']);
          break; 
      }
      function selectWord(key,obj) { //1音乐类型 2所对应关键词
        // console.log(obj)
        switch (key){
          case 'zqb':
            let zqb_num = percent['zqb'] * 10;
            let len0 = obj.length;
            for(let i = 0; i < zqb_num; i++){
              let n = that.random(0,len0 - i);
              that.selectWords[0]['zqb'].push( obj[n])
              obj.splice(n,1);
            }
            break;
          case 'techno':
            let techno_num = percent['techno'] * 10;
            let len1 = obj.length;
            for(let i = 0; i < techno_num; i++){
              let n1 = that.random(0,len1 - i);
              that.selectWords[1]['techno'].push( obj[n1]);
              obj.splice(n1,1);
            }
            break;
          case 'psyTrance':
            let psyTrance_num = percent['psyTrance'] * 10;
            let len2 = obj.length;
            for(let i = 0; i < psyTrance_num; i++){
              let n2 = that.random(0,len2 - i);
              that.selectWords[2]['psyTrance'].push( obj[n2]);
              obj.splice(n2,1);
            }
            break;
          case 'edm':
            let edm_num = percent['edm'] * 10;
            let len3 = obj.length;
            for(let i = 0; i < edm_num; i++){
              let n3 = that.random(0,len3 - i);
              that.selectWords[3]['edm'].push(obj[n3])
              obj.splice(n3,1);
            }
            break;
        }
      }
      // console.log(that.selectWords)
    }
    //变量bg
    this.showBg(percent);     //展示bg
    //常量img
    let constantImg = imageLoad.opts.sources.constantImg;
    let constantLen = imageLoad.opts.sources.constantImg.posi.length;
    this.constantImg(constantImg,constantLen);
    //变量内容
    this.showBattery(percent);              //展示电池
    this.drawVector(percent);               //展示关键词
    this.showHead(percent,this.maxIndex,function(){
      result.convertCanvasToImage();
    });   //展示头像
    this.showQuoteMusic(this.maxIndex);     //展示推荐歌单
  }
  
  result.prototype.random = function(min,max) {
    let Range = max - min;   
    let Rand = Math.random();
    return(min + Math.floor(Rand * Range));
  }
  //接受答案
  result.prototype.urlSplit = function(){
    let url =  location.search;
    var loc = url.substring(url.lastIndexOf('=')+1, url.length);
    //将答案保存
    this.answerData = [];
    this.answerData.push( parseFloat (loc.split('')) );
    let max = Math.max.apply(null,this.answerData); //最大值
    let index = this.answerData.indexOf(max);       //最大值位置
    this.main(loc);
  }

  //画bg
  result.prototype.showBg = function(percent){
    let that = this;
    let bgImg = imageLoad.opts.sources.bgImg;
    let data = [];
    for(let x in percent){
      data.push(parseFloat(percent[x]))
    }
    this.max = Math.max.apply(null,data);   //最大值
    this.maxIndex = data.indexOf(this.max); //最大值位置
    $(this.canvas).drawImage({
      layer: true,
      name: 'bgImg',
      source: bgImg['source'][that.maxIndex],
      x: bgImg['posi'][0]['x'], y: bgImg['posi'][0]['y'],
      width: bgImg['posi'][0]['width'], height: bgImg['posi'][0]['height']
    })
  }

  //画常量元素
  result.prototype.constantImg = function(imgObj,len) {
    for(let i = 0; i < len; i++){
      $(this.canvas).drawImage({
        layer: true,
        name: 'constantImg' + '_' + i,
        source: imgObj['source'][i],
        x: imgObj['posi'][i]['x'], y: imgObj['posi'][i]['y'],
        width: imgObj['posi'][i]['width'], height: imgObj['posi'][i]['height']
      })
    }
  }

  //画变量电池
  result.prototype.drawBatteryImg = function(imgObj,typeIndex,imgIndex) {
    $(this.canvas).drawImage({
      layer: true,
      name: 'batteryImg' + '_' + typeIndex,
      source: imgObj['source'][imgIndex],
      x: imgObj['posi'][typeIndex]['x'], y: imgObj['posi'][typeIndex]['y'],
      width: imgObj['posi'][typeIndex]['width'], height: imgObj['posi'][typeIndex]['height']
    })
  }

  //显示电池
  result.prototype.showBattery = function(percent) {
    let that = this;
    let batteryImg = imageLoad.opts.sources.batteryImg;
    console.log(percent)
    for(let x in percent){
      // console.log(x + ':' + percent[x])
      switch (x){
        case 'zqb':
          show(percent['zqb'],3);
          break;
        case 'techno':
          show(percent['techno'],1);
          break;
        case 'psyTrance':
          show(percent['psyTrance'],2);
          break;
        case 'edm':
          show(percent['edm'],0);
      }
    }
    function show(percent,musicType){ 
      switch(percent){
        case 0:
          that.drawBatteryImg(batteryImg,musicType,0);
          break;
        case 0.2:
          that.drawBatteryImg(batteryImg,musicType,0); 
          break;
        case 0.4:
          that.drawBatteryImg(batteryImg,musicType,1); 
          break;
        case 0.6:
          that.drawBatteryImg(batteryImg,musicType,2);
          break;
        case 0.8:
          that.drawBatteryImg(batteryImg,musicType,3);
          break;
        case 1:
          that.drawBatteryImg(batteryImg,musicType,4);
          break;
        default:
          that.drawBatteryImg(batteryImg,musicType,0);
      }
    }
  }

  //展示头像 155 160 75
  result.prototype.showHead = function(percent,index,callback){
    let that = this;
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let headImg = userInfo.userIcon;
    // let headImg = testSurr() + '/icon/oZYUH0yBPaAA_55n2Dv87eW5KT-U.jpg';
    let headFlag = imageLoad.opts.sources.headImg; //获取头像挂件,4个
    console.log(headImg)
    //设置头像
    function setHeadImg(ctx, img, x, y, r) {
      ctx.save();
      var d = 2 * r;
      var cx = x;
      var cy = y;
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.clip();
      // ctx.drawImage(img, x, y, d, d);
      $(that.canvas).drawImage({
        layer: true,
        name: 'headImg',
        source: img,
        x: x, y: y,
        width: d, height: d
      })
      ctx.restore();
    }
    let canvas = document.querySelector("#myCanvas");
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = headImg;
    img.onload = function(){
      setHeadImg(ctx, img, 190, 194, 37.5);
      $(that.canvas).drawImage({
        layer: true,
        name: 'headFlag',
        source: headFlag['source'][index],
        x: headFlag['posi'][index]['x'], y: headFlag['posi'][index]['y'],
        width: headFlag['posi'][index]['width'], height: headFlag['posi'][index]['height']
      });
      if(callback)callback();
    }
  }

  //展示推荐歌单
  result.prototype.showQuoteMusic = function(index){
    let musicList = [ '蒸氣不波','天際漫遊','眾合幻鏡','肉糜派對'];
    $(this.canvas).drawText({
      layer: true,
      index: 95,
      name: 'musicList',
      fillStyle: 'rgba(255,255,255,1)',
      x: 160, y: 504,
      fontSize: '7pt',
      fontFamily: 'yuanti, sans-serif',
      text: musicList[index]
    })
    .drawLayers();
  }

  //矢量图元素 圆角矩形 + 文字 + 动态排列
  result.prototype.drawVector = function(percent) {
    console.log(percent)
    let that = this;
    this.keyWord = [];
    //获取文字百分比转->显示多少词
    for(let x in percent){
      switch(x){
        case 'zqb':
          setFontSize('zqb',percent['zqb'])
          break;
        case 'techno':
          setFontSize('techno',percent['techno'])
          break;
        case 'psyTrance':
          setFontSize('psyTrance',percent['psyTrance'])
          break;
        case 'edm':
          setFontSize('edm',percent['edm'])
          break;
      }
    }
    //设置字体大小
    function setFontSize(key,val){
      for(let i = 0; i < that.selectWords.length; i++){
        for(let x in that.selectWords[i]){
          if(x == key){
            switch (val){
              case 0:
                that.selectWords[i]['fontSize'] = 10;
                break;
              case 0.2:
                that.selectWords[i]['fontSize'] = 10;
                break;
              case 0.4:
                that.selectWords[i]['fontSize'] = 12;
                break;
              case 0.6:
                that.selectWords[i]['fontSize'] = 14;
                break;
              case 0.8:
                that.selectWords[i]['fontSize'] = 16;
                break; 
              case 1:
                that.selectWords[i]['fontSize'] = 16;
                break; 
            }
          }
        }
      }
    }
    console.log(that.selectWords)
    for(let i = 0; i < that.selectWords.length; i++){
      for(let x in that.selectWords[i]){
        if(x.indexOf('fontSize') == -1){
          if(that.selectWords[i][x].length > 1){
            let len = that.selectWords[i][x].length; //有多少个标签
            // console.log(that.selectWords[i][x])
            for(let q = 0; q < that.selectWords[i][x].length; q++){
              that.keyWord.push({'fontSize':that.selectWords[i]['fontSize'],'text':that.selectWords[i][x][q]})
            }
            console.log(that.keyWord)
          }
        }
      }
    }    

    //随机位置
    function randomPosition(min,max){
      let Range = max - min;   
      let Rand = Math.random();
      let random_ = min + Math.floor(Rand * Range);
      return random_;
    }

    function boom(a, b) {
      if (a.r < b.l || a.b < b.t || a.l > b.r || a.t > b.b) {
        return false;
      } else {
        return true;
      }
    }

    function getSize(ci) {
      return {
        w: ci.fontSize * ci.text.length,
        h: ci.fontSize
      };
    }

    var boxSize = {
      w: 365,
      h: 300
    };
    //字体定位最终定位
    var rendered = [];
    //头像区
    rendered.push({
      x: 155,
      y: 160,
      w: 75,
      h: 75
    });
    render(this.keyWord);
    function render(cis) {
      cis.forEach(item => {
        var w = getSize(item).w;
        var h = getSize(item).h;
        var x = 0;
        var y = 0;
        do {
          x = randomPosition(50,325);
          y = randomPosition(110,340);
          var isBoom = rendered.every(item1 => {
            var flag = !boom(
              {
                l: item1.x - 14,
                r: item1.x + item1.w + 14,
                t: item1.y - 14,
                b: item1.y + item1.h + 14
              },
              {
                l: x - 14,
                r: x + w + 14,
                t: y - 14,
                b: y + h + 14
              }
            );
            // console.log(item.text,flag);
            return flag;
          });
          // console.log('-----');
        } while (!isBoom);
        rendered.push({
          x: x,
          y: y,
          w: w,
          h: h
        });
      });
    }
    // console.log(rendered)
    textPosition()
    //字体定位显示
    function textPosition(){
      for(let i = 0; i < 10; i++){
        cycle(i,rendered[i+1]['x'],rendered[i+1]['y'], that.keyWord[i]['fontSize'], that.keyWord[i]['text']);
      }
    }
    function cycle(index,x,y,textSize,texts){//1.字体层级 2. 图层位置X 3.y  4.字体大小 
      $(that.canvas).drawText({
        layer: true,
        index: parseFloat(index + 1),
        fillStyle: 'rgba(255,255,255,1)',
        x: x, y: y,
        fontSize: textSize + 'pt',
        fontFamily: 'yuanti,sans-serif',
        text: texts
      })
      // 绘制一个矩形，和文本一样宽/高
      .drawRect({
        layer: true,
        index: index + 1,
        fillStyle: 'rgba(0,0,0,.5)',
        x: x, y: y,
        width: $(that.canvas).measureText(index + 1).width + 18,
        height: $(that.canvas).measureText(index + 1).height + 10,
        cornerRadius: $(that.canvas).measureText(index + 1).width / 3
      })
      .drawLayers();
    }
  }

  // 线上图片加载
  result.prototype.loadImage = function(image,loaded){ 
    let img = new Image();
    if(image.indexOf('http') == 0)img.crossOrigin="Anonymous";
    img.onload = () =>{
      loaded(img);
      setTimeout(()=>{
        img = null;
      },1000)
    };
    img.src = image;
  }  

  //生成展示页图片
  result.prototype.convertCanvasToImage = function(canvas) {
    let that = this;
    let url = testSurr() + requestUrl.showImg;
    let base64 = $('#myCanvas').getCanvasImage('jpeg', 0.92);
    let base64Str = base64.split('data:image/jpeg;base64,')[1];
    // img.crossOrigin = "anonymous";
    that.onRequest(url,{"base64String":base64Str,"fileType": "jpeg"},function(data){
      console.log(data)
      if(data.code == 'OK'){
        let img = new Image();
        img.id = 'resultImage';
        img.src = data.data.url;
        img.onload = function(){
          $('#content').append(img);
          $('#loadingBg').attr('class','hide');
          $('#title').css({'z-index':'99'});
        }
        //图片预览
        $('#content').bind('click',function(){
          wx.previewImage({
            current: data.data.url,
            urls: [data.data.url]
          });
        })
      }else{
        console.log(data.code +':'+ data.message);
      }
    });
  }

  result.prototype.onRequest = function(url,data,callback){
    let that = this;
    $.ajax({
      type: 'POST',
      url: url,
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

  var result = new result();
}()