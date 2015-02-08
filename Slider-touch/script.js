/*
$(document).on("touchstart  mousedown", ".slider-handle", function(event) {
            //если касание, то вычисляем через event.originalEvent.touches[0]:
            if (event.type == "touchstart") {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var offset = (touch.clientX - $(event.target).offset().left);
            }
            else {
            //если нажата кнопка мышки:
                var offset = (event.offsetX || event.clientX - $(event.target).offset().left);
            }
            console.log(offset);
            //отменяем "всплытие сообщений", чтобы не вызывался клик на тач-устройствах.
            event.stopPropagation();
            event.preventDefault();
}
});
*/

/*
// берем все необходимые нам картинки
var $img = $('img');
             
// ждем загрузки картинки браузером
$img.load(function(){
    // удаляем атрибуты width и height
    $(this).removeAttr("width")
           .removeAttr("height")
           .css({ width: "", height: "" });
 
    // получаем заветные цифры
    var width  = $(this).width();
    var height = $(this).height();
});
 
// для тех браузеров, которые подгрузку с кеша не считают загрузкой, пишем следующий код
$img.each(function() {
    var src = $(this).attr('src');
    $(this).attr('src', '');
    $(this).attr('src', src);
});
*/



(function(){	
	function Slider(node, arrayOfImages){
		this.node = node;
    	this.arrayOfImages = arrayOfImages.slice(); // копирование массива изображений чтоб при изменении не повлияло на работус салйдера
		this.Init(this.arrayOfImages); // добавление в ДОМ
		this.Behavior();
		this.position = 0;// init value for margin-left
		this.$images = $(this.node).find('.images ul');
		this.$buttons = $(this.node).find('.buttons ul li');
		var self = this;
		this.$images.find('img').eq(0).on('load', function () {
			self.width = this.width; // correct value
			});
	}

	Slider.prototype.Init = function(arrayOfImages) {
		$(this.node).append("<div class='slider'><div class='buttons'><ul></ul></div><div class='images'><ul></ul></div></div>");
		for (var i = 0; i < arrayOfImages.length; i+=1) {
			$(this.node).find('.buttons > ul').append('<li id="li'+(i+1)+'"><div class="arrow"></div></li>');
			$(this.node).find('.images > ul').append('<li><img src="'+arrayOfImages[i]+'""></li>');
		}
		//set highlight first button
		$(this.node).find('.buttons > ul li').eq(0).addClass('current');
		$(this.node).find('.buttons > ul li').eq(0).find('.arrow').css("display", "block");	

	};
	Slider.prototype.Next = function(){
		(this.position===-this.width*3) ? this.position=0 : this.position -= this.width;
		var currentButton = Math.abs(this.position/this.width);
		//hightlight current button
		this.$buttons.removeClass('current');
		this.$buttons.closest('ul').find('.arrow').css("display", "none");
		this.$buttons.eq(currentButton).addClass('current');
		this.$buttons.eq(currentButton).find('.arrow').css("display", "block");
		//move image left
		this.$images.stop().animate({"margin-left":this.position+'px'},1000);
	};
	Slider.prototype.Prev = function(){
		(this.position===0) ? this.position=-this.width*3 : this.position += this.width;
		var currentButton = Math.abs(this.position/this.width);
		//hightlight current button
		this.$buttons.removeClass('current');
		this.$buttons.closest('ul').find('.arrow').css("display", "none");
		this.$buttons.eq(currentButton).addClass('current');
		this.$buttons.eq(currentButton).find('.arrow').css("display", "block");
		//move image left
		this.$images.stop().animate({"margin-left":this.position+'px'},1000);
	};

	Slider.prototype.AutoScroll = function(){
		var self = this;
		return {
			startCarousel: function(){	
				//this -- Object{startCarousel,stopCarousel,waitCarousel}
				self.timer = setInterval(function(){
					self.Next();
				}, 1500);
			}, 
			stopCarousel: function(){
				clearInterval(self.timer);
				clearTimeout(self.timeout);
			},
			waitCarousel: function(){
				var returnedOb = this;
				self.timeout = setTimeout(function() {
					//this -- window
					returnedOb.startCarousel();
				} , 1000);
			}
		};
	};
	Slider.prototype.Behavior = function(){
		var xStart,
			yStart,
			shiftX,
			shiftY;
		var self = this;//self - -Slider
		$(function(){
			//this -- htmlDocument
			//start carousel
			self.AutoScroll().startCarousel();

			$('.buttons').on('click', 'li', function(){
				//this -- elem which was clicked
				var item = parseInt($(this).attr('id').slice(2));
				self.$images.stop().animate({"margin-left":-(item-1)*633+'px'},1000);
				self.position = -(item-1)*633;
				//highlight seleccted button
				$(this).closest('ul').find('li').removeClass('current');
				$(this).closest('ul').find('.arrow').css("display", "none");
				$(this).addClass('current');
				$(this).find('.arrow').css("display", "block");
				//stop wait carousel
				self.AutoScroll().stopCarousel();
				self.AutoScroll().waitCarousel();
			});

			self.$images.on('touchstart', function(e){
				var evTouch = e.originalEvent.touches[0];
                xStart = evTouch.pageX;
                yStart = evTouch.pageY;
			});
			self.$images.on('touchmove', function(e){
				var evTouch = e.originalEvent.touches[0];
				self.AutoScroll().stopCarousel();
                shiftX = evTouch.pageX - xStart;
                shiftY = evTouch.pageY - yStart;
				$(e.target).closest('ul').css("margin-left",self.position+shiftX+'px');
				e.preventDefault();
			});
			self.$images.on('touchend', function(e){
				var evTouch = e.originalEvent.touches[0];
				self.AutoScroll().stopCarousel();		
				if(shiftX<0) {
					self.Next();
				}
				else if(shiftX>0) {
					self.Prev();
				}
				shiftX=0;
				self.AutoScroll().waitCarousel();
			});

		});
	};
	window.Slider = Slider;
})();