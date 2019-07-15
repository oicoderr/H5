var configData = {
	'nextUrl':'../startMatching/index.html',
	'questionnaire':{ //调查问卷问题及答案
	  'firstQuesAnswer':{
	  		'title':'周末的时候最喜欢干什么?',
	  		'answer'	:["吃饭","睡觉","打豆豆"]
	  },
	  'secondQuesAnswer':{
	  		'title':'周末的时候最喜欢干什么2?',
	  		'answer'	:["吃饭2","睡觉2","打豆豆2"]
	  },
	  'thirdQuesAnswer':{
	  	  'title':'周末的时候最喜欢干什么3?',
	  		'answer'	:["吃饭3","睡觉3","打豆豆3"]
	  },
	  'fourthQuesAnswer':{
	  	  'title':'周末的时候最喜欢干什么4?',
	  		'answer'	:["吃饭4","睡觉4","打豆豆4"]
	  },
	  'fifthQuesAnswer':{
	  	  'title':'周末的时候最喜欢干什么5?',
	  		'answer'	:["吃饭5","睡觉5","打豆豆5"]
	  },
	  'sixthQuesAnswer':{
	  	  'title':'周末的时候最喜欢干什么6?',
	  		'answer'	:["吃饭6","睡觉6","打豆豆6"]
	  },
	  'seventhQuesAnswer':{
	  	  'title':'周末的时候最喜欢干什么7?',
	  		'answer'	:["吃饭7","睡觉7","打豆豆7"]
	  },
	  'eighthQuesAnswer':{
	  	  'title':'周末的时候最喜欢干什么8?',
	  		'answer'	:["吃饭8","睡觉8","打豆豆8"]
	  },
	}
}
var researchData = {
	'firstQuesAnswer':{
	  'question':'周末的时候最喜欢干什么?',
	  'answer'	:null
	},
  'secondQuesAnswer':{
    'question':'周末的时候最喜欢干什么2?',
	  	'answer'	:null
  },
  'thirdQuesAnswer':{
	  'question':'周末的时候最喜欢干什么3?',
	  'answer'	:null
  },
  'fourthQuesAnswer':{
	  'question':'周末的时候最喜欢干什么4?',
	  'answer'	:null
  },
  'fifthQuesAnswer':{
	  'question':'周末的时候最喜欢干什么5?',
	  'answer'	:null
  },
  'sixthQuesAnswer':{
	  'question':'周末的时候最喜欢干什么6?',
	  'answer'	:null
  },
  'seventhQuesAnswer':{
	  'question':'周末的时候最喜欢干什么7?',
	  'answer'	:null
  },
  'eighthQuesAnswer':{
	  'question':'周末的时候最喜欢干什么8?',
	  'answer'	:null
  },
}

var varietyData = {
  'names':['no1','no2','no3','no4','no5','no6','no7','no8'],
  'quesAnswers':['firstQuesAnswer','secondQuesAnswer','thirdQuesAnswer','fourthQuesAnswer','fifthQuesAnswer','sixthQuesAnswer'
  		,'seventhQuesAnswer', 'eighthQuesAnswer']
}

variety();
function variety(){
	var firstAnswer = researchData["firstQuesAnswer"]['answer'],secondAnswer = researchData["secondQuesAnswer"]['answer'],
	thirdAnswer = researchData["thirdQuesAnswer"]['answer'],fourthAnswer = researchData["fourthQuesAnswer"]['answer'],
	fifthAnswer = researchData["fifthQuesAnswer"]['answer'],sixthAnswer = researchData["sixthQuesAnswer"]['answer']
	seventhAnswer = researchData["seventhQuesAnswer"]['answer'],eighthAnswer = researchData["eighthQuesAnswer"]['answer'];
	
  if( firstAnswer==null && secondAnswer== null){
    $quesAnswerOne = varietyData['quesAnswers'][0];
    $quesAnswerTwo = varietyData['quesAnswers'][1];
    $nameOne = varietyData['names'][0];
    $nameTwo = varietyData['names'][1];
    console.log("我是第1-2题")
  }else if( firstAnswer != null && secondAnswer != null && thirdAnswer == null && fourthAnswer == null ){
    $quesAnswerOne = varietyData['quesAnswers'][2];
    $quesAnswerTwo = varietyData['quesAnswers'][3];
    $nameOne = varietyData['names'][2];
    $nameTwo = varietyData['names'][3];
    console.log("我是第3-4题")
  }else if( firstAnswer != null && secondAnswer != null && thirdAnswer != null && fourthAnswer != null && fifthAnswer == null && sixthAnswer == null ){
    $quesAnswerOne = varietyData['quesAnswers'][4];
    $quesAnswerTwo = varietyData['quesAnswers'][5];
    $nameOne = varietyData['names'][4];
    $nameTwo = varietyData['names'][5];
    console.log("我是第5-6题")
  }else if( firstAnswer != null && secondAnswer != null && thirdAnswer != null && fourthAnswer != null && fifthAnswer != null && sixthAnswer != null && seventhAnswer == null && eighthAnswer == null ){
    $quesAnswerOne = varietyData['quesAnswers'][6];
    $quesAnswerTwo = varietyData['quesAnswers'][7];
    $nameOne = varietyData['names'][6];
    $nameTwo = varietyData['names'][7];
    console.log("我是第7-8题")
  }else{
  		//ajax 发送数据
  		sendAjax();
  		//直接跳转页面
//		$(location).attr('href', configData['nextUrl']);
		window.location.replace(configData['nextUrl']);
  }
}

function sendAjax(){
	$.ajax({
    type: 'post',
    url: 'http://www.sina.cn',
    data: researchData,
    global: true, //默认触发全局Ajax事件
    async: false,  //默认异步true
    error: function(event,xhr,options,exc){
    		console.log("发送失败!");
    },
    success: function(data,textStatus,jqXHR) {
      console.log(data);//toDo
    }
  });
}

$(document).ready(function(evt) {
	var pagesIndex = 2;
	var elements = `<section>
								   <p id='titleInfo'></p>
								   <p id='pages'>
								     <i id='currentPage'>1</i>/4
								   </p>
								   <div class='questionA'></div>
								   <div class='questionB'></div>
								   <p id='clickMe'></p>
								   <div id='caveatWrap' class='hide'>
	 	  							   <div id='caveatBox'></div>
	 	  							 </div>
								 </section>`;
	freshData();							 
	function freshData(callback){
		$(document.body).empty();
	  $(".questionA").empty();
	  $(".questionB").empty();
  	  var firstQuestion = `<p class='title'> ${configData['questionnaire'][ $quesAnswerOne ]['title']} </p>
										  <form>
										  	  <input name= ${$nameOne} type='radio' class='answerOne' value= ${configData['questionnaire'][ $quesAnswerOne ]['answer'][0]} />	
												<label class='labelOne'> ${configData['questionnaire'][ $quesAnswerOne ]['answer'][0]} </label>
												<input name=${$nameOne} type='radio' class='answerTwo' value=${configData['questionnaire'][ $quesAnswerOne ]['answer'][1]} />	
												<label class='labelTwo'> ${configData['questionnaire'][ $quesAnswerOne ]['answer'][1]} </label>
												<input name=${$nameOne} type='radio' class='answerThree' value=${configData['questionnaire'][ $quesAnswerOne ]['answer'][2]} />	
												<label class='labelThree'> ${configData['questionnaire'][ $quesAnswerOne ]['answer'][2]} </label>
										  </form>`;
										  
    var secondQuestion = `<p class='title'> ${configData['questionnaire'][ $quesAnswerTwo ]['title']} </p>
											 <form>
											   <input name=${$nameTwo} type='radio' class='answerOne' value=${configData['questionnaire'][$quesAnswerTwo]['answer'][0]} />
												 <label class='labelOne'> ${configData['questionnaire'][$quesAnswerTwo]['answer'][0]} </label>
												 <input name=${$nameTwo} type='radio' class='answerTwo' value=${configData['questionnaire'][$quesAnswerTwo]['answer'][1]} />	
												 <label class='labelTwo'> ${configData['questionnaire'][$quesAnswerTwo]['answer'][1]} </label>
												 <input name=${$nameTwo} type='radio' class='answerThree' value=${configData['questionnaire'][$quesAnswerTwo]['answer'][2]} />	
												 <label class='labelThree'> ${configData['questionnaire'][$quesAnswerTwo]['answer'][2]} </label>
											 </form>`;	
											 
  $(document.body).append(elements);
	$(".questionA").append(firstQuestion);
	$(".questionB").append(secondQuestion);
	if(callback)callback();
}
$("#clickMe").bind("click",function(){
	isSendData();//将答过数据保存，并检测是否存未选择
  	variety(); //校验哪几个问题已经答过
})
	  
	
  function isSendData(){
  		var val=$(`input:radio[name=${$nameOne}]:checked`).val();
  		var val_=$(`input:radio[name=${$nameTwo}]:checked`).val();
  		
    if(val==null || val_ == null){
    	  $("#caveatWrap").removeClass("hide");
    	  $("#caveatBox")[0].innerText = "请选择答案!";
      return false;
    }else{
    		researchData[$quesAnswerOne]['answer'] = val;
    		researchData[$quesAnswerTwo]['answer'] = val_;
    		$(".questionA").fadeOut(1500);
    		$(".questionB").fadeToggle(2000,showQuestion);
    		
    		
    		function showQuestion(){
    			freshData(function(){
    				// 由于重新加载dom结构，事件需要重新绑定
    				$("#clickMe").bind("click",function(){
						isSendData();
					  	variety(); 
					})
    				$("#caveatWrap").bind("click",function(){
  							$("#caveatWrap").addClass("hide");
  					})
    				
    				$("#currentPage")[0].innerText = pagesIndex++;
    				console.log($("#currentPage")[0].innerText);
    				
    				$(".questionA").css({'display':'none'});
    				$(".questionB").css({'display':'none'});
    				$(".questionA").fadeIn(2000);
    				$(".questionB").fadeIn(2000);
    			});
    			
    			var lenJson=0,trueJsonNum = 0;
    			for(var item in researchData){
    				lenJson++;
    			}
    			for(var item in researchData){
					if(researchData[item]['answer'] == null || researchData[item]['answer'] == undefined){
						console.log("缺少数据:")
						console.log(researchData[item])
						continue;
					}else{
						trueJsonNum++;
						console.log('已有'+trueJsonNum+'数据');
						if(lenJson == trueJsonNum){
							$("#currentPage")[0].innerText = 4;
						}
					}
    			}
    		}
    		
    }
  }
  $("#caveatWrap").bind("click",function(){
  		$("#caveatWrap").addClass("hide");
  })
})