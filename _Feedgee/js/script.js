$(document).ready(function () {
	$('form[name="lang"]').on('mouseleave', function(){
		$('form[name="lang"]').find('.variants').hide();
	});
	$('form[name="lang"]').find('button').on('mouseenter', function(){
		$('form[name="lang"]').find('.variants').show();
	});
});

/*SLIDER*/


(function(){	
	function Slider(node){
		this.node = node;
		this.Behavior();
		this.position = 0;// init value for margin-left
		this.$ul = $(this.node).find('ul');
		this.$li = $(this.node).find('ul li');
		this.$left = $(this.node).find('.button-left');
		this.$right = $(this.node).find('.button-right');
		this.elems = $(this.node).find('ul li').length; 
		this.width = $(this.node).find('.slider').eq(0).width();
	}

	Slider.prototype.Next = function(){
		this.$left.css("visibility" ,"visible");
		if (this.position===-this.width*(this.elems-2)) this.$right.css("visibility" ,"hidden");
		if (this.position===-this.width*(this.elems-1)) {
			this.position = -this.width*(this.elems-1);
		}
		else
			this.position -= this.width;
		var currentButton = Math.abs(this.position/this.width);
		//hightlight current button
		//move image left
		this.$ul.stop().animate({"margin-left":this.position+'px'},1000);

	};
	Slider.prototype.Prev = function(){
		this.$right.css("visibility" ,"visible");
		if (this.position===-this.width) this.$left.css("visibility" ,"hidden");
		if(this.position===0) {
			this.position = 0;
		}
		else
			 this.position += this.width;
		var currentButton = Math.abs(this.position/this.width);
		//hightlight current button
		//move image left
		this.$ul.stop().animate({"margin-left":this.position+'px'},1000);

	};
	Slider.prototype.Behavior = function(){
		var self = this;//self --Slider
		$(function(){

			$(window).resize(function(){
			  self.width = $(self.node).find('.slider').eq(0).width();
			  self.position = 0;
				self.$ul.stop().css("margin-left","0px");
			});

			self.$left.css("visibility" ,"hidden");
			$('.button-right').on('click', function(){
				self.Next();
			});
			$('.button-left').on('click', function(){
				self.Prev();
			});

			self.$li.on('touchstart', function(e){
				var evTouch = e.originalEvent.touches[0];
                xStart = evTouch.pageX;
                yStart = evTouch.pageY;
			});
			self.$li.on('touchmove', function(e){
				var evTouch = e.originalEvent.touches[0];
                shiftX = evTouch.pageX - xStart;
                shiftY = evTouch.pageY - yStart;
				$(e.target).closest('ul').css("margin-left",self.position+shiftX+'px');
				e.preventDefault();
			});
			self.$li.on('touchend', function(e){
				var evTouch = e.originalEvent.touches[0];	
				if(shiftX<0) {
					self.Next();
				}
				else if(shiftX>0) {
					self.Prev();
				}
				shiftX=0;
			});
		});
	};
	window.Slider = Slider;
})();