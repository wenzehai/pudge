/*
 组件API说明
 * 1、依赖move.js，组件前一定要引入move.js
 * 2、轮播图需要个父级，这个父级一定要给一个id
 * 
 */


(function(window,undefined){
	//建立构造函数
	var Carousel = function(){
		this.settings = {
			id:"pic",			//轮播图父级的id，必需传的参数
			autoplay:true,		//自动播放，true为自动，false为不自动，默认为true
			intervalTime:1000,	//间隔时间，运动后停顿的时间，默认1s
			loop:true,			//循环播放，true为循环，false为不循环，默认为true
			totalNum:5,			//图片总量
			moveNum:1,			//单次运动的图片数量（图片总量必需为运动数量的整数倍）
			circle:true,		//小圆点功能，true为显示，false为不显示，默认显示
			moveWay:'opacity'	//运动方式，opacity为透明度过渡，position为位置过渡
		};
	};
	
	Carousel.prototype = {
		constructor: Carousel,
		init: function(opt){
			var opt = opt || this.settings;		//避免用户没有传参时报错
			
			for(var attr in opt) {
				this.settings[attr] = opt[attr];
			}
			//初始化时调用创建按钮和圆点的createDom（）函数
			this.createDom();
		},
		//用来创建圆点和按钮
		createDom: function(){
			var This = this;
			this.box = document.getElementById(this.settings.id);
			//创建上一个按钮
			this.prevBtn = document.createElement("div");
			this.prevBtn.className = "prev";
			this.prevBtn.innerHTML = "<";
			this.prevBtn.onclick = function(){
				This.prev();
				//This.trigger("leftClick");
			};
			this.box.appendChild(this.prevBtn);
			//创建下一个按钮
			this.nextBtn = document.createElement("div");
			this.nextBtn.className = "next";
			this.nextBtn.innerHTML = ">";
			this.nextBtn.onclick = function(){
				This.next();
				//This.trigger("rightClick");
			};
			this.box.appendChild(this.nextBtn);
			
			//创建小圆点
			this.circleWrap = document.createElement("div");
			this.circleWrap.className = "circle";
			this.circles = [];			//存圆点，后面需要修改圆点的class，弄一个数组存起来会方便些
			
			//如果每次走一屏的话，圆点数量就不能是总量了，所以要拿总量除以走的图片的数量
			for(var i=0; i<this.settings.totalNum/this.settings.moveNum; i++){
				var span = document.createElement("span");
				span.index = i;
				span.onclick = function(){
					This.cn = this.index;
					This[This.settings.moveWay + 'Fn']();	//调用函数
				};
				this.circleWrap.appendChild(span);
				this.circles.push(span);
			}
			this.circles[0].className = "active";
			
			if(this.settings.circle) {
				this.box.appendChild(this.circleWrap);
			}
			
			this.moveInit();
		},
		moveInit: function(){		//运动初始化功能
			this.cn = 0;			//当前的索引
			this.ln = 0;			//上一个的索引
			this.canClick = true;		//是否可以再次点击
			this.endNum = this.settings.totalNum/this.settings.moveNum;			//停止条件
			
			this.opacityItem = this.box.children[0].children;					//运动透明度元素
			this.positionItemWrap = this.box.children[0].children[0];			//运动位置的元素的父级
			this.positionItem = this.positionItemWrap.children;					//运动位置的所有元素
			
			switch(this.settings.moveWay){
				case "opacity": 	//如果走的是透明度，需要设置透明度与transition
					for(var i=0; i<this.opacityItem.length; i++){
						this.opacityItem[i].style.opacity = 0;
						this.opacityItem[i].style.transition = "0.3s opacity";
					}
					this.opacityItem[0].style.opacity = 1;
					break;
					
				case "position":	//如果走的是位置，需要设置父级的宽度
					//这里需要注意一下，一定要加上元素的margin
					var leftMargin = parseInt(getComputedStyle(this.positionItem[0]).marginLeft);
					var rightMargin = parseInt(getComputedStyle(this.positionItem[0]).marginRight);
					
					//一个运动元素的实际宽度
					this.singleWidth = leftMargin  + this.positionItem[0].offsetWidth + rightMargin;
					
					//如果运动是循环的，需要赋值一份内容
					if(this.settings.loop) {
						this.positionItemWrap.innerHTML += this.positionItemWrap.innerHTML;
					}
					
					//复制内容后才能设置宽度
					this.positionItemWrap.style.width = this.singleWidth*this.positionItem.length + "px";
					break;
			}
			
			//调用自动播放,用户有传参数才调
			if(this.settings.autoplay){
				this.autoPlayFn();
			}
		},
		opacityFn: function() {			//透明度运动方式，选项卡的道理
			//判断循环与非循环两种状态
			//左边到头
			if(this.cn<0){
				if(this.settings.loop){
					//循环
					this.cn = this.endNum-1;
				} else {
					//不循环
					this.cn = 0;
					this.canClick = true;				//当loop为false，解决点击头一张或者最后一张，不能再次点击，
					//因为canClick是在transitonend里面设置的，如果不循环的话就会停在最后。再次点击的时候，transitionend就不会发生，所以canClick的值就不会改变。
				}
			}
			//右边到头
			if(this.cn > this.endNum-1){
				if(this.settings.loop){
					//循环
					this.cn = 0;
				} else {
					//不循环
					this.cn = this.endNum-1;
					this.canClick = true;				
				}
			}
			
			this.opacityItem[this.ln].style.opacity = 0;
			this.circles[this.ln].className = "";
			
			this.opacityItem[this.cn].style.opacity = 1;
			this.circles[this.cn].className = "active";
			
			var This = this;
			var en = 0;
			this.opacityItem[this.cn].addEventListener("transitionend",function(){
				//console.log(1);
				en++;
				if(en == 1){
					This.canClick = true;
					This.ln = This.cn;
					
					This.endFn();			//调用自定义事件
				}
			})
			
		},
		positionFn: function(){
			//左边到头
			if(this.cn<0){
				if(this.settings.loop){
					//循环
					/*
					 *在这里需要做两件事
					 * 1、先让运动的父级的位置到中间，为了往右走不回出现空白
					 * 2、同时需要修改索引值(到了中间了，并不是停在那里了，而是要运动出前一排，所以cn的值要减个1，为了就是能运动)
					 * 
					 *
					 */
					this.positionItemWrap.style.left = -(this.positionItemWrap.offsetWidth/2) + "px";
					this.cn = this.endNum -1;
				}else {
					//不循环
					this.cn = 0;
				}
			}
			//右边到头
//			if(this.cn > this.endNum-1){
//				if(this.settings.loop){
//					//循环,这里不用做任何事情。需要在运动结束后去做条件判断
//					
//				} else {
//					//不循环
//					this.cn = this.endNum-1;
//				}
//			}
			//这是上面的简写形式
			if(this.cn>this.endNum-1 && !this.settings.loop) {
				this.cn = this.endNum - 1;
			}
			
			
			//修改圆点，只有不循环的时候才去修改圆点
			//不循环
			if(!this.settings.loop){
				this.circles[this.ln].className = "";
				this.circles[this.cn].className = "active";
			}
			
			//运动
			//left的值 = 一个元素的宽度*当前cn的值*一次运动元素的个数
			var This = this;
			move(this.positionItemWrap,{left:-this.cn*this.singleWidth*this.settings.moveNum},300,"linear",function(){
				
				//当走到第二份的第一屏的时候，就需要让运动的父级的left值变成0；
				if(This.cn == This.endNum){
					//这个条件成立,说明现在已经到了第二份的第一屏了
					this.style.left = 0;
					This.cn = 0;
				};
				
				This.endFn();			//调用自定义事件
				
				This.canClick = true;
				This.ln = This.cn;
			})
			
		},
		prev: function() {			//上一个按钮点击功能
			//判断能不能点
			if(!this.canClick){
				return;
			}
			this.canClick = false;
			
			this.cn--;
			//点击一次，执行一次opacity或者position函数
			this[this.settings.moveWay + 'Fn']();			//拼函数名，调用函数要用中括号
		},
		next: function() {			//下一个按钮点击功能
			//判断能不能点
			if(!this.canClick){
				return;
			}
			this.canClick = false;
			
			this.cn++;
			this[this.settings.moveWay + 'Fn']();			//拼函数名，调用函数要用中括号
		},
		autoPlayFn: function(){
			//轮播图自动播放
			var This = this;
			this.timer = setInterval(function(){
				This.next();
			},this.settings.intervalTime)
			
			//鼠标放上去的时候停止
			this.box.onmouseenter = function(){				//选择onmouseenter和onmouseleave是因为没有事件冒泡
				clearInterval(This.timer);
				This.timer = null;
			};
			
			//鼠标离开的时候继续播放
			this.box.onmouseleave = function(){
				This.autoPlayFn();
			}
		},
		//自定义事件，
		//添加自定义事件
		on: function(type,listener){	//type事件类型，listener触发的函数相当于function
			this.events = this.events || {};
			this.events[type] = this.events[type] || [];
			this.events[type].push(listener);
		},
		//主动调用事件，触发器
		trigger:function(type){				//调用自定义事件
			//判断用户有没有自定义事件，有的话触发，没有的话不触发。只有有调用自定义事件的实例，才能执行下边的代码
			if(this.events && this.events[type]){
				for(var i = 0; i<this.events[type].length; i++){
					this.events[type][i].call(this);
				}
			}
		},
		endFn: function(){
			//统一添加自定义事件的函数，要在运动完成以后添加。并且需要加给不循环的运动
			if(!this.settings.loop){
				
				if(this.cn == 0){ 		//左边到头
					this.trigger("leftEnd");
				}
				
				if(this.cn == this.endNum - 1){
					//这个条件满足的时候，说明给右边已经运动到头了
					this.trigger("rightEnd")
				}
				
				
			}
		}
		
	}
	
	window.Carousel = Carousel;
})(window,undefined);




 






