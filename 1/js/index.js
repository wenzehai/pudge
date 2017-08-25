// 
//公用方法调用
yx.public.backUpFn();

//返回顶部按钮的显示与隐藏
window.onload = function() {
	var aside = document.querySelector('.aside');
	window.onscroll = function() {
		var t = window.pageYOffset;
		if(t > 320) {
			aside.style.display = 'block';
		} else {
			aside.style.display = 'none';
		}
	};
	
	
}