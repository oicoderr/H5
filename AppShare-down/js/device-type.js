
function checkBrowser() {
	this.userAgent = navigator.userAgent;
	this.Android = this.userAgent.indexOf('Android') > -1 || this.userAgent.indexOf('Linux') > -1;
	this.IPhone = this.userAgent.indexOf("iPhone") != -1;
	this.Ios = this.userAgent.indexOf('iPhone') > -1 || this.userAgent.indexOf('Mac') > -1;
	this.Ipad = this.userAgent.indexOf('iPad') > -1;
	this.Opera = this.userAgent.indexOf("Opera") > -1;
	this.IE = this.userAgent.indexOf("compatible") > -1 && this.userAgent.indexOf('MSIE') > -1 && !this.Opera;
	this.Edge = this.userAgent.indexOf("Edge") > -1;
	this.FireFox = this.userAgent.indexOf('Firefox') > -1;
	this.Safari = this.userAgent.indexOf('Safari') > -1 && this.userAgent.indexOf('Chrome') == -1;
	this.Chrome = !this.Edge && this.userAgent.indexOf('Chrome') > -1 && this.userAgent.indexOf('Safari') > -1;
	this.IE11 = this.userAgent.indexOf('Trident') > -1 && this.userAgent.indexOf('rv:11.0') > -1;
	this.Wechat=!!this.userAgent.match(/MicroMessenger/i);
	this.Weibo=!!this.userAgent.match(/Weibo/i);
	this.UCBrowser=!!this.userAgent.match(/UCBrowser/i);
	this.QQ=!!this.userAgent.match(/QQ/i);
	this.QQBrowser=!this.userAgent.indexOf('MQQBrowser') > -1 && this.userAgent.indexOf('QQ/');
	this.WinWeChat=!!this.userAgent.match(/WindowsWeChat/i);
};
checkBrowser.prototype.isOS = function(){
	if (!!this.userAgent.match(/compatible/i) || this.userAgent.match(/Windows/i)) {
		console.log("这个是window系统呀")
	} else if (!!this.userAgent.match(/Macintosh/i) || this.userAgent.match(/Macintosh/i)) {
		console.log("这个是MacOs系统呀")
	} else if (!!this.userAgent.match(/iphone/i) || this.userAgent.match(/Ipad/i)) {
		console.log("这个是ios系统呀")
	} else if (!!this.userAgent.match(/android/i)) {
		console.log("这个是安卓系统呀")
	} else {
		console.log("这个是未知系统啊")
	}
};

checkBrowser.prototype.isTerminal = function(){
	if(this.Ios){
		$('.ios').bind('click',function(){
			window.location.href="https://itunes.apple.com/cn/app/id1339537740?mt=8"; 
		})
	}
	if(this.Android){
		$('.android').bind('click',function(){
			window.location.href="https://cdn.happysyrup.com/apks/tangjiang_latest.apk";
		})
	}

}

checkBrowser.prototype.isMobile=function(){ //detection PC and Mobile
	if(!!this.userAgent.match(/AppleWebKit.*Mobile.*/) && !!this.userAgent.match(/AppleWebKit/)){
		document.writeln('Browser:'+'Mobile Browser'+'<hr>');
	}else {
		document.writeln('Browser:'+'Desktop Browser'+'<hr>');
	}
};



'use strict';
var osInput = $('.os');
var oTerminal = $('.terminal'); //document.getElementsByClassName('terminal');
var oEntry = $('.entry');		//document.getElementsByClassName('entry');
var b = new checkBrowser();
b.isOS();
b.isTerminal();