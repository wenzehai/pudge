
//公用方法调用
yx.public.navFn();
//yx.public.lazyImgFn();
//yx.public.backUpFn();


//banner轮播图
var bannerPic = new Carousel();
bannerPic.init({
	id:"bannerPic",	
	autoplay:true,		
	intervalTime:7000,	
	loop:true,			
	totalNum:2,			
	moveNum:1,			
	circle:true,		
	moveWay:"opacity"	
});




//产品选项卡
//自执行函数避免变量污染
(function(){
	var titles = yx.ga("#products .tab li");
	var contents = yx.ga("#products .tabCon");
	var lis = yx.ga("#products .tabCon ul li");
	for(var i=0; i<titles.length; i++) {
		titles[i].index = i;
		titles[i].onclick = function(){
			for(var i=0; i<titles.length; i++){
				titles[i].className = "";
				contents[i].style.display = "none";
				
			}
			titles[this.index].className = "active";
				contents[this.index].style.display= "block";
				lis.clssName = "active";
				
			for(var j =0; j < lis.length; j++) {
					lis[j].className = "wow animated fadeInRight";
					lis[0].setAttribute("style","visibility: visible; animation-duration: 1.5s; animation-delay: 0.1s; animation-name: fadeInRight;");
					lis[1].setAttribute("style","visibility: visible; animation-duration: 1.5s; animation-delay: 0.4s; animation-name: fadeInRight;");
					lis[2].setAttribute("style","visibility: visible; animation-duration: 1.5s; animation-delay: 0.7s; animation-name: fadeInRight;");
					lis[3].setAttribute("style","visibility: visible; animation-duration: 1.5s; animation-delay: 0.1s; animation-name: fadeInRight;");
					lis[4].setAttribute("style","visibility: visible; animation-duration: 1.5s; animation-delay: 0.4s; animation-name: fadeInRight;");
				}
		}
	}
})();






