function createImage() {
	
	var kaiguan = false;
	var border2 = 0; //判断点击那张图片
	var isRoute = false;
	
	this.imgX = new Array(); //x坐标
	this.imgY = new Array(); //y坐标
	this.imgR = new Array(); //旋转角度
	this.imgBorder = new Array(); //是否被选中
	this.imgScaleX = new Array(); //长度缩放比例
	this.imgScaleY = new Array(); //高度缩放比例
	this.imgUrl = new Array(); //图片内容
	this.magnet = new Array();//是否贴近墙壁
	//旋转图片
	createImage.prototype.clockwise = function(r){
		if (cengKey < this.imgUrl.length && imgUrl) {
			this.imgR[cengKey] += r;
			if (this.imgR[cengKey] > 360) {
				this.imgR[cengKey] -= 360;
			} else if (this.imgR[cengKey] < 0) {
				this.imgR[cengKey] += 360;
			}
			drawImage2(wangge, 1);
		}
	}
	//新增一个图片信息
	createImage.prototype.addImg = function(bottom,imgsrc, width, height, event, S_caleX, S_caleY, oX, oY, oR){
		var img = new Image();
		var that = this;
		img.crossOrigin = "*";
		img.src = imgsrc;
		that.imgUrl.push(img);
		
		if (event) {
			var pos = windowToCanvas(canvas, event.clientX, event.clientY);
			that.imgR.push(0);
			that.imgBorder.push(0);
			that.magnet.push(false);
			img.addEventListener("load", function() {
				cengKey = that.imgUrl.length - 1;
				that.clearBorder(cengKey);
				that.imgScaleX.push(width / that.imgUrl[that.imgUrl.length - 1].width * 1.2);
				that.imgScaleY.push(height / that.imgUrl[that.imgUrl.length - 1].height * 1.2);
				that.imgX.push(pos.x - width * 0.6);
				that.imgY.push(pos.y - height * 0.6);
				drawImage2(wangge, 1);
			});
		} else {
			that.imgX.push(oX);
			that.imgY.push(oY);
			that.imgR.push(oR);
			that.imgBorder.push(0);
			that.imgScaleX.push(S_caleX);
			that.imgScaleY.push(S_caleY);
			that.magnet.push(false);
			img.addEventListener("load", function() {
				cengKey = that.imgUrl.length - 1;
				drawImage2(wangge, 1);
			});
		}
	}
	//画单个图片
	createImage.prototype.drawImg = function(ctx, j) {
		var i, X, Y, ScaleX, ScaleY, r, border;
		i = this.imgUrl[j];
		X = this.imgX[j];
		Y = this.imgY[j];
		ScaleX = this.imgScaleX[j];
		ScaleY = this.imgScaleY[j];
		r = this.imgR[j];
		border = this.imgBorder[j];
		ctx.restore();
		ctx.save();
		ctx.translate(X + i.width * ScaleX / 2, Y + i.height * ScaleY / 2);
		ctx.rotate(Math.PI / 180 * r);
		ctx.translate(-(X + i.width * ScaleX / 2), -(Y + i.height * ScaleY / 2));
		ctx.beginPath();
		ctx.drawImage(i, 0, 0, i.width, i.height, X, Y, i.width * ScaleX, i.height * ScaleY);
		if (border) {
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(X + i.width * ScaleX + 8, Y - 8);
			ctx.lineTo(X + i.width * ScaleX + 8, i.height * ScaleY + Y + 8);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(X - 8, i.height * ScaleY + Y + 8);
			ctx.lineTo(X + i.width * ScaleX + 8, i.height * ScaleY + Y + 8);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(X - 8, Y - 8);
			ctx.lineTo(X - 8, Y + i.height * ScaleY + 8);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(X - 8, Y - 8);
			ctx.lineTo(X + i.width * ScaleX + 8, Y - 8);
			ctx.stroke();
			ctx.beginPath();

			ctx.fillStyle = '#000';
			ctx.fillRect(X - 12, Y - 12, 8, 8);
			ctx.fillRect(X + i.width * ScaleX + 4, Y - 12, 8, 8);
			ctx.fillRect(X - 12, Y + i.height * ScaleY + 4, 8, 8);
			ctx.fillRect(X + i.width * ScaleX + 4, Y + i.height * ScaleY + 4, 8, 8);

			ctx.fillStyle = 'green';
			ctx.fillRect(X + i.width * ScaleX + 12, Y + i.height * ScaleY + 12, 10, 10);
			
			if(this.magnet[j]&&open_magnet){
				ctx.fillStyle = 'rgba(200,0,100,0.2)';
			}else{
				ctx.fillStyle = 'transparent';
			}
			ctx.fillRect(X-8,Y-8, i.width * ScaleX+16, i.height * ScaleY+16);
		}
		ctx.translate(X + i.width * ScaleX / 2, Y + i.height * ScaleY / 2);
		ctx.rotate(Math.PI / 180 * r * (-1));
		ctx.translate(-(X + i.width * ScaleX / 2), -(Y + i.height * ScaleY / 2));
	}
	//删除单个图片
	createImage.prototype.removeImg = function(i){
		this.imgX.splice(i, 1);
		this.imgY.splice(i, 1);
		this.imgUrl.splice(i, 1);
		this.imgR.splice(i, 1);
		this.imgBorder.splice(i, 1);
		this.imgScaleX.splice(i, 1);
		this.imgScaleY.splice(i, 1);
	}
	//清屏
	createImage.prototype.clean = function(){
		this.imgX = [];
		this.imgY = [];
		this.imgUrl = [];
		this.imgR = [];
		this.imgBorder = [];
		this.imgScaleX = [];
		this.imgScaleY = [];
	}
	//清除边框（改变状态）
	createImage.prototype.clearBorder = function(j){
		for (var i = 0; i < this.imgBorder.length; i++) {
			if (i != j) {
				this.imgBorder[i] = 0;
			} else {
				this.imgBorder[i] = 1;
			}
		}
	}
	//下一层
	createImage.prototype.downforone = function(i){
		if (this.imgUrl[i] && i > 0) {
			this.imgX.splice(i - 1, 0, this.imgX[i]);
			this.imgY.splice(i - 1, 0, this.imgY[i]);
			this.imgUrl.splice(i - 1, 0, this.imgUrl[i]);
			this.imgR.splice(i - 1, 0, this.imgR[i]);
			this.imgBorder.splice(i - 1, 0, this.imgBorder[i]);
			this.imgScaleX.splice(i - 1, 0, this.imgScaleX[i]);
			this.imgScaleY.splice(i - 1, 0, this.imgScaleY[i]);
			this.removeImg(i+1);
			cengKey = cengKey - 1;
		}
	}
	//上一层
	createImage.prototype.upforone = function(i){
		if (this.imgUrl[i] && i < this.imgUrl.length - 1) {
			this.imgX.splice(i + 2, 0, this.imgX[i]);
			this.imgY.splice(i + 2, 0, this.imgY[i]);
			this.imgUrl.splice(i + 2, 0, this.imgUrl[i]);
			this.imgR.splice(i + 2, 0, this.imgR[i]);
			this.imgBorder.splice(i + 2, 0, this.imgBorder[i]);
			this.imgScaleX.splice(i + 2, 0, this.imgScaleX[i]);
			this.imgScaleY.splice(i + 2, 0, this.imgScaleY[i]);
			this.removeImg(i);
			cengKey = cengKey + 1;
		}
	}
	//置底
	createImage.prototype.down = function(i){
		if (this.imgUrl[i]) {
			this.imgX.splice(0, 0, this.imgX[i]);
			this.imgY.splice(0, 0, this.imgY[i]);
			this.imgUrl.splice(0, 0, this.imgUrl[i]);
			this.imgR.splice(0, 0, this.imgR[i]);
			this.imgBorder.splice(0, 0, this.imgBorder[i]);
			this.imgScaleX.splice(0, 0, this.imgScaleX[i]);
			this.imgScaleY.splice(0, 0, this.imgScaleY[i]);
			this.removeImg(i+1);
			cengKey = 0;
		}
	}
	//置顶
	createImage.prototype.up = function(i){
		if (this.imgUrl[i]) {
			this.imgX.splice(this.imgUrl.length, 0, this.imgX[i]);
			this.imgY.splice(this.imgUrl.length, 0, this.imgY[i]);
			this.imgUrl.splice(this.imgUrl.length, 0, this.imgUrl[i]);
			this.imgR.splice(this.imgUrl.length, 0, this.imgR[i]);
			this.imgBorder.splice(this.imgUrl.length, 0, this.imgBorder[i]);
			this.imgScaleX.splice(this.imgUrl.length, 0, this.imgScaleX[i]);
			this.imgScaleY.splice(this.imgUrl.length, 0, this.imgScaleY[i]);
			this.removeImg(i);
			cengKey = this.imgUrl.length - 1;
		}
	}
	//获取外切矩形
	createImage.prototype.getOuter = function(i){
		var pCenter = {
			x:this.imgX[i]+this.imgScaleX[i]*this.imgUrl[i].width/2,
			y:this.imgY[i]+this.imgScaleY[i]*this.imgUrl[i].height/2
		};
		var pArrayY = [
		calcNewPoint({x:this.imgX[i],y:this.imgY[i]},pCenter,this.imgR[i]).y,
		calcNewPoint({x:this.imgX[i]+this.imgScaleX[i]*this.imgUrl[i].width,y:this.imgY[i]},pCenter,this.imgR[i]).y,
		calcNewPoint({x:this.imgX[i]+this.imgScaleX[i]*this.imgUrl[i].width,y:this.imgY[i]+this.imgScaleY[i]*this.imgUrl[i].height},pCenter,this.imgR[i]).y,
		calcNewPoint({x:this.imgX[i],y:this.imgY[i]+this.imgScaleY[i]*this.imgUrl[i].height},pCenter,this.imgR[i]).y
		];
		var pArrayX = [
		calcNewPoint({x:this.imgX[i],y:this.imgY[i]},pCenter,this.imgR[i]).x,
		calcNewPoint({x:this.imgX[i]+this.imgScaleX[i]*this.imgUrl[i].width,y:this.imgY[i]},pCenter,this.imgR[i]).x,
		calcNewPoint({x:this.imgX[i]+this.imgScaleX[i]*this.imgUrl[i].width,y:this.imgY[i]+this.imgScaleY[i]*this.imgUrl[i].height},pCenter,this.imgR[i]).x,
		calcNewPoint({x:this.imgX[i],y:this.imgY[i]+this.imgScaleY[i]*this.imgUrl[i].height},pCenter,this.imgR[i]).x
		];
		var maxX = Math.max.apply(Math, pArrayX);
		var minX = Math.min.apply(Math, pArrayX);
		var maxY = Math.max.apply(Math, pArrayY);
		var minY = Math.min.apply(Math, pArrayY);
		
		var newOuter = {
			x1:minX,
			y1:minY,
			x2:maxX,
			y2:maxY
		}
		return newOuter;
		
	}
	//绑定事件
	createImage.prototype.binding = function(j, ctx, canvas, pos) {
		var arr = [{
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 3,
			y: this.imgY[j] - 3,
			width: 10,
			height: this.imgUrl[j].height * this.imgScaleY[j] + 10
		}, {
			x: this.imgX[j] - 13,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 3,
			width: this.imgUrl[j].width * this.imgScaleX[j] + 26,
			height: 10
		}, {
			x: this.imgX[j] - 13,
			y: this.imgY[j] - 7,
			width: 10,
			height: this.imgUrl[j].height * this.imgScaleY[j] + 10
		}, {
			x: this.imgX[j] - 13,
			y: this.imgY[j] - 13,
			width: this.imgUrl[j].width * this.imgScaleX[j] + 26,
			height: 10
		}, {
			x: this.imgX[j] - 3,
			y: this.imgY[j] - 3,
			width: this.imgUrl[j].width * this.imgScaleX[j] + 6,
			height: this.imgUrl[j].height * this.imgScaleY[j] + 6
		}, { //左上点
			x: this.imgX[j] - 12,
			y: this.imgY[j] - 12,
			width: 8,
			height: 8
		}, { //右上点
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 4,
			y: this.imgY[j] - 12,
			width: 8,
			height: 8
		}, { //左下点
			x: this.imgX[j] - 12,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 4,
			width: 8,
			height: 8
		}, { //右下点
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 4,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 4,
			width: 8,
			height: 8

		}, { //右下转点
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 12,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 12,
			width: 10,
			height: 10
		}, { //右下转点
			x: 0,
			y: 0,
			width: 0,
			height: 0
		}];
		var ang = Math.atan(this.imgUrl[j].width / this.imgUrl[j].height) * 180 / Math.PI;
		var that = this;
		for (var i = 0; i < arr.length; i++) {
			border_len++;
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.translate(that.imgX[j] + that.imgUrl[j].width * that.imgScaleX[j] / 2, that.imgY[j] + that.imgUrl[j].height * that.imgScaleY[j] / 2);
			ctx.rotate(Math.PI / 180 * that.imgR[j]);
			ctx.translate(-that.imgX[j] - that.imgUrl[j].width * that.imgScaleX[j] / 2, -that.imgY[j] - that.imgUrl[j].height * that.imgScaleY[j] / 2);
			ctx.fillStyle = "transparent";
			ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
			ctx.fill();
			ctx.translate(that.imgX[j] + that.imgUrl[j].width * that.imgScaleX[j] / 2, that.imgY[j] + that.imgUrl[j].height * that.imgScaleY[j] / 2);
			ctx.rotate(Math.PI / 180 * that.imgR[j] * (-1));
			ctx.translate(-that.imgX[j] - that.imgUrl[j].width * that.imgScaleX[j] / 2, -that.imgY[j] - that.imgUrl[j].height * that.imgScaleY[j] / 2);
			//widther
			if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 0) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x * 2;
						m = n / m;
						if (m > 0) {
							that.imgX[j] -= x;
							that.imgScaleX[j] = that.imgScaleX[j] * m;
						}
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "n-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var n = that.imgUrl[j].width * that.imgScaleX[j];
						var m = that.imgUrl[j].width * that.imgScaleX[j] + y * 2;
						m = m / n;
						if (that.imgUrl[j].width * that.imgScaleX[j] * m > 2) {
							that.imgX[j] -= y;
							that.imgScaleX[j] = that.imgScaleX[j] * m;
						}
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x * 2;
						m = m / n;
						if (that.imgUrl[j].width * that.imgScaleX[j] * m > 2) {
							that.imgX[j] += x * m;
							that.imgScaleX[j] = that.imgScaleX[j] * m;
						}
					} else {
						canvas.style.cursor = "n-resize";
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - y * 2;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgX[j] += y;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 2) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x * 2;
						m = n / m;
						if (m > 0) {
							that.imgX[j] -= x;
							that.imgScaleX[j] = that.imgScaleX[j] * m;
						}
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "n-resize";
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - y * 2;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgX[j] += y;
						}
					} else if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "e-resize";
						var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x * 2;
						m = m / n;
						if (that.imgUrl[j].width * that.imgScaleX[j] * m > 2) {
							that.imgX[j] += x * m;
							that.imgScaleX[j] = that.imgScaleX[j] * m;
						}
					} else {
						canvas.style.cursor = "n-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var n = that.imgUrl[j].width * that.imgScaleX[j];
						var m = that.imgUrl[j].width * that.imgScaleX[j] + y * 2;
						m = m / n;
						if (that.imgUrl[j].width * that.imgScaleX[j] * m > 2) {
							that.imgX[j] -= y;
							that.imgScaleX[j] = that.imgScaleX[j] * m;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			}
			//heighter
			else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 1) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "n-resize";
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + y * 2;
						m = n / m;
						if (m > 0) {
							that.imgY[j] -= y;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + x * 2;
						m = m / n;
						if (that.imgUrl[j].height * that.imgScaleY[j] * m > 2) {
							that.imgY[j] += x * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "n-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + y * 2;
						m = m / n;
						if (that.imgUrl[j].height * that.imgScaleY[j] * m > 2) {
							that.imgY[j] += y;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + x * 2;
						m = m / n;
						if (that.imgUrl[j].height * that.imgScaleY[j] * m > 2) {
							that.imgY[j] -= x;
							that.imgScaleY[j] = that.imgScaleY[j] / m;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 3) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "n-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + y * 2;
						m = m / n;
						if (that.imgUrl[j].height * that.imgScaleY[j] * m > 2) {
							that.imgY[j] += y;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + x * 2;
						m = m / n;
						if (that.imgUrl[j].height * that.imgScaleY[j] * m > 2) {
							that.imgY[j] -= x;
							that.imgScaleY[j] = that.imgScaleY[j] / m;
						}
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "n-resize";
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + y * 2;
						m = n / m;
						if (m > 0) {
							that.imgY[j] -= y;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else {
						canvas.style.cursor = "e-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].height * that.imgScaleY[j];
						var n = that.imgUrl[j].height * that.imgScaleY[j] + x * 2;
						m = m / n;
						if (that.imgUrl[j].height * that.imgScaleY[j] * m > 2) {
							that.imgY[j] += x * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 8) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "se-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "sw-resize";
						var x = pos1.x - pos.x;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "nw-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					} else {
						canvas.style.cursor = "ne-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgY[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					}

					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 6) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "ne-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;

					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "se-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "sw-resize";
						var x = pos1.x - pos.x;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else {
						canvas.style.cursor = "nw-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 7) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "sw-resize";
						var x = pos1.x - pos.x;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "nw-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "ne-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgY[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					} else {
						canvas.style.cursor = "se-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					border2 = 0;
					kaiguan = true;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 5) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					if (that.imgR[j] < ang || that.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "nw-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					} else if (that.imgR[j] >= ang && that.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "ne-resize";
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.imgY[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						var k = that.imgScaleY[j];
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
						that.imgY[j] -= (that.imgScaleY[j] - k) * that.imgUrl[j].height;
					} else if (that.imgR[j] >= (ang + 90) && that.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "se-resize";
						var x = pos1.x - pos.x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] + x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					} else {
						canvas.style.cursor = "sw-resize";
						var x = pos1.x - pos.x;
						that.imgX[j] += x;
						var m = that.imgUrl[j].width * that.imgScaleX[j];
						var n = that.imgUrl[j].width * that.imgScaleX[j] - x;
						m = n / m;
						if (m > 0) {
							that.imgScaleX[j] = that.imgScaleX[j] * m;
							that.imgScaleY[j] = that.imgScaleY[j] * m;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					kaiguan = true;
					border2 = 0;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			}
			//rounding1
			else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 9) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				canvas.onmousemove = function(event) {
					canvas.style.cursor = "url('style/images/spin.png'),auto";
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					var x = pos1.x - pos.x;
					var y = pos1.y - pos.y;
					var a1 = that.imgX[j] + that.imgUrl[j].width * that.imgScaleX[j] / 2;
					var a2 = that.imgY[j] + that.imgUrl[j].height * that.imgScaleY[j] / 2;
					var ab = (pos.x - a1) * (pos.x - a1) + (pos.y - a2) * (pos.y - a2);
					var ca = (pos1.x - a1) * (pos1.x - a1) + (pos1.y - a2) * (pos1.y - a2);
					var tan1 = (pos.y - a2) / (pos.x - a1);
					var tan2 = (pos1.y - a2) / (pos1.x - a1);
					var angleAMB2 = Math.atan(tan2) * 180 / Math.PI;
					var angleAMB1 = Math.atan(tan1) * 180 / Math.PI;

					if (pos.x < a1) {
						if (pos.y > a2) {
							angleAMB1 = 180 + angleAMB1;
						} else {
							angleAMB1 += 180;
						}
					} else if (pos.x > a1 && pos.y < a2) {
						angleAMB1 = 360 + angleAMB1;
					}
					if (pos1.x < a1) {
						if (pos1.y > a2) {
							angleAMB2 = 180 + angleAMB2;
						} else {
							angleAMB2 += 180;
						}
					} else if (pos1.x > a1 && pos1.y < a2) {
						angleAMB2 = 360 + angleAMB2;
					}
					var angleAMB = angleAMB2 - angleAMB1;

					if (angleAMB) {
						that.imgR[j] += angleAMB;
						if (that.imgR[j] > 360) {
							that.imgR[j] -= 360;
						} else if (that.imgR[j] < 0) {
							that.imgR[j] += 360;
						}
					}
					pos = pos1;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					border2 = 0;
					kaiguan = true;
					that.imgBorder[j] = 1;
					drawImage2(wangge, 1);
				}
			}
			//move
			else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 4) {
				border2 = j + 1;
				cengKey = j;
				if(wordObject){
					cengKeyText = wordObject.textArray.length;
				}
				kaiguan = true;
				canvas.onmousemove = function(event) {
					canvas.style.cursor = "move";
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					var x = pos1.x - pos.x;
					var y = pos1.y - pos.y;
					pos = pos1;
					that.imgX[j] += x;
					that.imgY[j] += y;
					cengKey = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}
					border2 = 0;
					kaiguan = true;
					that.imgBorder[j] = 1;
					if(wallObject){
						for(var wall=0;wall < wallObject.QBorder.length;wall++){
							var p1 = {
								x:that.imgX[j]-8-wallObject.QW[wall]/2,
								y:that.imgY[j]-8-wallObject.QW[wall]/2
							};
							var pcenter = {
								x:that.imgX[j]+that.imgUrl[j].width*that.imgScaleX[j]/2,
								y:that.imgY[j]+that.imgUrl[j].height*that.imgScaleY[j]/2
							}
							var p2 = {
								x:that.imgX[j]+that.imgUrl[j].width*that.imgScaleX[j]+8+wallObject.QW[wall]/2,
								y:that.imgY[j]+that.imgUrl[j].height*that.imgScaleY[j]+8+wallObject.QW[wall]/2
							}
							var p3 = {
								x:that.imgX[j]-8-wallObject.QW[wall]/2,
								y:that.imgY[j]+that.imgUrl[j].height*that.imgScaleY[j]+8+wallObject.QW[wall]/2
							}
							var p4 = {
								x:that.imgX[j]+that.imgUrl[j].width*that.imgScaleX[j]+8+wallObject.QW[wall]/2,
								y:that.imgY[j]-8-wallObject.QW[wall]/2
							}
							var p5 = {
								x:wallObject.QX1[wall],
								y:wallObject.QY1[wall]
							}
							var p6 = {
								x:wallObject.QX2[wall],
								y:wallObject.QY2[wall]
							}
							var bool1 = checkCross(calcNewPoint(p1,pcenter,that.imgR[j]),calcNewPoint(p3,pcenter,that.imgR[j]),p5,p6);
							var bool2 = checkCross(calcNewPoint(p1,pcenter,that.imgR[j]),calcNewPoint(p4,pcenter,that.imgR[j]),p5,p6);
							var bool3 = checkCross(calcNewPoint(p2,pcenter,that.imgR[j]),calcNewPoint(p3,pcenter,that.imgR[j]),p5,p6);
							var bool4 = checkCross(calcNewPoint(p2,pcenter,that.imgR[j]),calcNewPoint(p4,pcenter,that.imgR[j]),p5,p6);
							if(bool1||bool2||bool3||bool4){
								that.magnet[j] = wall+1;
								varSImg = cengKey+1;
								break;
							}else{
								that.magnet[j] = false;
								varSImg = false;
							}
						}
					}
					drawImage2(wangge, 1);
				}
			} else {
				if (border_len == (that.imgUrl.length * arr.length)) {
					if (border2 == 0) {
						kaiguan = false;
						canvas.style.cursor = "auto";
						that.clearBorder(that.imgUrl.length);
						if(wordObject){
							wordObject.clearBorder(wordObject.textArray.length);
						}
						drawImage2(wangge, 1);
					} else {
						if(wallObject){
							wallObject.clearBorder(wallObject.QBorder.length);
						}
						that.clearBorder(border2 - 1);
						border2 = 0;
						drawImage2(wangge, 1);
					}
				}
			}
		}
	}
	//绑定鼠标停留样式
	createImage.prototype.binding2 = function(j, ctx, canvas, pos) {
		var arr = [{
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 3,
			y: this.imgY[j] - 3,
			width: 10,
			height: this.imgUrl[j].height * this.imgScaleY[j] + 10
		}, {
			x: this.imgX[j] - 13,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 3,
			width: this.imgUrl[j].width * this.imgScaleX[j] + 26,
			height: 10
		}, {
			x: this.imgX[j] - 13,
			y: this.imgY[j] - 7,
			width: 10,
			height: this.imgUrl[j].height * this.imgScaleY[j] + 10
		}, {
			x: this.imgX[j] - 13,
			y: this.imgY[j] - 13,
			width: this.imgUrl[j].width * this.imgScaleX[j] + 26,
			height: 10
		}, {
			x: this.imgX[j] - 3,
			y: this.imgY[j] - 3,
			width: this.imgUrl[j].width * this.imgScaleX[j] + 6,
			height: this.imgUrl[j].height * this.imgScaleY[j] + 6
		}, { //左上点
			x: this.imgX[j] - 12,
			y: this.imgY[j] - 12,
			width: 8,
			height: 8
		}, { //右上点
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 4,
			y: this.imgY[j] - 12,
			width: 8,
			height: 8
		}, { //左下点
			x: this.imgX[j] - 12,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 4,
			width: 8,
			height: 8
		}, { //右下点
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 4,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 4,
			width: 8,
			height: 8

		}, { //右下转点
			x: this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] + 12,
			y: this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] + 12,
			width: 10,
			height: 10
		}];
		var ang = Math.atan(this.imgUrl[j].width / this.imgUrl[j].height) * 180 / Math.PI;
		for (var i = 0; i < arr.length; i++) {
			border_len1++;
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.translate(this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] / 2, this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] / 2);
			ctx.rotate(Math.PI / 180 * this.imgR[j]);
			ctx.translate(-this.imgX[j] - this.imgUrl[j].width * this.imgScaleX[j] / 2, -this.imgY[j] - this.imgUrl[j].height * this.imgScaleY[j] / 2);
			ctx.fillStyle = "transparent";
			ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
			ctx.fill();
			ctx.translate(this.imgX[j] + this.imgUrl[j].width * this.imgScaleX[j] / 2, this.imgY[j] + this.imgUrl[j].height * this.imgScaleY[j] / 2);
			ctx.rotate(Math.PI / 180 * this.imgR[j] * (-1));
			ctx.translate(-this.imgX[j] - this.imgUrl[j].width * this.imgScaleX[j] / 2, -this.imgY[j] - this.imgUrl[j].height * this.imgScaleY[j] / 2);
			//widther
			if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 0) {
				border_len1 = 0;
				if (kaiguan) {
					if ((this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) || (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180))) {
						canvas.style.cursor = "e-resize";
					} else {
						canvas.style.cursor = "n-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 2) {
				border_len1 = 0;
				if (kaiguan) {
					if ((this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) || (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180))) {
						canvas.style.cursor = "e-resize";
					} else {
						canvas.style.cursor = "n-resize";
					}
				}
			}
			//heighter
			else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 1) {
				border_len1 = 0;
				if (kaiguan) {
					if ((this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) || (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180))) {
						canvas.style.cursor = "n-resize";
					} else {
						canvas.style.cursor = "e-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 3) {
				border_len1 = 0;
				if (kaiguan) {
					if ((this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) || (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180))) {
						canvas.style.cursor = "n-resize";
					} else {
						canvas.style.cursor = "e-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 5) {
				border_len1 = 0;
				if (kaiguan) {
					if (this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "nw-resize";
					} else if (this.imgR[j] >= ang && this.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "ne-resize";
					} else if (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "se-resize";
					} else {
						canvas.style.cursor = "sw-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 6) {
				border_len1 = 0;
				if (kaiguan) {
					if (this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "ne-resize";
					} else if (this.imgR[j] >= ang && this.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "se-resize";
					} else if (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "sw-resize";
					} else {
						canvas.style.cursor = "nw-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 7) {
				border_len1 = 0;
				if (kaiguan) {
					if (this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "sw-resize";
					} else if (this.imgR[j] >= ang && this.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "nw-resize";
					} else if (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "ne-resize";
					} else {
						canvas.style.cursor = "se-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 8) {
				border_len1 = 0;
				if (kaiguan) {
					if (this.imgR[j] < ang || this.imgR[j] >= (360 - ang)) {
						canvas.style.cursor = "se-resize";
					} else if (this.imgR[j] >= ang && this.imgR[j] < (ang + 90)) {
						canvas.style.cursor = "sw-resize";
					} else if (this.imgR[j] >= (ang + 90) && this.imgR[j] < (ang + 180)) {
						canvas.style.cursor = "nw-resize";
					} else {
						canvas.style.cursor = "ne-resize";
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i > 8) {
				border_len1 = 0;
				if (kaiguan) {
					canvas.style.cursor = "url('style/images/spin.png'),pointer";
				}
			}
			//move
			else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 4) {
				border_len1 = 0;
				if (kaiguan) {
					canvas.style.cursor = "move";
				}
			} else {
				if (border_len1 == arr.length)
					canvas.style.cursor = "auto";
			}
		}
	}
}
//判断线段是否相交
var crossMul=function(v1,v2){
        return   v1.x*v2.y-v1.y*v2.x;
}

var checkCross=function(p1,p2,p3,p4){
    var v1={x:p1.x-p3.x,y:p1.y-p3.y},
    v2={x:p2.x-p3.x,y:p2.y-p3.y},
    v3={x:p4.x-p3.x,y:p4.y-p3.y},
    v=crossMul(v1,v3)*crossMul(v2,v3);
    v1={x:p3.x-p1.x,y:p3.y-p1.y};
    v2={x:p4.x-p1.x,y:p4.y-p1.y};
    v3={x:p2.x-p1.x,y:p2.y-p1.y};
    return (v<=0&&crossMul(v1,v3)*crossMul(v2,v3)<=0)?true:false
}
//获取旋转后坐标位置
var calcNewPoint = function(p, pCenter,angle) {
		var l = (angle * Math.PI) / 180;
		
		var r = Math.sqrt((p.x-pCenter.x)*(p.x-pCenter.x)+(p.y-pCenter.y)*(p.y-pCenter.y));
		
		var cosv = Math.cos(l);
		var sinv = Math.sin(l);

		var newp = {
			x : (p.x-pCenter.x)*cosv-(p.y-pCenter.y)*sinv+pCenter.x,
			y : (-(p.x-pCenter.x)*sinv+(p.y-pCenter.y)*cosv+pCenter.y)
		}
		return newp;
	}