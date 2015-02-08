Array.prototype.shuffle = function(){
	this.sort(function(){
		return Math.random()>0.8;
	});};
var arr=[];
for (var i = 1; i <= 16; i+=1) {
	arr.push(i);
}
console.log(arr);
arr.shuffle();
console.log(arr,arr.length);


$(document).ready(function(){

	$('body *').disableSelection();

	$('.field>div').css("display","none");

	$('#start').click(function(){
		//$("#dialog1").dialog({autoOpen:false,modal:true,height:200,width:330});
		arr.shuffle();//перетасовка
		$('.free').removeClass();//удаление подсвеченного пустого
		for (var i = 1; i <= 16; i+=1) {
			$('#'+i).html(arr[i-1]);
			if(arr[i-1]===16) $('#'+i).addClass("free");
		}
		$('div').css("display","block");

		//проверка на цвет и выиграш
		var count=0;
		for (var i = 1; i <= 16; i+=1) {
			if($('#'+i).attr('id')===$('#'+i).html()){
				if(!$('#'+i).hasClass("free"))
					$('#'+i).addClass(" right");
			}
			else{
				$('#'+i).removeClass("right");
			}
			//проверка на выиграш
			if($('#'+i).hasClass("right")){
				count+=1;
				if (count===15) {
					$("#dialog1").dialog({modal:true,height:200,width:330});
				}
			}
		}
	});

	$('div').click(function(){
		var current=Number($(this).attr('id'));
		var a=$(this).html();
		var b='';
		if($('#'+(current+4)).hasClass("free")){
			//down
			$(this).addClass("free");
			$('#'+(current+4)).removeClass();
			b=$('#'+(current+4)).html();
			$(this).html(b);
			$('#'+(current+4)).html(a);
		}
		if($('#'+(current-4)).hasClass("free")){
			//up
			$(this).addClass("free");
			$('#'+(current-4)).removeClass();			
			b=$('#'+(current-4)).html();
			$(this).html(b);
			$('#'+(current-4)).html(a);
		}		
		if($('#'+(current-1)).hasClass("free")&&current!==9&&current!==5&&current!==1){
			//left
			$(this).addClass("free");
			$('#'+(current-1)).removeClass();			
			b=$('#'+(current-1)).html();
			$(this).html(b);
			$('#'+(current-1)).html(a);
		}
		if($('#'+(current+1)).hasClass("free")&&current!==12&&current!==8&&current!==4){
			//right
			$(this).addClass("free");
			$('#'+(current+1)).removeClass();
			b=$('#'+(current+1)).html();			
			$(this).html(b);
			$('#'+(current+1)).html(a);
		}

	var count=0;
	for (var i = 1; i <= 16; i+=1) {
		if($('#'+i).attr('id')===$('#'+i).html()){
			if(!$('#'+i).hasClass("free"))
				$('#'+i).addClass(" right");
		}
		else{
			$('#'+i).removeClass("right");
		}
		//проверка на выиграш
		if($('#'+i).hasClass("right")){
			count+=1;
			if (count===15) {
				$("#dialog1").dialog({modal:true,height:200,width:330});
			}
		}
	}


	});

});

//плагин для отмены выделения
jQuery.fn.extend({ 
    disableSelection : function() { 
            this.each(function() { 
                    this.onselectstart = function() { return false; }; // IE, Chrome, Safari
                    this.unselectable = "on"; // IE, Opera
                    jQuery(this).css('-moz-user-select', 'none'); // FF
            }); 
    },
    enableSelection : function() { 
            this.each(function() { 
                    this.onselectstart = function() {}; 
                    this.unselectable = "off"; 
                    jQuery(this).css('-moz-user-select', 'auto'); 
            }); 
    } 
});