var FloatLayer = function(tagName) {
    this.tagName = tagName;
    this.visible = false;
    this.floatEle = null;
    this.maskEle = null;
    this.animateTime = 600;

    this.init();
    this.bindEvent();
}

FloatLayer.prototype = {
    show: function() {
        this.visible = true;
        this.floatEle.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.maskEle.style.visibility = 'visible';
        this.floatEle.style.left = '50%';
        this.floatEle.style.top = '50%';
    },

    hide: function() {
        this.visible = false;
        this.floatEle.style.transform = 'translate(-50%, -50%) scale(0,0)';
        var self = this;
        setTimeout(function() {
            self.maskEle.style.visibility = 'hidden';
        }, this.animateTime - 10)
    },

    init: function() {
        this.maskEle = document.createElement('div');
        this.maskEle.style.width = window.screen.width + 'px';
        this.maskEle.style.height = window.screen.height + 'px';
        this.maskEle.style.backgroundColor = 'rgba(108,108,108,0.7)';
        this.maskEle.style.position = 'fixed';
        this.maskEle.style.left = '50%';
        this.maskEle.style.top = '50%';
        this.maskEle.style.transform = 'translate(-50%, -50%)';
        this.maskEle.style.visibility = 'hidden';

        this.floatEle = document.createElement('img');
        this.floatEle.style.position = 'absolute';
        this.floatEle.style.left = '50%';
        this.floatEle.style.top = '50%';
        this.floatEle.style.transform = 'translate(-50%, -50%) scale(0,0)';
        this.floatEle.style.transition = this.animateTime + 'ms transform';

        this.maskEle.appendChild(this.floatEle);
        document.body.appendChild(this.maskEle);

        var self = this;
        this.maskEle.addEventListener('click', function(e) {
            if (self.maskEle === this) {
                self.hide();
            }
        })

        this.floatEle.addEventListener('click', function(e) {
            e.stopPropagation();
        })
    },

    bindEvent: function(){
        var eles = document.getElementsByTagName(this.tagName);
        var self = this;
        for (var i = 0; i < eles.length; i++) {
            eles[i].addEventListener('click', function(index){
                return function(){
                    self.floatEle.src = eles[index].src;
                    self.show();
                };
            }(i));
        }
    }
};


function createFloatLayer(ele) {
    return new FloatLayer(ele);
}
