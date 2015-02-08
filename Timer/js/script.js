'use strict';

(function() {

	function Timer(node) {
		this.node=node;
		this.timer = this._buildTimer();
		this.timeStr="00:00:00:000";
		this.startStop=false;
		this.start=0;
		this.current=0;
		node.appendChild(this.timer);
		var currentTimer;

		var btnStart = node.querySelector('.btn-primary');
		var btnLap = node.querySelector('.btn-info');
		var btnRes = node.querySelector('.btn-danger');
		var Laps = node.querySelector('.stopwatch-laps');

		btnStart.addEventListener('click', this._onStopStart.bind(this), false);
		btnLap.addEventListener('click', this._onLap.bind(this), false);
		btnRes.addEventListener('click', this._onReset.bind(this), false);
		Laps.addEventListener('click', this._onDelete.bind(this), false);
	}

	Timer.prototype._buildTimer = function() {
		var root = document.createElement('div');
		root.className='row';		
		var rootIn1 = document.createElement('div');
		rootIn1.className='col-xs-4';		
		var rootIn2 = document.createElement('div');
		rootIn2.className='col-xs-4 stopwatch-controls';
		root.appendChild(rootIn1);
		root.appendChild(rootIn2);

		var h2 = document.createElement('h2');
		h2.className='stopwatch-current';
		h2.innerText="00:00:00:000";
		rootIn1.appendChild(h2);
		var rootIn2Div = document.createElement('div');
		rootIn2Div.className='stopwatch-laps';
		rootIn1.appendChild(rootIn2Div);

		var rootIn2Div = document.createElement('div');
		rootIn2Div.className='btn-group btn-group-lg';
		rootIn2.appendChild(rootIn2Div);
		var rootIn2DivButt = document.createElement('button');
		rootIn2DivButt.className='btn btn-primary';
		rootIn2DivButt.innerText="Start";
		rootIn2Div.appendChild(rootIn2DivButt);
		var rootIn2DivButt2 = document.createElement('button');
		rootIn2DivButt2.className='btn btn-info';
		rootIn2DivButt2.innerText="Lap";
		rootIn2Div.appendChild(rootIn2DivButt2);
		var rootIn2Butt = document.createElement('button');
		rootIn2Butt.className='btn btn-danger btn-sm';
		rootIn2.appendChild(rootIn2Butt);
		rootIn2Butt.innerText="Reset";
		return root;
	};

	Timer.prototype._buildLap = function() {
		var lap = document.createElement('div');
		lap.className='alert alert-info';		
		var lapSpan = document.createElement('span');
		lapSpan.className='label label-danger';
		lapSpan.innerText="x";
		lap.appendChild(lapSpan);
		return lap;
	};
	Timer.prototype._onStopStart = function() {
		var _this=this;
		var out = this.node.querySelector('.stopwatch-current');
		console.log(this.start);
		if(this.Stop)
		{	
			this.Stop=false;
			clearTimeout(this.currentTimer);			
		} else {
			this.Stop=true;
			if(this.start===0)
				this.start = (new Date()).getTime();
			else	
				this.start =  (new Date()).getTime()-this.current;

			this.currentTimer = setInterval(function() {
				_this.current = new Date()- _this.start;
				_this.timeStr = _this._getTimeStr(_this.current);
				 out.innerText = _this.timeStr;
			}, 1);		
		}		
	};

	Timer.prototype._onReset = function() {
		clearTimeout(this.currentTimer);
		this.Stop=false;
		this.timeStr="00:00:00:000";
		this.start=0;
		this.current=0;
		var out = this.node.querySelector('.stopwatch-current');
		out.innerText = this.timeStr;
		var laps = this.node.querySelector('.stopwatch-laps');
		var childNodes = this.node.querySelectorAll('.alert-info');
		for(var i=0; i<childNodes.length; i++)
			laps.removeChild(childNodes[i]);
	};

	Timer.prototype._onLap = function() {
		//clearTimeout(this.currentTimer);
		var lap = this._buildLap();
		var _this=this;
		console.log(_this.timeStr);
		lap.appendChild(document.createTextNode(_this.timeStr));
		var monitor = this.node.querySelector(".stopwatch-laps");
		monitor.appendChild(lap);
		//console.dir(timeStr);
	};	

	Timer.prototype._onDelete = function(event) {
		if (event.target.className != 'label label-danger') return;
		event.target.parentNode.style.display = 'none';
	};

	Timer.prototype._getTimeStr = function(timeMs) {
		var hours = (timeMs/3600000).toFixed()< 10 ? "0"+(timeMs/3600000).toFixed() : (timeMs/3600000).toFixed();
		var min = (timeMs%3600000/60000).toFixed()< 10 ? "0"+(timeMs%3600000/60000).toFixed() : (timeMs%3600000/60000).toFixed();
		var sec = (timeMs%60000/1000).toFixed() < 10 ? "0"+(timeMs%60000/1000).toFixed() : (timeMs%60000/1000).toFixed();
		var ms = (timeMs%1000).toFixed()<10 ? "00"+(timeMs%1000).toFixed() :(timeMs%1000).toFixed()<100 ? "0"+(timeMs%1000).toFixed() :(timeMs%1000).toFixed() ;
		var str=hours + ":" + min + ":" + sec + ":" + ms;
		return str;
	};

	window.Timer = Timer;
})();