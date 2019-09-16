'use strict';
function Random(){
    // this.headArrNum = [];
    // this.randomScore = this.randomNum(80,98);
    this.tips = '';

}
// 排行榜数据
/*
    Random.prototype.resultPage  = function(){
        let firstname = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "楮", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹", "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明", "臧", "计", "伏", "成", "戴", "谈", "宋", "茅", "庞", "熊", "纪", "舒", "屈", "项", "祝", "董", "梁", "杜", "阮", "蓝", "闽", "席", "季", "麻", "强", "贾", "路", "娄", "危", "江", "童", "颜", "郭", "梅", "盛", "林", "刁", "锺", "徐", "丘", "骆", "高", "夏", "蔡", "田", "樊", "胡", "凌", "霍", "虞", "万", "支", "柯", "昝", "管", "卢", "莫", "经", "房", "裘", "缪", "干", "解", "应", "宗", "丁", "宣", "贲", "邓", "郁", "单", "杭", "洪", "包", "诸", "左", "石", "崔", "吉", "钮", "龚", "程", "嵇", "邢", "滑", "裴", "陆", "荣", "翁", "荀", "羊", "於", "惠", "甄", "麹", "家", "封", "芮", "羿", "储", "靳", "汲", "邴", "糜", "松", "井", "段", "富", "巫", "乌", "焦", "巴", "弓", "牧", "隗", "山", "谷", "车", "侯", "宓", "蓬", "全", "郗", "班", "仰", "秋", "仲", "伊", "宫", "宁", "仇", "栾", "暴", "甘", "斜", "厉", "戎", "祖", "武", "符", "刘", "景", "詹", "束", "龙", "叶", "幸", "司", "韶", "郜", "黎", "蓟", "薄", "印", "宿", "白", "怀", "蒲", "邰", "从", "鄂", "索", "咸", "籍", "赖", "卓", "蔺", "屠", "蒙", "池", "乔", "阴", "郁", "胥", "能", "苍", "双", "闻", "莘", "党", "翟", "谭", "贡", "劳", "逄", "姬", "申", "扶", "堵", "冉", "宰", "郦", "雍", "郤", "璩", "桑", "桂", "濮", "牛", "寿", "通", "边", "扈", "燕", "冀", "郏", "浦", "尚", "农", "温", "别", "庄", "晏", "柴", "瞿", "阎", "充", "慕", "连", "茹", "习", "宦", "艾", "鱼", "容", "向", "古", "易", "慎", "戈", "廖", "庾", "终", "暨", "居", "衡", "步", "都", "耿", "满", "弘", "匡", "国", "文", "寇", "广", "禄", "阙", "东", "欧", "殳", "沃", "利", "蔚", "越", "夔", "隆", "师", "巩", "厍", "聂", "晁", "勾", "敖", "融", "冷", "訾", "辛", "阚", "那", "简", "饶", "空", "曾", "毋", "沙", "乜", "养", "鞠", "须", "丰", "巢", "关", "蒯", "相", "查", "后", "荆", "红", "游", "竺", "权", "逑", "盖", "益", "桓", "公", "万俟", "司马", "上官", "欧阳", "夏侯", "诸葛", "闻人", "东方", "赫连", "皇甫", "尉迟", "公羊", "澹台", "公冶", "宗政", "濮阳", "淳于", "单于", "太叔", "申屠", "公孙", "仲孙", "轩辕", "令狐", "锺离", "宇文", "长孙", "慕容", "鲜于", "闾丘", "司徒", "司空", "丌官", "司寇", "仉", "督", "子车", "颛孙", "端木", "巫马", "公西", "漆雕", "乐正", "壤驷", "公良", "拓拔", "夹谷", "宰父", "谷梁", "晋", "楚", "阎", "法", "汝", "鄢", "涂", "钦", "段干", "百里", "东郭", "南门", "呼延", "归", "海", "羊舌", "微生", "岳", "帅", "缑", "亢", "况", "后", "有", "琴", "梁丘", "左丘", "东门", "西门", "商", "牟", "佘", "佴", "伯", "赏", "南宫", "墨", "哈", "谯", "笪", "年", "爱", "阳", "佟", "第五", "言", "福"]
        let englishname = 'aporhjbmvncjrovmbxvzzoeclolmqlpvsdffgfgfABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.anotherUserInfo = [
            {
                num: '1.',
                headUrl: this.randomHeadImg(0, 10),
                name: (this.getRandomArrayElements(firstname, 1) + this.getRandomArrayElements(firstname,this.randomNum(1,1))).replace(',',''),
                score: this.randomScore -= this.randomNum(1,6),
            },{
                num: '2.',
                headUrl: this.randomHeadImg(0, 10),
                name: this.substring(englishname, this.randomNum(1,3)),
                score: this.randomScore -= this.randomNum(1,10),
            },{
                num: '3.',
                headUrl: this.randomHeadImg(0, 10),
                name: (this.getRandomArrayElements(firstname, 1) + this.getRandomArrayElements(firstname,this.randomNum(1,1))).replace(',',''),
                score: this.randomScore -= this.randomNum(1,10),
            },{
                num: '4.',
                headUrl: this.randomHeadImg(0, 10),
                name: (this.getRandomArrayElements(firstname, 1) + this.getRandomArrayElements(firstname,this.randomNum(1,1))).replace(',',''),
                score: this.randomScore -= this.randomNum(1,6),
            },{
                num: '5.',
                headUrl: this.randomHeadImg(0, 10),
                name: (this.getRandomArrayElements(firstname, 1) + this.getRandomArrayElements(firstname,this.randomNum(1,1))).replace(',',''),
                score: this.randomScore -= this.randomNum(1,6),
            }
        ]
        console.log(this.anotherUserInfo)
    }
*/
 // 登月小知识
Random.prototype.onMoonTips = function(){
    let tipsArr = [
        '我国的嫦娥四号探测器经历地月转移、近月制动、环月飞行，最终实现了人类首次月球背面软着陆。',
        '在月球上着陆是登月式飞船的关键技术，因为月球上没有大气层，所有靠大气阻力的着陆手段都无法应用。',
        '首次载人登月是由阿波罗11号飞船于1969年7月完成的，今年是人类登月50周年。',
        '月球车可以扩大航天员的活动范围和减少航天员的体力消耗，存放和运输航天员采集的岩石和土壤标本。',
        '2004年，中国正式开展月球探测工程，命名为“嫦娥工程”。'
    ];
    this.tips = tipsArr[this.randomNum(0, 4)];
}

// 随机截取数组汉字
/*
    Random.prototype.getRandomArrayElements = function(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
*/
// 生成[n,m]的随机整数
Random.prototype.randomNum = function(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

// 英文名字符串解决
/*
    Random.prototype.substring = function(str, num){
        let name = '';
        for(var i = 0;i < num; i++){
            var n = Math.floor(Math.random()*(str.length));
            name += str.substring(n, n+1);
        }
        return name;
    }
*/

// 随机获取头像
/*
    Random.prototype.randomHeadImg = function(minNum, maxNum){
        let avatarUrls = ['head_0.png', 'head_1.png', 'head_2.png','head_3.png','head_4.png','head_5.png','head_6.png','head_7.png','head_8.png','head_9.png','head_10.png'];
        if(maxNum > avatarUrls.length || minNum < 0){
            return '头像没有' + maxNum + '个这么多～'
        }
        var maxTimes = 60;
        do{
            var num = this.randomNum(minNum, maxNum);
            if(-1 == this.headArrNum.indexOf(num)){ // 数组中不存在
                this.headArrNum.push(num);
                console.log(this.headArrNum)
                return './images/' + avatarUrls[num];
            }
            maxTimes--;
        }while (maxTimes);
    }
*/

let random = new Random();
// random.resultPage();
random.onMoonTips();