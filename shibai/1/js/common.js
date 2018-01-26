window.yx = {
	g:function(name){
		return document.querySelector(name);
	},
	ga:function(name){
		return document.querySelectorAll(name);
	}	,
	//工具类函数
	addEvent: function(obj,ev,fn){
		if(obj.addEventListener){
			obj.addEventListener(ev,fn);
		} else {
			obj.attachEvent('on' + ev, fn);
		}
	},
	removeEvent: function(obj,ev,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(ev,fn);
		} else {
			obj.dettachEvent('on' + ev, fn);
		}
	},
	getTopValue: function(obj){	//获取元素离html顶部的距离
		var top = 0;
		while(obj.offsetParent){
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return top;
	},
	public:{
		//回到顶部功能
		backUpFn: function(){
			var backTop = yx.g(".backtop");
			var timer;
			backTop.onclick = function(){
				var top = window.pageYOffset;
				
				timer = setInterval(function(){
					top -= 120;
					if(top <= 0) {
						top = 0;
						clearInterval(timer);
					}
					
					window.scrollTo(0,top);
				},16);
			}
		}
	}
	
}









































