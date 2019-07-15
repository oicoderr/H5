function clearCache() {
	
}

clearCache.prototype.random = function() {
	return Math.random().toString(36).substr(2);
}

clearCache.prototype.type = function (type,url) {
	if(type == 'css'){
		this.createCss(url);
	}else if(type == 'js'){
		this.createJs(url);
	}else{alert('类型非法')}
}

clearCache.prototype.createCss = function(url) {
	var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url + '?random=' + this.random();
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}

clearCache.prototype.createJs = function(url) {
	let script = document.createElement("script"); 
	script.setAttribute("type", "text/javascript"); 
	script.setAttribute("src", url + '?random=' + this.random());
	document.documentElement.appendChild(script);
}

var clearCache = new clearCache();