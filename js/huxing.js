var canvas, context, ctx, ctx2, ctx3, ctx4; //画布
var imagesbase = new Array(); //预加载图片
var imgbool = 0; //判断预加载完成
var border_len = 0;
var border_len1 = 0;
var border_len2 = 0;
var border_len_text = 0;
var border_len_text1 = 0;
var border_len_text2 = 0;
var x_select1 = 0,x_select2 = 0,y_select1 = 0,y_select2 = 0;
var minX = 0,minY = 0;
var maxWidth = 0,maxHeight = 0;
var select_most = 0;
var qiang_draw = 0;
var selectArray = new Array();
var selectPoin;
var istext = false,istext1 = false; //判断是否修改文字
var qiang_width = 4;
var kuanjia = 0;
var cengKey, cengKeyText, cengKeyQ; //被选中图片和文字各自的层数
var wangge = 0; //判断是否需要网格
var firstTest = 0; //判断插入文字时有没有墙壁
var firstImg = 0; //判断插入图片时有没有墙壁
var fontset = false; //判断是否插入文字
var firstQ = 0;
var x1 = 0,x2 = 0,y1 = 0,y2 = 0;
var y = '{"qiangarray":[]}&&{"imgarray":[]}&&{"textarray":[]}';
var varSImg = false,open_magnet = false;
var imgObject = new createImage();
var wallObject = new createWall();
var wordObject = new createWord();
(function int() {
	var sources = {
		shuiyin: "style/images/shuiyin.png",
		wangge: "style/images/ge.png"
	};
	loadImages(sources); //预加载
	keybord(); //键盘事件
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	ctx = canvas.getContext('2d');
	ctx2 = canvas.getContext('2d');
	ctx3 = canvas.getContext('2d');
	ctx4 = canvas.getContext('2d');
	abc(); //绑定鼠标事件
	setTimeout(function() {
		hasyuju();
		drawImage2(wangge, 1);
	}, 500);
})();

//切换——是否自动贴墙
function ChangeMagnet(){
	open_magnet = !open_magnet;
}

function changeCanvase(txt) {
	y = txt;
	hasyuju();
	drawImage2(wangge, 1);
}

function hasyuju() {
	var date1 = new Date();
	try {
		var obj1 = eval("(" + y.split('&&')[0] + ")");
		var obj2 = eval("(" + y.split('&&')[1] + ")");
		var obj3 = eval("(" + y.split('&&')[2] + ")");
		cleanCanvas();
		for (var i = 0; i < obj1.qiangarray.length; i++) {
			wallObject.QX1.push(obj1.qiangarray[i].QX1);
			wallObject.QX2.push(obj1.qiangarray[i].QX2);
			wallObject.QY1.push(obj1.qiangarray[i].QY1);
			wallObject.QY2.push(obj1.qiangarray[i].QY2);
			wallObject.QBorder.push(obj1.qiangarray[i].QBorder);
			wallObject.QW.push(obj1.qiangarray[i].QW);
			wallObject.QColor.push(obj1.qiangarray[i].QColor);
		};
		for (var i = 0; i < obj2.imgarray.length; i++) {
			addimg(0,obj2.imgarray[i].imgSrc, 0, 0, 0, obj2.imgarray[i].imgScaleX, obj2.imgarray[i].imgScaleY, obj2.imgarray[i].imgX, obj2.imgarray[i].imgY, obj2.imgarray[i].imgR);
		}
		for (var i = 0; i < obj3.textarray.length; i++) {
			wordObject.textX.push(obj3.textarray[i].textX);
			wordObject.textY.push(obj3.textarray[i].textY);
			wordObject.textBorder.push(obj3.textarray[i].textBorder);
			wordObject.textSize.push(obj3.textarray[i].textSize);
			wordObject.textColor.push(obj3.textarray[i].textColor);
			wordObject.textArray.push(obj3.textarray[i].textArray);
		}
		var date2 = new Date();
		var date3 = date2.getTime() - date1.getTime();
		console.info(date3);
	} catch (e) {
		alert("保存码有误！");
	}
}
//绑定鼠标方法
function abc() {
	canvas.addEventListener('mousemove', function(e) {
		border_len1 = 0;
		border_len_text1 = 0;
		reDraw1(0, e);
	}, false);
	canvas.addEventListener('mousedown', function(e) {
		if (kuanjia) {
			x1 = 0, x2 = 0, y1 = 0, y2 = 0;
			var pos = windowToCanvas(canvas, e.clientX, e.clientY);
			x1 = pos.x;
			y1 = pos.y;
			if (wordObject.textArray.length == 0 && imgObject.imgUrl.length == 0 && wallObject.QBorder.length == 0) {
				firstQ = 1
				wallObject.addWall(0, 0, 0, 0,0);
			}
			canvas.onmousemove = function(event) {
				drawImage2(wangge, 1);
				ctx2.beginPath();
				var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
				x2 = pos1.x;
				y2 = pos1.y;
				ctx2.strokeStyle = "#000000";
				ctx2.lineWidth = 2;
				ctx2.setLineDash([10]);
				ctx2.beginPath();
				ctx2.strokeRect(x1, y1, x2 - x1, y2 - y1);
			}
		} else if (istext) {
			addfont();
			istext = false;
			if (firstTest) {
				wallObject.removeWall(0);
			}
			if (firstImg) {
				wallObject.removeWall(0);
			}
		} else if (!fontset && istext1) {
			changefont(cengKeyText);
		} else {
			if (qiang_draw) {
				var pos = windowToCanvas(canvas, e.clientX, e.clientY);
				wallObject.addWall(pos.x, pos.y, pos.x, pos.y,qiang_width);
				cengKeyQ = wallObject.QBorder.length - 1;
				imgObject.clearBorder(imgObject.imgUrl.length);
				wordObject.clearBorder(wordObject.textArray.length);
				wallObject.clearBorder(cengKeyQ);
				drawImage2(wangge, 1);
				canvas.onmousemove = function(e) {
					var pos1 = windowToCanvas(canvas, e.clientX, e.clientY);
					wallObject.QX2[wallObject.QX2.length - 1] = pos1.x;
					wallObject.QY2[wallObject.QY2.length - 1] = pos1.y;
					drawImage2(wangge, 1);
				}
			} else {
				border_len = 0;
				border_len_text = 0;
				border_len_text2 = 0;
				for (var j = 0; j < wallObject.QBorder.length + imgObject.imgUrl.length + wordObject.textArray.length; j++) {
					reDraw(j, e);
				}
			}
		}
	}, false);
	canvas.addEventListener('mouseup', function(e) {
		canvas.onmousemove = null;
		canvas.onmouseup = null;
		if (kuanjia) {
			if (x2 != 0 && y2 != 0) {
				ctx2.setLineDash([0]);
				wallObject.addWall(x1, y1, x1, y2,qiang_width);
				if (x1 < x2) {
					wallObject.addWall(x1 - qiang_width / 2, y2, x2 + qiang_width / 2, y2,qiang_width);
					wallObject.addWall(x1 - qiang_width / 2, y1, x2 + qiang_width / 2, y1,qiang_width);
				} else {
					wallObject.addWall(x1 + qiang_width / 2, y2, x2 - qiang_width / 2, y2,qiang_width);
					wallObject.addWall(x1 + qiang_width / 2, y1, x2 - qiang_width / 2, y1,qiang_width);
				}
				wallObject.addWall(x2, y1, x2, y2,qiang_width);
				cengKeyQ = wallObject.QBorder.length;
				cengKey = imgObject.imgUrl.length;
				cengKeyText = wordObject.textArray.length;
				imgObject.clearBorder(imgObject.imgUrl.length);
				wordObject.clearBorder(wordObject.textArray.length);
				wallObject.clearBorder(cengKeyQ);
				drawImage2(wangge, 1);
				if (firstQ) {
					wallObject.removeWall(0);
					firstQ = 0;
				}
			}
		}
		if ((x_select2 - x_select1) > 0 && (y_select2 - y_select1) > 0) {
			selectImg(x_select1, x_select2, y_select1, y_select2);
			x_select1 = 0;
			x_select2 = 0;
			y_select1 = 0;
			y_select2 = 0;
		}
		if (qiang_draw) {
			cengKey = imgObject.imgUrl.length;
			cengKeyText = wordObject.textArray.length;
			cengKeyQ = wallObject.QBorder.length;
		} else if (selectArray.length == 0) {
			drawImage2(wangge, 1);
		}
		//判断自动贴墙
		if(varSImg&&open_magnet){
			var SImg = varSImg-1;
			var wall = imgObject.magnet[SImg]-1;
			var calculationX = imgObject.imgX[SImg]+imgObject.imgScaleX[SImg]*imgObject.imgUrl[SImg].width;
			var calculationY = imgObject.imgY[SImg]+imgObject.imgScaleY[SImg]*imgObject.imgUrl[SImg].height;
			var angle = getAngle(wallObject.QX1[wall],wallObject.QY1[wall],wallObject.QX2[wall],wallObject.QY2[wall]);
			var angle2 = imgObject.imgR[SImg]+angle;
			if(imgObject.imgX[SImg]<(wallObject.QX1[wall]+wallObject.QW[wall]+imgObject.imgScaleX[SImg]*imgObject.imgUrl[SImg].width/2)&&
			imgObject.imgX[SImg]>(wallObject.QX1[wall]-wallObject.QW[wall]-imgObject.imgScaleX[SImg]*imgObject.imgUrl[SImg].width/2)){
				console.info(imgObject.imgX[SImg],wallObject.QX1[wall],wallObject.QW[wall]/2);
				imgObject.imgX[SImg] = wallObject.QX1[wall]-wallObject.QW[wall]/2;
				console.info(imgObject.imgX[SImg],wallObject.QX1[wall],wallObject.QW[wall]/2);
				if(Math.abs(angle2%90)!=0){
					if(angle2%90<45){
						imgObject.imgR[SImg] = angle2-angle2%90-angle;
					}else{
						imgObject.imgR[SImg] = angle2-angle2%90;
					}
				}
			}else if(calculationX<(wallObject.QX1[wall]+wallObject.QW[wall]+imgObject.imgScaleX[SImg]*imgObject.imgUrl[SImg].width/2)&&
			calculationX>(wallObject.QX1[wall]-wallObject.QW[wall]-imgObject.imgScaleX[SImg]*imgObject.imgUrl[SImg].width/2)){
				console.info(imgObject.imgX[SImg],wallObject.QX1[wall],wallObject.QW[wall]/2);
				imgObject.imgX[SImg] = wallObject.QX1[wall]-imgObject.imgScaleX[SImg]*imgObject.imgUrl[SImg].width+wallObject.QW[wall]/2;
				
				console.info(imgObject.imgX[SImg],wallObject.QX1[wall],wallObject.QW[wall]/2);
				if(Math.abs(angle2%90)!=0){
					if(angle2%90<45){
						imgObject.imgR[SImg] = angle2-angle2%90-angle;
					}else{
						imgObject.imgR[SImg] = angle2-angle2%90;
					}
				}
			}else if(imgObject.imgY[SImg]<(wallObject.QY1[wall]+wallObject.QW[wall]+imgObject.imgScaleY[SImg]*imgObject.imgUrl[SImg].height/2)&&
			imgObject.imgY[SImg]>(wallObject.QY1[wall]-wallObject.QW[wall]-imgObject.imgScaleY[SImg]*imgObject.imgUrl[SImg].height/2)){
				imgObject.imgY[SImg] = wallObject.QY1[wall]-wallObject.QW[wall]/2;
				if(Math.abs(angle2%90)!=0){
					if(angle2%90<45){
						imgObject.imgR[SImg] = angle2-angle2%90;
					}else{
						imgObject.imgR[SImg] = angle2-angle2%90+90-angle;
					}
				}
			}else if(calculationY<(wallObject.QY1[wall]+wallObject.QW[wall]+imgObject.imgScaleY[SImg]*imgObject.imgUrl[SImg].height/2)&&
			calculationY>(wallObject.QY1[wall]-wallObject.QW[wall]-imgObject.imgScaleY[SImg]*imgObject.imgUrl[SImg].height/2)){
				imgObject.imgY[SImg] = wallObject.QY1[wall]-imgObject.imgScaleY[SImg]*imgObject.imgUrl[SImg].height+wallObject.QW[wall]/2;
				if(Math.abs(angle2%90)!=0){
					if(angle2%90<45){
						imgObject.imgR[SImg] = angle2-angle2%90;
					}else{
						imgObject.imgR[SImg] = angle2-angle2%90+90-angle;
					}
				}
			}else{
				
			}
			drawImage2(wangge, 1,angle2);
		}
		canvas.style.cursor = "auto";
	}, false);
}


function getAngle(px1, py1, px2, py2) {
        //两点的x、y值
        x = px2-px1;
        y = py2-py1;
        hypotenuse = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
        //斜边长度
        cos = x/hypotenuse;
        radian = Math.acos(cos);
        //求出弧度
        angle = 180/(Math.PI/radian);
        //用弧度算出角度        
        if (y<0) {
                angle = -angle;
        } else if ((y == 0) && (x<0)) {
                angle = 180;
        }
        return angle;
}


//画框架（四面墙）
function kuangjia() {
	qiang_draw = 0;
	if (kuanjia) {
		kuanjia = 0;
	} else {
		kuanjia = 1;
	}
	wallObject.clearBorder(wallObject.QBorder.length);
	cengKey = wallObject.QBorder.length;
	drawImage2(wangge, 1);
}
//多选（包括图片与墙壁）
function selectImg(x1, x2, y1, y2) {
	minX = x2;
	minY = y2;
	maxWidth = 0;
	maxHeight = 0;
	for (var i = 0; i < imgObject.imgUrl.length; i++) {
		var outer = imgObject.getOuter(i);
		if (outer.x1 > x1 && outer.x2 < x2) {
			if (outer.y1 > y1 && outer.y2 < y2) {
				imgObject.imgBorder[i] = 1;
				selectArray.push(i);
				if (outer.x2 > maxWidth) {
					maxWidth = outer.x2 + 16;
				}
				if (outer.y2 > maxHeight) {
					maxHeight = outer.y2 + 16;
				}
				if (outer.x1 < minX) {
					minX = outer.x1 - 16;
				}
				if (outer.y1 < minY) {
					minY = outer.y1 - 16;
				}
			}
		}
	}
	selectPoin = selectArray.length;
	for (var i = 0; i < wallObject.QBorder.length; i++) {
		var qx1 = wallObject.QX1[i];
		var qy1 = wallObject.QY1[i];
		var qx2 = wallObject.QX2[i];
		var qy2 = wallObject.QY2[i];
		if (qx2 < qx1) {
			var select = qx1;
			qx1 = qx2;
			qx2 = select;
		}
		if (qy2 < qy1) {
			var select = qy1;
			qy1 = qy2;
			qy2 = select;
		}
		if (qx1 > x1 && qx2 < x2) {
			if (qy1 > y1 && qy2 < y2) {
				wallObject.QBorder[i] = 1;
				selectArray.push(i);
				if (qx1 < minX) {
					minX = qx1 - 8;
				}
				if (qy1 < minY) {
					minY = qy1 - 8;
				}
				if ((qx2) > maxWidth) {
					maxWidth = qx2 + 8
				}
				if ((qy2) > maxHeight) {
					maxHeight = qy2 + 8
				}
			}
		}
	}
	drawImage2(wangge, 1);
	maxWidth -= minX;
	maxHeight -= minY;
	if (selectArray.length > 0) {
		ctx2.strokeStyle = "#000000";
		ctx2.strokeRect(minX, minY, maxWidth, maxHeight);
		select_most = 1;
	}
}
//切换画墙模式
function qiang() {
	kuanjia = 0;
	if (qiang_draw) {
		qiang_draw = 0;
	} else {
		qiang_draw = 1;
	}
	wallObject.clearBorder(wallObject.QBorder.length);
	cengKey = wallObject.QBorder.length;
	drawImage2(wangge, 1);
}
//改变墙的宽度
function Q_W(w) {
	qiang_width = w;
}
//对齐
function left(f) {
	if (select_most && selectArray.length > 0) {
		for (var i = 0; i < selectPoin; i++) {
			var j = selectArray[i];
			if (f == 1) {
				imgObject.imgX[j] = minX + 8;
			} else if (f == 2) {
				imgObject.imgX[j] = minX + maxWidth - imgObject.imgUrl[j].width * imgObject.imgScaleX[j] - 8;
			} else if (f == 3) {
				imgObject.imgY[j] = minY + 8;
			} else if (f == 4) {
				imgObject.imgY[j] = minY + maxHeight - imgObject.imgUrl[j].height * imgObject.imgScaleY[j] - 8;
			} else if (f == 5) {
				imgObject.imgX[j] = minX + maxWidth / 2 - imgObject.imgUrl[j].width * imgObject.imgScaleX[j] / 2 - 8;
			} else if (f == 6) {
				imgObject.imgY[j] = minY + maxHeight / 2 - imgObject.imgUrl[j].height * imgObject.imgScaleY[j] / 2 - 8;
			}
		}
		drawImage2(wangge, 1);
		ctx3.strokeRect(minX, minY, maxWidth, maxHeight);
	}
}
//切换至文字模式
function Fontset() {
	fontset = true;
	istext1 = false;
	$("#text1").hide();
	firstTest = 0;
	if (wallObject.QBorder.length == 0) {
		wallObject.addWall(0, 0, 0, 0,0);
		firstTest = 1;
	}
	imgObject.clearBorder(imgObject.imgUrl.length);
	wordObject.clearBorder(wordObject.textArray.length);
	drawImage2(wangge, 1);
	cengKey = imgObject.imgUrl.length;
	cengKeyText = wordObject.textArray.length;
	var top = canvas.offsetTop + canvas.height / 2;
	var left = canvas.offsetLeft + canvas.width / 2;
	$("#text").css("top", top);
	$("#text").css("left", left);
	var color = $("#color").get(0).value;
	$("#text").css("color", color);
	$("#text").show();
	canvas.style.cursor = "text";
	istext = true;
	fontset = false;
	if (!istext1) {
		istext = true;
	}
	keybord();
}
//键盘事件
function keybord(j) {
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e && e.keyCode == 13) { //按Enter
			if (!istext1) {
				addfont();
				istext = false;
				if (firstTest) {
					wallObject.removeWall(0);
				}
				if (firstImg) {
					wallObject.removeWall(0);
				}
			} else if (!fontset && istext1) {
				changefont(j);
			}
		}
	}
}
//增加文字
function addfont() {
	var text = $("#text").get(0).value;
	$("#text").hide();
	imgObject.clearBorder(imgObject.imgUrl.length);
	wallObject.clearBorder(wallObject.QBorder.length);
	wallObject.clearBorder(wallObject.QBorder.length);
	if (text != "") {
		$("#text").get(0).value = "";
		var tt = $("#text").css("top");
		tt = tt.substring(0, tt.lastIndexOf('px'));
		var tl = $("#text").css("left");
		tl = tl.substring(0, tl.lastIndexOf('px'));
		var ct = canvas.offsetTop;
		var cl = canvas.offsetLeft;
		wordObject.textArray.push(text);
		wordObject.textX.push(tl - cl);
		wordObject.textY.push(tt - ct);
		wordObject.textBorder.push(0);
		wordObject.textSize.push(16);
		var color = $("#color").get(0).value
		wordObject.textColor.push(color);
		cengKeyText = wordObject.textArray.length - 1;
		wordObject.clearBorder(cengKeyText);
		cengKey = imgObject.imgUrl.length;
		drawImage2(wangge, 1);
	}
	istext1 = false;
	canvas.style.cursor = "auto";
	select_most = 0;
	selectArray = new Array();
}
//修改文字
function changefont(j) {
	wordObject.textArray[j] = $("#text1").get(0).value;
	wordObject.textColor[j] = $("#color").get(0).value;
	istext1 = false;
	$("#text1").hide();
	wordObject.clearBorder(j);
	drawImage2(wangge, 1);
	$("#text1").get(0).value = "";
	cengKeyText = j;
	cengKey = imgObject.imgUrl.length;
	cengKeyQ = wallObject.QBorder.length;
}

function up() {
	if (cengKey < imgObject.imgUrl.length) {
		upimgforone(cengKey, 0);
		imgObject.clearBorder(cengKey);
	} else if (cengKeyText < wordObject.textArray.length) {
		upimgforone(cengKeyText, 1);
		imgObject.clearBorder(cengKeyText);
	}
	drawImage2(wangge, 1);
}

function upMax() {
	if (cengKey < imgObject.imgUrl.length) {
		upimg(cengKey, 0);
		imgObject.clearBorder(cengKey);
	} else if (cengKeyText < wordObject.textArray.length) {
		upimg(cengKeyText, 1);
		wordObject.clearBorder(cengKeyText);
	}
	drawImage2(wangge, 1);
}

function down() {
	if (cengKey < imgObject.imgUrl.length) {
		downimgforone(cengKey, 0);
		imgObject.clearBorder(cengKey);
	} else if (cengKeyText < wordObject.textArray.length) {
		downimgforone(cengKeyText, 1);
		wordObject.clearBorder(cengKeyText);
	}
	drawImage2(wangge, 1);
}

function downMax() {
	if (cengKey < imgObject.imgUrl.length) {
		downimg(cengKey, 0);
		imgObject.clearBorder(0);
	} else if (cengKeyText < wordObject.textArray.length) {
		downimg(cengKeyText, 1);
		wordObject.clearBorder(0);
	}
	drawImage2(wangge, 1);
}
//旋转图片
var clockwise = function(r){imgObject.clockwise(r)};
//图片预加载
function loadImages(sources) {
	var count = 0,
		images = {},
		imgNum = 0;
	for (src in sources) {
		imgNum++;
	}
	for (src in sources) {
		images[src] = new Image();
		images[src].crossOrigin = "*";
		images[src].onload = function() {
			if (++count >= imgNum) {
				imgbool = count;
			}
		}
		images[src].src = sources[src];
		imagesbase.push(images[src]);
	}
}
//新增图片
function addimg(bottom,imgsrc, width, height, event, S_caleX, S_caleY, oX, oY, oR) {
	wordObject.clearBorder(wordObject.textArray.length);
	wallObject.clearBorder(wallObject.QBorder.length);
	if (imgbool == imagesbase.length) {
		imgObject.addImg(bottom,imgsrc, width, height, event, S_caleX, S_caleY, oX, oY, oR);
		if (wallObject.QBorder.length == 0) {
			wallObject.addWall(0, 0, 0, 0,0);
			firstImg = 1;
		}
		select_most = 0;
		selectArray = new Array();
	}
}

//删除选中
function remove1() {
	if (select_most && selectArray.length > 0) {
		for (var i = selectPoin - 1; i >= 0; i--) {
			imgObject.removeImg(selectArray[i]);
		}
		for (var i = selectArray.length - 1; i >= selectPoin; i--) {
			wallObject.removeWall(selectArray[i]);
		}
		selectArray = new Array();
		drawImage2(wangge, 1);
		cengKeyText = wordObject.textArray.length;
	} else {
		if (cengKeyQ < wallObject.QBorder.length) {
			wallObject.removeWall(cengKeyQ);
			drawImage2(wangge, 1);
			return;
		} else if (cengKey < imgObject.imgUrl.length) {
			imgObject.removeImg(cengKey);
			drawImage2(wangge, 1);
			return
		} else if (cengKeyText < wordObject.textArray.length) {
			wordObject.removeWord(cengKeyText);
			drawImage2(wangge, 1);
			return;
		}
	}
}
//改变文字颜色
function changecolor(color) {
	for (var i = 0; i < wordObject.textBorder.length; i++) {
		if (wordObject.textBorder[i] == 1) {
			wordObject.textColor[i] = color;
		}
	}
	drawImage2(wangge, 1);
}
//改变墙壁颜色
function changecolorQ(color) {
	wallObject.QColor[cengKeyQ] = color;
	drawImage2(wangge, 1);
}
//清屏
function cleanCanvas() {
	imgObject.clean();
	wallObject.clean();
	wordObject.clean();

	drawImage2(wangge, 1);
}
//图片置顶
function upimg(i, font) {
	if (!font) {
		imgObject.up(i);
	} else {
		wordObject.up(i);
	}
}
//图片置顶一层
function upimgforone(i, font) {
	if (!font) {
		imgObject.upforone(i);
	} else {
		wordObject.upforone(i);
	}
}
//图片置底
function downimg(i, font) {
	if (!font) {
		imgObject.down(i);
	} else {
		wordObject.down(i);
	}
}
//图片置底一层
function downimgforone(i, font) {
	if (!font) {
		imgObject.downforone(i);
	} else {
		wordObject.downforone(i);
	}
}

//添加水印
function addshuiyin() {
	ctx.beginPath();
	var m = canvas.width / (imagesbase[0].width * 0.5);
	var n = canvas.height / (imagesbase[0].width * 0.5);
	for (var i = 0; i < m + 1; i++) {
		for (var j = -1; j < (n + 1) * 2; j++) {
			ctx.beginPath();
			ctx.translate(imagesbase[0].width * 0.5 * i + imagesbase[0].width * 0.25, imagesbase[0].height * 0.5 * j + imagesbase[0].height * 0.25);
			ctx.rotate(Math.PI / 180 * 30);
			ctx.translate(-imagesbase[0].width * 0.5 * i - imagesbase[0].width * 0.25, -imagesbase[0].height * 0.5 * j - imagesbase[0].height * 0.25);
			ctx.drawImage(imagesbase[0], imagesbase[0].width * 0.7 * i, imagesbase[0].height * j, imagesbase[0].width * 0.5, imagesbase[0].height * 0.5);
			ctx.translate(imagesbase[0].width * 0.5 * i + imagesbase[0].width * 0.25, imagesbase[0].height * 0.5 * j + imagesbase[0].height * 0.25);
			ctx.rotate(Math.PI / 180 * -30);
			ctx.translate(-imagesbase[0].width * 0.5 * i - imagesbase[0].width * 0.25, -imagesbase[0].height * 0.5 * j - imagesbase[0].height * 0.25);
			ctx.stroke();
		}
	}
}
//网格
function addge() {
	ctx.beginPath();
	ctx.drawImage(imagesbase[1], 0, 0);
}
//绘制图像
function drawImage2(ge, shuiyin) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	wangge = ge;
	if (wangge) { //是否需网格
		addge();
	}
	for (var i = 0; i < wallObject.QW.length; i++) {
		wallObject.drawWall(ctx4,i);
	}
	for (var i = 0; i < imgObject.imgUrl.length; i++) {
		imgObject.drawImg(ctx, i);
	}
	for (var i = 0; i < wordObject.textArray.length; i++) {
		wordObject.drawWord(ctx,i);
	}
	if (shuiyin) {
		ctx.drawImage(imagesbase[0], canvas.width - imagesbase[0].width * 0.5 - 10, canvas.height - imagesbase[0].height * 0.5 - 10, imagesbase[0].width * 0.5, imagesbase[0].height * 0.5);
	}
}

//绑定事件
function reDraw(j, event) {
	var ctx = canvas.getContext("2d");
	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	if (select_most && selectArray.length > 0) {
		var ctx3 = canvas.getContext("2d");
		ctx3.strokeStyle = "#000000";
		ctx3.rect(minX, minY, maxWidth, maxHeight);
		if (pos && ctx.isPointInPath(pos.x, pos.y)) {
			canvas.onmousemove = function(event) {
				canvas.style.cursor = "move";
				var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
				var x = pos1.x - pos.x;
				var y = pos1.y - pos.y;
				pos = pos1;
				for (var i = 0; i < selectArray.length; i++) {
					var q = selectArray[i];
					if (i >= selectPoin) {
						wallObject.QX1[q] += x;
						wallObject.QY1[q] += y;
						wallObject.QX2[q] += x;
						wallObject.QY2[q] += y;
					} else {
						imgObject.imgX[q] += x;
						imgObject.imgY[q] += y;
					}
				}
				minX += x;
				minY += y;
				drawImage2(wangge, 1);
				ctx3.strokeRect(minX, minY, maxWidth, maxHeight);
			}
		} else {
			selectArray = new Array();
			select_most = 0;
			minX = 0;
			minY = 0;
			maxWidth = 0;
			maxHeight = 0;
			imgObject.clearBorder(imgObject.imgUrl.length);
		}
	} else {
		if (j < wallObject.QBorder.length) {
			wallObject.binding(j, ctx, canvas, pos);
		} else if (j < imgObject.imgUrl.length + wallObject.QBorder.length) {
			imgObject.binding(j - wallObject.QBorder.length, ctx, canvas, pos);
		} else {
			wordObject.binding(j - imgObject.imgUrl.length - wallObject.QBorder.length, ctx, canvas, pos);
		}
	}
}

function reDraw1(j, event) {
	var ctx = canvas.getContext("2d");
	var pos = windowToCanvas(canvas, event.clientX, event.clientY);
	if (qiang_draw) {
		canvas.style.cursor = "auto";
	} else {
		if (select_most && selectArray.length > 0) {
			ctx3 = canvas.getContext("2d");
			ctx3.strokeStyle = "#000000";
			ctx3.rect(minX, minY, maxWidth, maxHeight);
			if (pos && ctx.isPointInPath(pos.x, pos.y)) {
				canvas.style.cursor = "move";
			} else {
				canvas.style.cursor = "auto";
			}
		} else {
			if (cengKeyText < wordObject.textArray.length) {
				wordObject.binding2(cengKeyText, ctx, canvas, pos);
			}else if (cengKey < imgObject.imgUrl.length) {
				imgObject.binding2(cengKey, ctx, canvas, pos);
			}else if (cengKeyQ < wallObject.QBorder.length) {
				wallObject.binding2(cengKeyQ, ctx, canvas, pos)
			} 
		}
	}
}

//生成图片
function copyimage(event, IsReturn) {
	imgObject.clearBorder(imgObject.imgUrl.length);
	wordObject.clearBorder(wordObject.textArray.length);
	wallObject.clearBorder(wallObject.QBorder.length);
	var ge = wangge;
	drawImage2(0, 0);
	addshuiyin();
	var img_png_src = canvas.toDataURL("image/png");
	document.getElementById("image_png").src = img_png_src;
	$("#imgUrl").attr("download", $("#image_png").attr("src"));
	//SaveAs5();
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		$("#blackbg").show();
		$("#image_png-div").show();
	} else {
		var date = new Date();
		saveFile(img_png_src, date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + "户型图.png");
	}
	drawImage2(ge, 1);
}
//获取坐标
function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left - (bbox.width - canvas.width) / 2,
		y: y - bbox.top - (bbox.height - canvas.height) / 2
	};
}
/**
 * 在本地进行文件保存
 * @param  {String} data     要保存到本地的图片数据
 * @param  {String} filename 文件名
 */
var saveFile = function(data, filename) {
	var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	save_link.href = data;
	save_link.download = filename;

	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	save_link.dispatchEvent(event);
};

function strJsonToJsonByEval() {
	var tq = '{"qiangarray":[';
	for (var i = 0; i < wallObject.QBorder.length; i++) {
		tq += '{"QBorder":' + wallObject.QBorder[i] + ',"QX1":' + wallObject.QX1[i] + ',"QX2":' + wallObject.QX2[i] + ',"QY1":' + wallObject.QY1[i] + ',"QY2":' + wallObject.QY2[i] + ',"QW":' + wallObject.QW[i] + ',"QColor":"' + wallObject.QColor[i] + '"},';
	}
	tq += "]}";
	var timg = '{"imgarray":[';
	for (var i = 0; i < imgObject.imgUrl.length; i++) {
		var src = "style" + imgObject.imgUrl[i].src.split("/style")[1];
		timg += '{"imgX":' + imgObject.imgX[i] + ',"imgY":' + imgObject.imgY[i] + ',"imgR":' + imgObject.imgR[i] + ',"imgBorder":' + imgObject.imgBorder[i] + ',"imgScaleX":' + imgObject.imgScaleX[i] + ',"imgScaleY":' + imgObject.imgScaleY[i] + ',"imgSrc":' + '"' + src + '"' + '},';
	}
	timg += "]}";
	var ttext = '{"textarray":[';
	for (var i = 0; i < wordObject.textArray.length; i++) {
		ttext += '{"textX":' + wordObject.textX[i] + ',"textY":' + wordObject.textY[i] + ',"textBorder":' + wordObject.textBorder[i] + ',"textSize":' + wordObject.textSize[i] + ',"textColor":' + '"' + wordObject.textColor[i] + '"' + ',"textArray":' + '"' + wordObject.textArray[i] + '"' + '},';
	}
	ttext += "]}";
	tq = tq + '&&' + timg + '&&' + ttext;
	var date = new Date();
	downloadFile(date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + "保存码.txt", tq);
}

function downloadFile(fileName, content) {
	var aLink = document.createElement('a');
	var blob = new Blob([content]);
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
	aLink.download = fileName;
	aLink.href = URL.createObjectURL(blob);
	aLink.dispatchEvent(evt);
}

function getOs() {
	var OsObject = "";
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return "MSIE";
	}
	if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
		return "Firefox";
	}
	if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
		return "Safari";
	}
	if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
		return "Camino";
	}
	if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
		return "Gecko";
	}
}