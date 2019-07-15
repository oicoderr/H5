var configData = {
	'nextUrl':'http://172.16.0.115:8020/H5Page/72hours_Cp/Questionnaire/index.html',
	'caveatMessage':{	//提示信息
	'nikeNameText': '昵称长度不可超过12个字符',
	'telText': '不是有效的11位手机号,请重新输入!',
	'jobText': '请重新输入从业领域!',
	'lackText': '请将信息填写完整'
	}
};

var selfMessageData = {
	'nikeName':null,
	'tel':null,
	'sex': null,
	'birthday':null,
	'birthplace':null,
	'nowPlace':null,
	'sameCity':null,
	'educationGrade':null,
	'job':null
};
$(document).ready(function(evt) {
	//创建布局标签
  var elements = `
    <div id='bodyBox'>
	    <p id='title'></p>
	 	  <p id='titleInfo'></p>
	 		  <div id='userMessage'>
	 			  <ul></ul>
	 			</div>
	 	  <p id='clickMe'></p>
	 	  <div id='caveatWrap' class='hide'>
	 	  		<div id='caveatBox'></div>
	 	  <div>
 	  </div>`;
  $(document.body).append(elements);
	
	//json数据
  var elementsJson = [
    {
			'name':'userName',
			'title':'昵称',
			'titlePrompt':'请输入昵称'
		},
		{
			'name':'tel',
			'title':'手机',
			'titlePrompt':'请输入手机号'
		},
		{
			'name':'sex',
			'title':'性别',
			'titlePrompt':'请输入性别'
		},
		{
			'name':'birthday',
			'title':'生日',
			'titlePrompt':'请输入出生日期'
		},
		{
			'name':'birthplace',
			'title':'出生地',
			'titlePrompt':'请输入出生地'
		},
		{
			'name':'	nowPlace',
			'title':'现居地',
			'titlePrompt':'请输入现居住地'
		},
		{
			'name':'	sameCity',
			'title':'是否接受同城',
			'titlePrompt':'是/否'
		},
		{
			'name':'	teachLevel',
			'title':'教育水平',
			'titlePrompt':'请输入教育水平'
		},
		{
			'name':'	job',
			'title':'从业领域',
			'titlePrompt':'请输入从业领域'
    }
  ];
  //动态塞li数据
	for(let i = 0; i < elementsJson.length; i++){
		str = `<li>
			<span class='titleHead'>${elementsJson[i]['title']}</span>
			<input class='wirteInfo' type="text" name=${elementsJson[i]['name']} placeholder=${elementsJson[i]['titlePrompt']}>
		</li>`;
		$('#userMessage ul').append(str);
	}
 	//设备判断
	$(function () {
	  var u = navigator.userAgent;
	  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      $('input').css({'margin-top':'0.143333rem'})
    }
    if(isIOS){
    		if(screen.height == 568 && screen.width == 320){
    			$('input').css({'margin-top':'0.143333rem'})
    		}
    }
  });	
     	
  //所有input
  var inputs = $('#userMessage').find('ul li input');
  //input输入：正则过滤;  p存储数据 	
 	for(let i = 0; i < inputs.length; i++){
		switch(inputs[i]['name']){
 			case 'userName':
		 		$(inputs[i]).blur(function(){
		 			var tval = $(this).val();
		 			var tvalnum = tval.length;
		 			if( tvalnum > 12 ){          
				     $(this).val(tval);
				     $(this).val( tval.substring(0,12) );
				     //赋值后端传值
	           selfMessageData['nikeName'] = $(this).val( tval.substring(0,12) );
	           $("#caveatWrap").removeClass("hide");
	           $("#caveatBox")[0].innerText = configData['caveatMessage']['nikeNameText'];
							
				     return false
				  }else{
				  		//赋值后端传值
	          selfMessageData['nikeName'] = $(this).val();
				  }
		 			if( tval.len() > 12){
		 				$("#caveatWrap").removeClass("hide");
		 				$("#caveatBox")[0].innerText = configData['caveatMessage']['nikeNameText'];
		 				$(this).val('');
		 			}else{
	          selfMessageData['nikeName'] = $(this).val();
		 			}
		 		})
 				break;
 			case 'tel':
 				$(inputs[i]).blur(function(){
 					if( !(/^[1][3,4,5,7,8][0-9]{9}$/.test( $(this).val()))){
 						$("#caveatWrap").removeClass("hide");
 						$("#caveatBox")[0].innerText = configData['caveatMessage']['telText'];
 						$(this).val('');
 					}else{
 						selfMessageData['tel'] = $(this).val();
 					}
		 		})
 				break;
 			case 'sex':
 				$(inputs[i]).focus(function(){
    				document.activeElement.blur();
		 		});
		 		$(inputs[i]).parent().append("<p class='hide' id='dataSex'></p>");
 				$(inputs[i]).attr({'class':'wirteInfo','id':'sex'});
 				break;
 			case 'birthday':
 				$(inputs[i]).focus(function(){
    				document.activeElement.blur();
		 		});
		 		$(inputs[i]).parent().append("<p class='hide' id='dataBirthday'></p>");
 				$(inputs[i]).attr({'class':'wirteInfo', 'id':'birthday'});
 				break;
 			case 'birthplace':
 				$(inputs[i]).focus(function(){
    				document.activeElement.blur();
		 		});
				$(inputs[i]).parent().append("<p class='hide' id='show_contact'></p><p class='hide' id='contact_province_code'></p><p class='hide' id='contact_city_code'></p>")
 				$(inputs[i]).attr({'class':'wirteInfo','id':'birthplace'});
 				break;
 			case 'nowPlace':
 				$(inputs[i]).focus(function(){
    				document.activeElement.blur();
		 		});
		 		$(inputs[i]).parent().append("<p class='hide' id='show_contact_one'></p><p class='hide' id='contact_province_code_two'></p><p class='hide' id='contact_city_code_three'></p>")
 				$(inputs[i]).attr({'class':'wirteInfo','id':'nowPlace'});
 				break;
 			case 'sameCity':
 				$(inputs[i]).focus(function(){
    				document.activeElement.blur();
		 		});
		 		$(inputs[i]).parent().append("<p class='hide' id='dataYesOrNo'></p>");
 				$(inputs[i]).attr({'class':'wirteInfo','id':'sameCity'});
 				break;
 			case 'teachLevel':
 				$(inputs[i]).focus(function(){
    				document.activeElement.blur();
		 		});
		 		$(inputs[i]).parent().append("<p class='hide' id='dataEducationGrade'></p>");
 				$(inputs[i]).attr({'class':'wirteInfo','id':'teachLevel'});
 				break;
 			case 'job':
 				$(inputs[i]).blur(function(){
		 			var tval = $(this).val();
		 			var tvalnum = tval.length;
		 			var regText = /^[\u2E80-\u9FFF]+$/;
		 			if( regText.test( tval )){
		 				if( tval.len() <= 18 && tval.len() >=4){
		 					//赋值后端传值
	          		selfMessageData['job'] = $(this).val();
	          		console.log(selfMessageData)
		 				}else{
		 					$("#caveatWrap").removeClass("hide");
		 					$("#caveatBox")[0].innerText = configData['caveatMessage']['jobText'];
		 					$(this).val('');
		 				}
		 			}else{
		 				$("#caveatWrap").removeClass("hide");
		 				$("#caveatBox")[0].innerText = configData['caveatMessage']['jobText'];
		 				$(this).val('');
		 			}
		 		})
 				break;
 		}
		
 	}
 	
 	//中英文字符串长度截取
 	String.prototype.len=function(){                 
		return  this.replace(/[^\x00-\xff]/g,"rr").length;          
	}
 	$("#caveatWrap").bind("click",function(event){
 		event.preventDefault();
 		$("#caveatWrap").addClass("hide");
 	})
   
   var lenJson = 0, trueLenJson = 0;
	//开始校验信息是否为存在，ajax后端传信息
	$('#clickMe').bind("click",function(){
		//判断有多少个json数据
		for(var item in selfMessageData){
			lenJson++;
		}
	  for (var key in selfMessageData) {
		  if(selfMessageData[item] == null || selfMessageData[item] == undefined){
		  		$("#caveatWrap").removeClass("hide");
		  		$("#caveatBox")[0].innerText = configData['caveatMessage']['lackText'];
				console.log("缺少数据:"+selfMessageData[item])
				continue;
			}else{
				trueLenJson++;
				console.log('已有'+trueLenJson+'数据');
				if(lenJson == trueLenJson){
//					$(location).attr('href', configData['nextUrl']);
					window.location.replace(configData['nextUrl']);
					sendAjax(selfMessageData);
					
				}
			}
		}
	});	
	
	function sendAjax(data){
	  $.ajax({
      type: 'post',
      url: 'http://www.sina.cn',
      data: data,
      global: true, //默认触发全局Ajax事件
      async: false,  //默认异步true
      error: function(event,xhr,options,exc){
    	    console.log("发送失败!");
      },
      success: function(data,textStatus,jqXHR) {
        console.log(data);//toDo
//      $(location).attr('href', configData['nextUrl']);
			  window.location.replace(configData['nextUrl']);
      }
    	});
	}
});

//onload
window.onload = function(){
	sex();
	function sex(){
	  var inputs = $('#userMessage').find('ul li input');
	  var selectSex = document.querySelector('#sex');
	  var storageSex = document.querySelector('#dataSex');
	  
	  selectSex.addEventListener('click', function () {
	    var bankId = selectSex.dataset['id'];
	    var bankName = selectSex.dataset['value'];
	    var bankSelect = new IosSelect(1, 
	      [data_sex],
	      {
	        title: '请输入性别',
	        oneLevelId: bankId,
	        itemHeight: 0.4,
	        headerHeight: 0.66,
	        itemShowCount: 2,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	          storageSex.value = selectOneObj.id;
	          storageSex.innerHTML = selectOneObj.value;
	          storageSex.dataset['id'] = selectOneObj.id;
	          storageSex.dataset['value'] = selectOneObj.value;
	          //赋值后端传值
	          selfMessageData['sex'] = selectOneObj.value;
	          //前台‘值’更新显示
	          selectSex.value = selectOneObj.value;
	        }
	      });
    });
	}
 	
 	birthday();
 	function birthday(){
	  var selectBirthday = $('#birthday');
	  var storageBirthday = $('#dataBirthday');
	  // 初始化时间
	  var now = new Date();
	  var nowYear = now.getFullYear();
	  var nowMonth = now.getMonth() + 1;
	  var nowDate = now.getDate();
	  var nowHour = now.getHours();
	  var nowMinute = now.getMinutes();
	  storageBirthday.attr('data-year', nowYear);
	  storageBirthday.attr('data-month', nowMonth);
	  storageBirthday.attr('data-date', nowDate);
	  storageBirthday.attr('data-hour', nowHour);
	  storageBirthday.attr('data-minute', nowMinute);
    // 数据初始化
    function formatYear (nowYear) {
      var arr = [];
      for (var i = nowYear - 48; i <= nowYear; i++) {
        arr.push({
          id: i + '',
          value: i + '年'
        });
      }
      return arr;
    }
    function formatMonth () {
      var arr = [];
      for (var i = 1; i <= 12; i++) {
        arr.push({
          id: i + '',
          value: i + '月'
        });
      }
      return arr;
    }
    function formatDate (count) {
      var arr = [];
      for (var i = 1; i <= count; i++) {
        arr.push({
          id: i + '',
          value: i + '日'
        });
      }
      console.log(arr)
      return arr;
    }   
    function formatHour(){
    		var arr = [];
    		for (var i = 0; i <= 23; i++) {
        arr.push({
          id: i + '',
          value: i + '时'
        });
      }
    		console.log(arr)
      return arr;
    }
    function formatMinute(){
    		var arr = [];
    		for (var i = 0; i <= 59; i++) {
        arr.push({
          id: i + '',
          value: i + '分'
        });
      }
      return arr;
    }
    
    var yearData = function(callback) {
      // settimeout只是模拟异步请求，真实情况可以去掉
      // setTimeout(function() {
          callback(formatYear(nowYear))
      // }, 2000)
    }
    var monthData = function (year, callback) {
      // settimeout只是模拟异步请求，真实情况可以去掉
      // setTimeout(function() {
          callback(formatMonth());
      // }, 2000);
    };
    var dateData = function (year, month, callback) {
//  settimeout只是模拟异步请求，真实情况可以去掉
//  setTimeout(function() {
      if (/^(1|3|5|7|8|10|12)$/.test(month)) {
        callback(formatDate(31));
      }
      else if (/^(4|6|9|11)$/.test(month)) {
        callback(formatDate(30));
      }
      else if (/^2$/.test(month)) {
        if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
          callback(formatDate(29));
        }
        else {
          callback(formatDate(28));
        }
      } 
      else {
        throw new Error('month is illegal');
      }
//   }, 2000);
        // ajax请求可以这样写
        /*
        $.ajax({
            type: 'get',
            url: '/example',
            success: function(data) {
                callback(data);
            }
        });
        */
    };
	  var hourData = function (year, month,date,callback) {
      // settimeout只是模拟异步请求，真实情况可以去掉
      // setTimeout(function() {
          callback(formatHour());
       //}, 2000);
    };
    var minuteData = function (year, month,date,hour,callback) {
      // settimeout只是模拟异步请求，真实情况可以去掉
      // setTimeout(function() {
          callback(formatMinute());
      // }, 2000);
    };
 	  
 	  selectBirthday.bind('click', function () {
      var oneLevelId = storageBirthday.attr('data-year');
      var twoLevelId = storageBirthday.attr('data-month');
      var threeLevelId = storageBirthday.attr('data-date');
      var fourLevelId = storageBirthday.attr('data-hour');
      var fiveLevelId = storageBirthday.attr('data-minute');
      var iosSelect = new IosSelect(5, 
        [yearData, monthData, dateData, hourData, minuteData ],
        {
          title: '请输入出生日期',
          oneLevelId: oneLevelId,
          twoLevelId: twoLevelId,
          threeLevelId: threeLevelId,
          fourLevelId: fourLevelId,
          fiveLevelId: fiveLevelId,
          showLoading: true,
	        itemHeight: 0.56,
	        headerHeight: 0.66,
	        itemShowCount: 7,       
          cssUnit: 'rem',
          callback: function (selectOneObj, selectTwoObj, selectThreeObj,selectFourObj,selectFiveObj) {
            storageBirthday.attr('data-year', selectOneObj.id);
            storageBirthday.attr('data-month', selectTwoObj.id);
            storageBirthday.attr('data-date', selectThreeObj.id);
            storageBirthday.attr('data-hour', selectFourObj.id);
            storageBirthday.attr('data-minute', selectFiveObj.id);
            storageBirthday.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value + ' ' + selectFourObj.value + ' ' + selectFiveObj.value );
          		//赋值后端传值
	          selfMessageData['birthday'] = {
	          		"year":selectOneObj.id,
	          		"month": selectTwoObj.id,
	          		"date":selectThreeObj.id,
	          		"hour":selectFourObj.id,
	          		"minute":selectFiveObj.id
	          }
	          //前台‘值’更新显示
	          selectBirthday.val( $("#dataBirthday")[0].innerText );
	          console.log(selfMessageData)
          }
        });
    });
	  
 	}
	
	birthplace();
	function birthplace(){
    var selectContactDom = $('#birthplace');
    var showContactDom = $('#show_contact');
    var contactProvinceCodeDom = $('#contact_province_code');
    var contactCityCodeDom = $('#contact_city_code');
    
    selectContactDom.bind('click', function () {
      var sccode = showContactDom.attr('data-city-code');
      var scname = showContactDom.attr('data-city-name');

      var oneLevelId = showContactDom.attr('data-province-code');
      var twoLevelId = showContactDom.attr('data-city-code');
      var threeLevelId = showContactDom.attr('data-district-code');
      var iosSelect = new IosSelect(3, 
        [iosProvinces, iosCitys, iosCountys],
        {
          title: '请输入出生地',
          relation: [1, 1],
          itemHeight: .56,
        		headerHeight: 0.66,
        		itemShowCount: 2,
          cssUnit: 'rem',
          callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
            contactProvinceCodeDom.val(selectOneObj.id); 
            contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
            contactCityCodeDom.val(selectTwoObj.id);
            contactCityCodeDom.attr('data-city-name', selectTwoObj.value);
            showContactDom.attr('data-province-code', selectOneObj.id);
            showContactDom.attr('data-city-code', selectTwoObj.id);
            showContactDom.attr('data-district-code', selectThreeObj.id);
            showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value );//+ ' ' + selectThreeObj.value	
          		//赋值后端传值
	          selfMessageData['birthplace'] = {
	          		"province":selectOneObj.value,
	          		"city": selectTwoObj.value,
	          		"district":selectThreeObj.value
	          }
	          //前台‘值’更新显示
	          selectContactDom.val( $("#show_contact")[0].innerText );
	          console.log(selfMessageData)
          }
       });
    });

	}
	
	nowPlace();
	function nowPlace(){
		
    var selectContactDom = $('#nowPlace');
    var showContactDom = $('#show_contact_one');
    var contactProvinceCodeDom = $('#contact_province_code_two');
    var contactCityCodeDom = $('#contact_city_code_three');
    
    selectContactDom.bind('click', function () {
      var sccode = showContactDom.attr('data-city-code');
      var scname = showContactDom.attr('data-city-name');
      var oneLevelId = showContactDom.attr('data-province-code');
      var twoLevelId = showContactDom.attr('data-city-code');
      var threeLevelId = showContactDom.attr('data-district-code');
      var iosSelect = new IosSelect(3, 
        [iosProvinces, iosCitys, iosCountys],
        {
          title: '请输入现居住地',
          relation: [1, 1],
          itemHeight: .56,
        		headerHeight: 0.66,
        		itemShowCount: 2,
          cssUnit: 'rem',
          callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
            contactProvinceCodeDom.val(selectOneObj.id); 
            contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
            contactCityCodeDom.val(selectTwoObj.id);
            contactCityCodeDom.attr('data-city-name', selectTwoObj.value);
            showContactDom.attr('data-province-code', selectOneObj.id);
            showContactDom.attr('data-city-code', selectTwoObj.id);
            showContactDom.attr('data-district-code', selectThreeObj.id);
            showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value );
            console.log($("#show_contact_one")[0].innerText)
            //赋值后端传值
	          selfMessageData['nowPlace'] = {
	          		"province":selectOneObj.value,
	          		"city": selectTwoObj.value,
	          		"district":selectThreeObj.value
	          }
	          //前台‘值’更新显示
	          selectContactDom.val( $("#show_contact_one")[0].innerText );
	          console.log(selfMessageData)
          }
       });
    });
	}
	
	sameCity();
	function sameCity(){
	  var yesOrNo = document.querySelector('#sameCity');
	  var dataYesOrNo = document.querySelector('#dataYesOrNo');
	  
	  yesOrNo.addEventListener('click', function () {
    var bankId = dataYesOrNo.dataset['id'];
    var bankName = dataYesOrNo.dataset['value'];
    var bankSelect = new IosSelect(1, 
      [data_yes_no],
      {
        title: '是否接受同城',
        oneLevelId: bankId,
        itemHeight: 0.4,
        headerHeight: 0.66,
        itemShowCount: 2,
        cssUnit: 'rem',
        callback: function (selectOneObj) {
          dataYesOrNo.value = selectOneObj.id;
          dataYesOrNo.innerHTML = selectOneObj.value;
          dataYesOrNo.dataset['id'] = selectOneObj.id;
          dataYesOrNo.dataset['value'] = selectOneObj.value;
          //赋值后端传值
          selfMessageData['sameCity'] = selectOneObj.value;
          //前台‘值’更新显示
          yesOrNo.value = selectOneObj.value;
        }
      });
      
    });
	}
	
	educationGrade();
	function educationGrade(){
	
	  var selectTeachLevel = document.querySelector('#teachLevel');
	  var storageEducation = document.querySelector('#dataEducationGrade');
	  selectTeachLevel.addEventListener('click', function () {
	    var bankId = selectTeachLevel.dataset['id'];
	    var bankName = selectTeachLevel.dataset['value'];
	    var bankSelect = new IosSelect(1, 
	      [education_grade],
	      {
	        title: '请输入教育水平',
	        oneLevelId: bankId,
	        itemHeight: 0.4,
	        headerHeight: 0.66,
	        itemShowCount: 2,
	        cssUnit: 'rem',
	        callback: function (selectOneObj) {
	          storageEducation.value = selectOneObj.id;
	          storageEducation.innerHTML = selectOneObj.value;
	          storageEducation.dataset['id'] = selectOneObj.id;
	          storageEducation.dataset['value'] = selectOneObj.value;
	          //赋值后端传值
	          selfMessageData['educationGrade'] = selectOneObj.value;
	          //前台‘值’更新显示
	          selectTeachLevel.value = selectOneObj.value;
	          console.log(selfMessageData)
	        }
	      });
    });
	}

};