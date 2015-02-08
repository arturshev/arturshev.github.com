'use strict';

(function() {

	var ESC_KEYCODE = 27;
	var HAS_SUBMENU_CLASS = 'context-menu-has-submenu';

	function topWalker(node, testFunc, lastParent) {
		while (node && node !== lastParent) { /// пока узел не равен поелсднему указанному узлу
			if (testFunc(node)) { // если функция с узлом правда 
				return node; // возврат узла
			}
			node = node.parentNode; // поднимание вверх по дереву узлов
		}
	}

// создание констурктора
	function ContextMenu(node, menuStructure) {
			this.root = node;
			this.menu = this._buildMenuMarkup(menuStructure);
			this._initSubmenuBehavior();
			document.body.appendChild(this.menu);
			this.root.addEventListener('contextmenu', this._onRootContextMenu.bind(this), false);
			document.documentElement.addEventListener('click', this._onGlobalClick.bind(this), false);
			document.documentElement.addEventListener('keyup', this._onGlobalKeyup.bind(this), false);
			if(!ContextMenu.menus) {
				ContextMenu.menus=[];
			}
			ContextMenu.menus.push(this);
		} 

	ContextMenu.prototype._onGlobalClick = function(event) {
		//добавить проверку на скрытость
		var menu = this.menu;
		// проверяем был ли клик по меню или не по нем. 
		// для event.target -> идем вверх по родителям пока не достигнем меню
		if(!topWalker(event.target, function (node){return menu === node;})) {
			this.hide();
		}
	};

	ContextMenu.prototype._onGlobalKeyup = function(event) {
		//добавить проверку на скрытость
		if(event.keyCode === ESC_KEYCODE)
			this.hide();
	}

	ContextMenu.prototype._buildMenuMarkup = function(structure) {
		var root = document.createElement('ul');
		root.className='context-menu';
		var menuItemNode;
		var menuItemNodeSpan;
		var submenuArrowNode;
		for (var i = 0; i < structure.length; i += 1) {
			menuItemNode = document.createElement('li');
			menuItemNode.innerText = structure[i].title;
			if (structure[i].submenu) {
				submenuArrowNode = document.createElement('span');
				submenuArrowNode.innerText='▶';
				submenuArrowNode.className = 'arrow';
				menuItemNode.className += (' '+HAS_SUBMENU_CLASS);
				menuItemNode.appendChild(this._buildMenuMarkup(structure[i].submenu));
				menuItemNode.appendChild(submenuArrowNode);
			} else {
				menuItemNode.addEventListener('click', structure[i].action, false);
			}
			root.appendChild(menuItemNode);
		}
		return root;
	};

	ContextMenu.prototype._initSubmenuBehavior = function() {
		var submenuHolders = this.menu.querySelectorAll('.'+HAS_SUBMENU_CLASS);
		Array.prototype.forEach.call(submenuHolders, function(submenuHolder) {
			var submenuNode = submenuHolder.querySelector('ul');
			submenuHolder.addEventListener('mouseenter', function() {
				submenuHolder.querySelector('ul').style.display='block';
			});
			submenuHolder.addEventListener('mouseleave', function() {
				submenuHolder.querySelector('ul').style.display='none';
			});
		});
//надо обернуть в функцию как у кантора http://learn.javascript.ru/closures-usage с армией стрелков 
//потому что функция берет при вызове переменную из глоабльно облатси видимости где она равна последнему значению цикла
		// for (var i = 0; i < submenuHolders.length; i+=1) {
		// 	(function(i) {
		// 		submenuHolders[i].addEventListener('mouseenter', function() {
		// 			submenuHolders[i].querySelector('ul').style.display='block';
		// 		});
		// 		submenuHolders[i].addEventListener('mouseleave', function() {
		// 			submenuHolders[i].querySelector('ul').style.display='block';
		// 		});
		// 	}(i));
		// }
	};
	ContextMenu.prototype._onRootContextMenu = function(event) {
		event.preventDefault();//отмена действия по умолчанию
		//координаты проверить кроссбраузерность
		var x=event.pageX;
		var y=event.pageY;
		this.show(x,y);
	};
	ContextMenu.prototype.show = function(left, top) {
		ContextMenu.menus.forEach(function(menInstance) {
			menInstance.hide();
		});//сначала скрываем все менюшки а потом открываем нашу
		this.menu.style.display = 'block';
		this.menu.style.left=left+'px';
		this.menu.style.top=top+'px';
	};

	ContextMenu.prototype.hide = function() {
		this.menu.style.display = 'none';
	};

	window.ContextMenu = ContextMenu; // экспорт на глобальный уровень
}());