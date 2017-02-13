// (function(){

// 	waterfall('main', 'pin');
	// var loadPicNum = 3;
	// window.onscroll = function(){
	// 	if(checkScrollSide){
	// 		var oParent = document.getElementById('main');
	// 		for(var i=0;i<loadPicNum;i++){
	// 			var oPin = document.createElement('div');
	// 			oPin.className = 'pin';
	// 			oParent.appendChild(oPin);
	// 			var oBox = document.createElement('div');
	// 			oBox.className = 'box';
	// 			oPin.appendChild(oBox);
	// 			var oImg = document.createElement('img');
	// 			oImg.src = './img/'+(Math.floor(Math.random()*97)+1)+'.jpg';
	// 			oBox.appendChild(oImg);
	// 		}
	// 		waterfall('main', 'pin');
	// 	}
	// };

// 	function waterfall(parent, box){
// 		var oParent = document.getElementById(parent);
// 		var oBoxs = oParent.getElementsByClassName(box);
// 		var oBoxWid = oBoxs[0].offsetWidth;
// 		var cols = Math.floor(document.documentElement.clientWidth/oBoxWid);
// 		oParent.style.cssText = 'width:'+oBoxWid*cols+'px; margin: 0 auto';

// 		var hArr = [];
// 		for (var i = 0; i < oBoxs.length; i++) {
// 			if (i<cols) {
// 				hArr.push(oBoxs[i].offsetHeight);
// 			} else {
// 				var minH = Math.min.apply(null, hArr);
// 				var index = getMinhIndex(hArr, minH);
// 				oBoxs[i].style.position = 'absolute';
// 				oBoxs[i].style.top = minH+'px';
// 				oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
// 				hArr[index]+=oBoxs[i].offsetHeight;
// 			}
// 		}
// 	}

// 	function getMinhIndex(arr, val){
// 		for(var i in arr){
// 			if(arr[i] == val){
// 				return i;
// 			}
// 		}
// 	}

// 	function checkScrollSide(){
// 		var oParent = document.getElementById('main');
// 		var aPin = oParent.getElementsByClassName('pin');
// 		var lastPin = aPin[aPin.length-1];
// 		var lastPinH = lastPin.offsetTop + Math.floor(lastPin.offsetHeight);
// 		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
// 		var documentH = document.documentElement.clientHeight || document.body.clientHeight;
// 		return (lastPinH<scrollTop+documentH)?true:false;
// 	}
// })();

var WaterFall = function(parent, box, cols, space){
	this.parent = document.getElementById(parent);
	this.boxs = this.parent.getElementsByClassName(box);
	this.cols = cols || 7;
	this.space = space || 10;
	this.layer = createFloatLayer('img');
	
	this.init();
	this.bindEvent();
};

WaterFall.prototype = {
	init: function(){
		var boxW = this.boxs[0].offsetWidth;
		var parentW = (boxW+this.space)*this.cols;
		this.parent.style.cssText = 'width:'+parentW+'px; margin: 0 auto';

		var self = this;
		var hArr = [];
		for (var i = 0; i < this.boxs.length; i++) {
			self.boxs[i].style.paddingTop = self.space+'px';
			self.boxs[i].style.paddingRight = self.space+'px';
			if (i<self.cols) {
				hArr.push(self.boxs[i].offsetHeight);
			} else {
				var minH = Math.min.apply(null, hArr);
				var index = self.getMinhIndex(hArr, minH);
				self.boxs[i].style.position = 'absolute';
				self.boxs[i].style.top = minH+'px';
				self.boxs[i].style.left = self.boxs[index].offsetLeft+'px';
				hArr[index]+=self.boxs[i].offsetHeight;
			}
		}
	},

	getMinhIndex: function(arr, val){
		for(var i in arr){
			if(arr[i] == val){
				return i;
			}
		}
	},

	bindEvent: function(){
		var loadPicNum = 2;
		var self = this;
		window.onscroll = function(){
			if(self.checkScrollSide){
				for(var i=0;i<loadPicNum;i++){
					var oPin = document.createElement('div');
					oPin.className = 'pin';
					self.parent.appendChild(oPin);
					var oBox = document.createElement('div');
					oBox.className = 'box';
					oPin.appendChild(oBox);
					var oImg = document.createElement('img');
					oImg.src = './img/'+(Math.floor(Math.random()*114)+1)+'.jpg';
					oBox.appendChild(oImg);
				}
				self.init();
				self.layer.bindEvent();
			}
		};
	},

	checkScrollSide: function(){
		var lastPin = this.boxs[this.boxs.length-1];
		var lastPinH = lastPin.offsetTop + Math.floor(lastPin.offsetHeight);
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var documentH = document.documentElement.clientHeight || document.body.clientHeight;
		return (lastPinH<scrollTop+documentH)?true:false;
	}
};