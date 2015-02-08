function btnClick() { Calc();draw(); }
function btnClickClear() { clear(); }	
function btnClickAdd(){	AddCoord();	}	
function Calc(){
	var summ1=0.0;
	var summ2=0.0;	
	n=count;
////////////взятие значения
	m = parseInt(document.getElementById("M").value);
/////////////////формирование матрицы
//var Y= [-8,7,7,5,5,3.5,3,2.5,2,1.5];//var X= [-2,-1,0,2,3.5,4,5,6,7,7];
//n=9;//var Y= [4.3,3,2,1.5,1,0.8,2.5,2.7,3.5,4.2];//var X= [-1,-0.8,0,0.5,1,1.8,2,2.5,2.6,3.3];
	var c = new Array();
	for (k=0; k<=m; k++) {
		c[k] = new Array();
		for(j=0;j<=m;j++) { 
		summ1=0;
		summ2=0;
			for(i=0;i<=n;i++) {
				var pw=0; var s=0; var s = k+j;
				var pw = Math.pow(X[i],s); 
				summ1 = summ1 + pw; 
				var ppw=0;var pppw=0;
				ppw = Math.pow(X[i],k);
				pppw=Y[i]*ppw;
				summ2 = summ2 + pppw;
				}
			c[k][j] = summ1; 
		}
		c[k][m+1]=summ2;
	}
//for (i=0;i<=m;i++) for(j=0;j<=m+1;j++) alert( " "+i+j+" "+c[i][j]);
/////////решение слау гауссом
	Gauss(m+1,c);//	for (i=0; i<m+1; i++) alert(r[i]);
//	alert(c1+" "+c2+" "+r[0]+" "+r[1]);
}

function AddCoord() {
	count = count+1;
	var ax = parseFloat(document.getElementById("mX").value);
	var ay = parseFloat(document.getElementById("mY").value);
	X[count] = ax;
	Y[count] = ay;
	point();
}

function setka(){
	var drawingCanvas = document.getElementById('Graf');
	if(drawingCanvas && drawingCanvas.getContext) {
		var context = drawingCanvas.getContext('2d');	
		w=Graf.width;
		h=Graf.width;
		w=500;h=500;
		//смещение центра и поворот горизонтали
		context.setTransform(1, 0, 0, -1, w/2,h/2);
		// Сохраняем текущую матрицу трансформации
		context.save();context.clearRect(-500,-500, 1000, 1000);
		// Возобновляем матрицу трансформации
		context.restore();
		//координатные оси

		for (var x = -w/2; x < w; x += w/50) {context.moveTo(x, -h/2);context.lineTo(x, w);}
		for (var y = -h/2; y < h; y += w/50) {context.moveTo(-w/2, y);context.lineTo(h, y);}
		context.strokeStyle = "#eee"; context.stroke();
		//линии
		context.beginPath();
		context.moveTo(0, 0);context.lineTo(w/3, 0);
		context.moveTo(w/3-5, 5);context.lineTo(w/3, 0);context.lineTo(w/3-5, 0-5);
		context.moveTo(0, 0);context.lineTo(0, h/3);
		context.moveTo(5, h/3-5);context.lineTo(0, h/3);context.lineTo(0-5, h/3-5);
		context.strokeStyle = "#000";context.stroke();


	}
}

function point() {
	var drawingCanvas = document.getElementById('Graf');
	if(drawingCanvas && drawingCanvas.getContext) {
		var context = drawingCanvas.getContext('2d');
		for (var i = 0; i <= count; i += 1) {
			context.fillRect(X[i],Y[i], 4, 4); 
		}

		context.strokeStyle = "#000";context.stroke();
  }
}

function draw() {	
	var drawingCanvas = document.getElementById('Graf');
	if(drawingCanvas && drawingCanvas.getContext) {
		var context = drawingCanvas.getContext('2d');	
		w=Graf.width;
		h=Graf.width;
		w=500;h=500;
		setka();
		point();
		for (var i = -250; i < 250; i += 0.05) {
			var yy = fi(m,r,i);
			context.fillRect(i,yy, 1, 1);
		}
	
	}
}
   
function clear(){
	var drawingCanvas = document.getElementById('Graf');
	if(drawingCanvas && drawingCanvas.getContext) {
		var context = drawingCanvas.getContext('2d');	
		w=Graf.width;
		h=Graf.width;
		w=500;h=500;
		setka();
		for (var i = 0; i < count; i += 1) {
			X[i]=0;
			Y[i]=0;
		}
		count=-1;
		m=0;
		mX=0;mY=0;n=0;
		document.getElementById('mX').value=0.0;
		document.getElementById('mY').value=0.0;
		document.getElementById('M').value=0;		
	}
}
	
function getMouseCoords(event) {
	count=count+1;
//	mX = window.event.x - 460;
//	mY = -window.event.y + 330;
	mX=event.clientX - 460;
	mY=-event.clientY + 350;
	document.getElementById('mX').value = mX;
	document.getElementById('mY').value = mY;
	X[count] = mX;
	Y[count] = mY;
	point();
}
	
function Gauss(n,d){
	//Решение СЛАУ методом Гаусса d - расширенная матрица системы, к - вектор результата
	var i;var j;var k;var buf;
	for(i=0;i<n-1;i++) {
			for(j=i+1;j < n;j++) {
				buf=d[i][i]/d[j][i];
				for(k=0;k<=n;k++) d[j][k]=d[j][k]*buf-d[i][k];
			}
	}
	r[n-1]=d[n-1][n]/d[n-1][n-1];
	for (i=n-2;i>=0;i--) {
	buf=0;
	for (j=i+1;j<n;j++) buf+=d[i][j]*r[j];
	r[i]=(d[i][n]-buf)/d[i][i];
	}
}

function fi(m, c, x1){
	//Аппроксимирующая функция по найденным коэффициентам МНК
	//m - степень полинома, c - вектор коэффициентов,
	// x1 - точка, в которой ищем значение, p - значение функции
	var i; var p=0.0;
	for (i=0;i<=m;i++) { p=p+c[i]*Math.pow(x1,i);}
	return p;
}
	window.onload = function(){setka();}
	var count = -1;
	var mX=0.0;
	var mY=0.0;
	var X = new Array(); 
    var Y = new Array();
	var r = new Array();//коефициенты полинома
	var m=0;
	var n=0; 