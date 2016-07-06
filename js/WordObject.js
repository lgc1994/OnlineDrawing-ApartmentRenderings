function createWord(){
	
	var border2_text = 0; //判断点击那张图片
	
	this.textX = new Array(); //x坐标
	this.textY = new Array(); //y坐标
	this.textBorder = new Array(); //是否被选中
	this.textSize = new Array(); //大小
	this.textColor = new Array(); //颜色
	this.textArray = new Array(); //文字内容
	//下一层
	createWord.prototype.downforone = function(i){
		if (this.textArray[i] && i > 0) {
			this.textX.splice(i - 1, 0, this.textX[i]);
			this.textY.splice(i - 1, 0, this.textY[i]);
			this.textArray.splice(i - 1, 0, this.textArray[i]);
			this.textBorder.splice(i - 1, 0, this.textBorder[i]);
			this.textSize.splice(i - 1, 0, this.textSize[i]);
			this.textColor.splice(i - 1, 0, this.textColor[i]);
			this.removeWord(i + 1);
			cengKeyText = cengKeyText - 1;
		}
	}
	//上一层
	createWord.prototype.upforone = function(i){
		if (this.textArray[i] && i < this.textArray.length - 1) {
			this.textX.splice(i + 2, 0, this.textX[i]);
			this.textY.splice(i + 2, 0, this.textY[i]);
			this.textArray.splice(i + 2, 0, this.textArray[i]);
			this.textBorder.splice(i + 2, 0, this.textBorder[i]);
			this.textSize.splice(i + 2, 0, this.textSize[i]);
			this.textColor.splice(i + 2, 0, this.textColor[i]);
			this.removeWord(i);
			cengKeyText = cengKeyText + 1;
		}
	}
	//置底
	createWord.prototype.down = function(i){
		if (this.textArray[i]) {
			this.textX.splice(0, 0, this.textX[i]);
			this.textY.splice(0, 0, this.textY[i]);
			this.textArray.splice(0, 0, this.textArray[i]);
			this.textSize.splice(0, 0, this.textSize[i]);
			this.textColor.splice(0, 0, this.textColor[i]);
			this.removeWord(i + 1);
			cengKeyText = 0;
		}
	}
	//置顶
	createWord.prototype.up = function(i){
		if (this.textArray[i]) {
			this.textX.splice(this.textArray.length, 0, this.textX[i]);
			this.textY.splice(this.textArray.length, 0, this.textY[i]);
			this.textArray.splice(this.textArray.length, 0, this.textArray[i]);
			this.textBorder.splice(this.textArray.length, 0, this.textBorder[i]);
			this.textSize.splice(this.textArray.length, 0, this.textSize[i]);
			this.textColor.splice(this.textArray.length, 0, this.textColor[i]);
			this.removeWord(i);
			cengKeyText = this.textArray.length - 1;
		}
	}
	//清屏
	createWord.prototype.clean = function(){
		this.textX = [];
		this.textY = [];
		this.textArray = [];
		this.textBorder = [];
		this.textSize = [];
		this.textColor = [];
	}
	//删除单个文字
	createWord.prototype.removeWord = function(i){
		this.textX.splice(i, 1);
		this.textY.splice(i, 1);
		this.textArray.splice(i, 1);
		this.textBorder.splice(i, 1);
		this.textColor.splice(i, 1);
		this.textSize.splice(i, 1);
	}
	//编辑文字
	createWord.prototype.drawWord = function(ctx,j){
		ctx.restore();
		ctx.save();
		ctx.beginPath();
		ctx.font = 'bold ' + this.textSize[j] + 'px consolas';
		ctx.textAlign = 'left';
		ctx.fillStyle = wordObject.textColor[j];
		var width = ctx.measureText(this.textArray[j]).width;
		var height = this.textSize[j];
		ctx.fillText(this.textArray[j], this.textX[j], this.textY[j]);
		if (this.textBorder[j]) {
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.textX[j] + width + this.textSize[j], this.textY[j] - this.textSize[j]);
			ctx.lineTo(this.textX[j] + width + this.textSize[j], this.textY[j] - this.textSize[j] + 10 + height);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.textX[j] - this.textSize[j], this.textY[j] - this.textSize[j] + 10 + height);
			ctx.lineTo(this.textX[j] + width + this.textSize[j], this.textY[j] - this.textSize[j] + 10 + height);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.textX[j] - this.textSize[j], this.textY[j] - this.textSize[j]);
			ctx.lineTo(this.textX[j] - this.textSize[j], this.textY[j] - this.textSize[j] + 10 + height);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.textX[j] - this.textSize[j], this.textY[j] - this.textSize[j]);
			ctx.lineTo(this.textX[j] + width + this.textSize[j], this.textY[j] - this.textSize[j]);
			ctx.stroke();
			ctx.beginPath();
			ctx.fillRect(this.textX[j] + width + this.textSize[j] - 4, this.textY[j] - this.textSize[j] + 4 + height, 8, 8);
			ctx.setLineDash([0]);
		}
	}
	//清除边框（改变状态）
	createWord.prototype.clearBorder = function(j){
		for (var i = 0; i < wordObject.textArray.length; i++) {
			if (i != j) {
				wordObject.textBorder[i] = 0;
			} else {
				wordObject.textBorder[i] = 1;
			}
		}
	}
	//绑定事件
	createWord.prototype.binding = function(j, ctx, canvas, pos){
		ctx.font = 'bold ' + this.textSize[j] + 'px consolas';
		ctx.textAlign = 'left';
		ctx.fillStyle = '#666';
		var width = ctx.measureText(this.textArray[j]).width;
		var height = this.textSize[j];
		var arr = [{
			x: this.textX[j] - this.textSize[j],
			y: this.textY[j] - this.textSize[j],
			width: width + this.textSize[j] * 2,
			height: height + 10
		}, {
			x: this.textX[j] + width + this.textSize[j] - 5,
			y: this.textY[j] + height - this.textSize[j] + 5,
			width: 10,
			height: 10
		}, {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		}];
		var that = this;
		for (var i = 0; i < arr.length; i++) {
			border_len_text++;
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "transparent";
			ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
			ctx.fill();
			//widther
			if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 0) {
				border2_text = j + 1;
				cengKeyText = j;
				$("#color").get(0).value = that.textColor[j];
				canvas.onmousemove = function(event) {
					canvas.style.cursor = "move";
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					var x = pos1.x - pos.x;
					var y = pos1.y - pos.y;
					pos = pos1;
					that.textX[j] += x;
					that.textY[j] += y;
					that.clearBorder(j);
					drawImage2(wangge, 1);
				}
				canvas.ondblclick = function(event) {
					if (that.textBorder[j]) {
						$("#text1").css("top", that.textY[j] + canvas.offsetTop - that.textSize[j]);
						$("#text1").css("left", that.textX[j] + canvas.offsetLeft - that.textSize[j]);
						$("#text1").css("width", (width + that.textSize[j] * 2) + "px");
						$("#text1").css("font-size", that.textSize[j]);
						$("#text1").css("color", that.textColor[j]);
						$("#text1").get(0).value = that.textArray[j];
						$("#text1").show();
						canvas.style.cursor = "text";
						istext1 = true;
						keybord(j);
					}
				}
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 1) {
				border2_text = j + 1;
				cengKeyText = j;
				canvas.onmousemove = function(event) {
					canvas.style.cursor = "e-resize";
					var pos1 = windowToCanvas(canvas, event.clientX, event.clientY);
					var x = pos1.x - pos.x;
					var n = width / that.textSize[j];
					if (x >= n) {
						that.textSize[j]++;
						pos = pos1;
					} else if (x <= -n) {
						if (that.textSize[j] > 9) {
							that.textSize[j]--;
							pos = pos1;
						}
					}
					border2_text = 0;
					that.clearBorder(j);
					drawImage2(wangge, 1);
				}
			} else {
				if (border_len_text == (that.textArray.length * arr.length)) {
					if (border2_text == 0) {
						that.clearBorder(that.textArray.length);
						drawImage2(wangge, 1);
					} else {
						$("#color").css("background-color", that.textColor[border2_text - 1]);
						that.clearBorder(border2_text - 1);
						if(wallObject){
							wallObject.clearBorder(wallObject.QBorder.length);
						}
						if(imgObject){
							imgObject.clearBorder(imgObject.imgUrl.length);
						}
						border2_text = 0;
						drawImage2(wangge, 1);
					}
				}

			}
		}
	}
	//绑定鼠标停留样式
	createWord.prototype.binding2 = function(j, ctx, canvas, pos){
		ctx.font = 'bold ' + this.textSize[j] + 'px consolas';
		ctx.textAlign = 'left';
		ctx.fillStyle = '#666';
		var width = ctx.measureText(this.textArray[j]).width;
		var height = this.textSize[j];
		var arr = [{
			x: this.textX[j] - this.textSize[j],
			y: this.textY[j] - this.textSize[j],
			width: width + this.textSize[j] * 2,
			height: height + 10
		}, {
			x: this.textX[j] + width + this.textSize[j] - 5,
			y: this.textY[j] + height - this.textSize[j] + 5,
			width: 10,
			height: 10
		}];
		for (var i = 0; i < arr.length; i++) {
			border_len_text1++
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "transparent";
			ctx.rect(arr[i].x, arr[i].y, arr[i].width, arr[i].height);
			ctx.fill();
			//widther
			if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 0) {
				border_len_text1 = 0;
				canvas.style.cursor = "move";
			} else if (pos && ctx.isPointInPath(pos.x, pos.y) && i == 1) {
				border_len_text1 = 0;
				canvas.style.cursor = "e-resize";
			} else {
				if (border_len_text1 == arr.length)
					canvas.style.cursor = "auto";
			}
		}
	}
}
