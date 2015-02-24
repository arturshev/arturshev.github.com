(function(){	
	function TagList (node, array) {
		this.node=node;
		this.arrayOfTags=array ? array.slice():[];
		
		this.taglist = this.Init(this.arrayOfTags);
		this.FillArray(this.arrayOfTags);
		this.Behavior();
	}

	TagList.prototype.Init = function(arrayOfTags){
		var $taglist=$('<div class="taglist"></div>');
		var $edit =$('<a href="" id="edit">Hide edit</a>');
		var $tagContainer = $('<div class="tagcontainer"></div>');		
		var $form = $(
			'<form name="addTag">'+
				'<input type="text" name="text" placeholder="Enter Tag name">'+
				'<button class="add" type="submit">Add</button>'+
				'<button class="removeAll" type="submit">Remove All</button>'+
			'</form>');
		$taglist.append($edit).append($tagContainer).append($form);
		$(this.node).append($taglist);
		return $taglist;
	};

	TagList.prototype.FillArray = function (arrayOfTags) {
		for (var i = 0; i < arrayOfTags.length; i++) {
			this.AddTag(arrayOfTags[i]);
		}
	};

	TagList.prototype.AddTag = function(tagTitle){
		var $tag = $('<div class="tag"></div>');
		var $tagName = $('<div class="name">'+tagTitle+'</div>');
		var $tagClose = $('<div class="close">X</div>');
		$tag.append($tagName).append($tagClose);
		$(this.taglist).find(".tagcontainer").append($tag);
	};

	TagList.prototype.Behavior = function(){
		var thisTag = this;
		$(this.taglist).on('click','.close',  function(){
			$(this).parent().remove();
		});
			
		$(this.taglist).on('click', '.add', function(event){
			event.preventDefault();
			var text = $(this).parent().find('input[name="text"]')[0].value.trim();
			if(thisTag.arrayOfTags.indexOf(text)===-1 && text!=="") {
				thisTag.AddTag(text);
				thisTag.arrayOfTags.push(text);
				$(this).parent().find('input[name="text"]')[0].value="";
			}
		});

		$(this.taglist).on('click', '.removeAll', function(event){
			event.preventDefault();
			thisTag.taglist.find('.tag').remove();
			thisTag.arrayOfTags=thisTag.arrayOfTags.splice();
		});

		$(this.taglist).on('click', '#edit',  function(event){
			event.preventDefault();
			$(thisTag.taglist).find("form").toggle("slow");
			$(thisTag.taglist).find(".close").toggle();
			var textEditShow = $(thisTag.taglist).find('#edit').text();
			$(thisTag.taglist).find('#edit').text( textEditShow === "Hide edit" ? "Add tags" : "Hide edit");
			$(thisTag.taglist).find('input[name="text"]')[0].value="";
		});
	};

	window.TagList = TagList;
}());