// 
//公用方法调用
yx.public.backUpFn();

//返回顶部按钮的显示与隐藏
window.onload = function() {
	var aside = document.querySelector('.aside');
	var asideMenu = document.querySelector(".asideMenu");
	var paper = document.querySelector(".paper");
//	var breadcrumb = document.querySelector(".breadcrumb");
	window.onscroll = function() {
		var t = window.pageYOffset;
		if(t > 320) {
			aside.style.display = 'block';
			asideMenu.className = 'hidden-xs hidden-sm col-md-4 asideMenu asideActive';
			paper.className = "col-xs-12 col-sm-12 col-md-offset-4 col-md-8 paper paperActive"
//			breadcrumb.className = "row breadcrumb breadcrumbActive";
		} else {
			aside.style.display = 'none';
			asideMenu.className = 'hidden-xs hidden-sm col-md-4 asideMenu';
			paper.className = "col-xs-12 col-sm-12 col-md-8 paper"
//			breadcrumb.className = "row breadcrumb";
		}
	};
	
	
}