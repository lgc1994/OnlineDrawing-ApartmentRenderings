function createWall(){
	
	this.QX1 = new Array(); //x1坐标
	this.QY1 = new Array(); //y1坐标
	this.QX2 = new Array(); //x2坐标
	this.QY2 = new Array(); //y2坐标
	this.QBorder = new Array(); //是否被选中
	this.QW = new Array(); //线粗
	this.QColor = new Array();//颜色
	
	//添加墙壁
	createWall.prototype.addWall = function(x1, y1, x2, y2,width){
		var color = $("#Qcolor").get(0).value;
		this.QX1.push(x1),
		this.QY1.push(y1),
		this.QW.push(width),
		this.QBorder.push(0),
		this.QColor.push(color),
		this.QX2.push(x2),
		this.QY2.push(y2);
	}
	//删除单个墙壁
	createWall.prototype.removeWall = function(i){
		this.QX1.splice(i, 1);
		this.QY1.splice(i, 1);
		this.QX2.splice(i, 1);
		this.QY2.splice(i, 1);
		this.QBorder.splice(i, 1);
		this.QW.splice(i, 1);
		this.QColor.splice(i, 1);
	}
	//清除边框（改变状态）
	createWall.prototype.clearBorder = function(j){
		for (var i = 0; i < this.QBorder.length; i++) {
			if (i != j) {
				this.QBorder[i] = 0;
			} else {
				this.QBorder[i] = 1;
			}
		}
	}
	//清屏
	createWall.prototype.clean = function(){
		this.QX1 = [], //x坐标
		this.QY1 = [], //y坐标
		this.QX2 = [], //x坐标
		this.QY2 = [], //y坐标
		this.QBorder = [], //是否被选中
		this.QColor = [],
		this.QW = [];
	}
	//画单个墙壁
	createWall.prototype.drawWall = function(ctx,i){
		ctx.restore();
		ctx.save();
		ctx.strokeStyle = this.QColor[i];
		ctx.lineWidth = this.QW[i];
		ctx.beginPath();
		ctx.moveTo(this.QX1[i], this.QY1[i]);
		ctx.lineTo(this.QX2[i], this.QY2[i]);
		ctx.stroke();
		var conx = 8;
		var cony = 8;
		if (this.QBorder[i]) {
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.QX2[i], this.QY1[i]);
			ctx.lineTo(this.QX2[i], this.QY2[i]);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.QX1[i], this.QY2[i]);
			ctx.lineTo(this.QX2[i], this.QY2[i]);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.QX1[i], this.QY1[i]);
			ctx.lineTo(this.QX1[i], this.QY2[i]);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.QX1[i], this.QY1[i]);
			ctx.lineTo(this.QX2[i], this.QY1[i]);
			ctx.stroke();
			ctx.beginPath();
	
			ctx.fillStyle = 'greenyellow';
			ctx.fillRect(this.QX1[i] - 4, this.QY1[i] - 4, 8, 8);
			ctx.fillRect(this.QX2[i] - 4, this.QY2[i] - 4, 8, 8);
		}
	}
	//绑定事件
	createWall.prototype.binding = function(j, ctx, canvas, pos){
		var arr = [{ //墙体
				x: this.QX1[j],
				y: this.QY1[j],
				width: this.QX2[j] - this.QX1[j],
				height: this.QY2[j] - this.QY1[j]
			}, { //右上点
				x: this.QX1[j] - 4,
				y: this.QY1[j] - 4,
				width: 8,
				height: 8
			}, { //左上点
				x: this.QX2[j] - 4,
				y: this.QY2[j] - 4,
				width: 8,
				height: 8
			}];
			if (arr[0].width > -this.QW[j] && arr[0].width < this.QW[j]) {
				arr[0].width = this.QW[j];
				arr[0].x -= this.QW[j] / 2;
			}
			if (arr[0].height > -this.QW[j] && arr[0].height < this.QW[j]) {
				arr[0].height = this.QW[j];
				arr[0].y -= this.QW[j] / 2;
			}
			var that = this;
			for (var i = 0; i < arr.length; i++) {
				border_len_text2++;
				ctx.restore();
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = "transparent";
				ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
				ctx.fill();
				if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 1) {
					cengKeyQ = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}if(imgObject){
						cengKey = imgObject.imgBorder.length;
					}
					border_len2 = j + 1;
					canvas.onmousemove = function(event) {
						canvas.style.cursor = "pointer";
						var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.QX1[j] += x;
						that.QY1[j] += y;
						pos = pos1;
						that.clearBorder(j);
						drawImage2(wangge, 1);
					}
				} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 2) {
					cengKeyQ = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}if(imgObject){
						cengKey = imgObject.imgBorder.length;
					}
					border_len2 = j + 1;
					canvas.onmousemove = function(event) {
						canvas.style.cursor = "pointer";
						var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.QX2[j] += x;
						that.QY2[j] += y;
						pos = pos1;
						that.clearBorder(j);
						drawImage2(wangge, 1);
					}
				} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 0) {
					cengKeyQ = j;
					if(wordObject){
						cengKeyText = wordObject.textArray.length;
					}if(imgObject){
						cengKey = imgObject.imgBorder.length;
					}
					border_len2 = j + 1;
					canvas.onmousemove = function(event) {
						canvas.style.cursor = "move";
						var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
						var x = pos1.x - pos.x;
						var y = pos1.y - pos.y;
						that.QX2[j] += x;
						that.QY2[j] += y;
						that.QX1[j] += x;
						that.QY1[j] += y;
						pos = pos1;
						that.clearBorder(j);
						drawImage2(wangge, 1);
					}
				} else {
					if (border_len_text2 == that.QBorder.length * arr.length) {
						if (border_len2 == 0) {
							that.clearBorder(that.QBorder.length);
							cengKeyQ = that.QBorder.length;
							drawImage2(wangge, 1);
							//多选拉框功能
							canvas.onmousemove = function(event) {
								ctx2 = canvas.getContext("2d");
								drawImage2(wangge, 1);
								ctx2.beginPath();
								var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
								var x = pos1.x - pos.x;
								var y = pos1.y - pos.y;
								ctx2.strokeStyle = "#000000";
								ctx2.lineWidth = 2;
								ctx2.setLineDash([10]);
								ctx2.beginPath();
								ctx2.strokeRect(pos.x, pos.y, x, y);
								x_select1 = pos.x;
								x_select2 = pos1.x;
								y_select1 = pos.y;
								y_select2 = pos1.y;
								if (x < 0) {
									var select = x_select1;
									x_select1 = x_select2;
									x_select2 = select;
								}
								if (y < 0) {
									var select = y_select1;
									y_select1 = y_select2;
									y_select2 = select;
								}
							}
						} else {
							$("#Qcolor").get(0).value = that.QColor[border_len2 - 1];
							$("#Qcolor").css("background-color", that.QColor[border_len2 - 1]);
							that.clearBorder(border_len2 - 1);
							drawImage2(wangge, 1);
							border_len2 = 0;
						}
					}
				}
			}
	}
	//绑定鼠标停留样式
	createWall.prototype.binding2 = function(j, ctx, canvas, pos){
		var arr = [{ //墙体
			x: this.QX1[j],
			y: this.QY1[j],
			width: this.QX2[j] - this.QX1[j],
			height: this.QY2[j] - this.QY1[j]
		}, { //右上点
			x: this.QX1[j] - 4,
			y: this.QY1[j] - 4,
			width: 8,
			height: 8
		}, { //左上点
			x: this.QX2[j] - 4,
			y: this.QY2[j] - 4,
			width: 8,
			height: 8
		}];
		if (arr[0].width > -this.QW[j] && arr[0].width < this.QW[j]) {
			arr[0].width = this.QW[j];
			arr[0].x -= this.QW[j] / 2;
		}
		if (arr[0].height > -this.QW[j] && arr[0].height < this.QW[j]) {
			arr[0].height = this.QW[j];
			arr[0].y -= this.QW[j] / 2;
		}
		var bool = 0;
		for (var i = 0; i < arr.length; i++) {
			border_len++;
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "transparent";
			ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
			ctx.fill();
			if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 1) {
				bool = 1;
				canvas.style.cursor = "pointer";
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 2) {
				bool = 1;
				canvas.style.cursor = "pointer";
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 0) {
				bool = 1;
				canvas.style.cursor = "move";
			} else {
				if (!bool) {
					canvas.style.cursor = "auto";
				}
			}
		}
	}
}
