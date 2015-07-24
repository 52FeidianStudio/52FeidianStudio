var $ = function (args)
{
    return new Base(args);
}
var Browser={
	isIE:!!window.ActiveXObject,
	isOpera:((window.opera+"") ==("[object Opera]"))
};
var Tween = {
	
	none:function(start,alter,curTime,dur){ return  start+alter;},//无效果
	Linear:function (start,alter,curTime,dur) {return start+curTime/dur*alter;},//最简单的线性变化,即匀速运动
	Quad:{//二次方缓动
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,2)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,2)-2*progress)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,2):-((--progress)*(progress-2) - 1))*alter/2+start;
		}
	}
}
  function getRealStyle(o,name) {
	if (window.getComputedStyle) {
		var style=window.getComputedStyle(o,null);
		return style.getPropertyValue(name);
	} else {
		var style=o.currentStyle;
		name=cameLize(name);
		if (name=="float")
		{
			name="styleFloat";
		}
		return style[name];
	}
}
function cameLize(s)
{
	return s.replace(/-[a-z]/gi,function(c){
		   return c.charAt(1).toUpperCase();//
		});
}
function getOffset(o) {
	var x=y=0,de='body';
	if (o.tagName==de && o.tagName=='html') {
		return {
			x:de.scrollLeft,
			y:de.scrollTop
		};
	}
	while (o) {
		x+=o.offsetLeft;
		y+=o.offsetTop;
		o=o.offsetParent;
		if (o && o.tagName!=de && !Browser.isOpera) {
			x+=o.clientLeft;
			y+=o.clientTop;
		}
	}
	return {
		x:x,
		y:y
	};
}
function animate(obj,start,alter,dur,fx,fu) {
	var curTime=0;
	var distand=alter-start;
	if(Math.abs(distand)<100) return;
	var t=setInterval(function () {
		if (curTime>=dur){
		obj.scrollTop=alter;
		//alert(document.body.scrollTop);
				if(fu){
				
					fu();
				}
			  clearTimeout(t);
			 return t;
			}
			obj.scrollTop=fx(start,distand,curTime,dur);
		curTime+=10;
	},10);
	return t;
}
function Base(args)
{
    this.elements = [];
    if (typeof args == 'string')
    {
        if (args.indexOf(' ') !=- 1)
        {
            var elements = args.split(' ');
            var childElements = [];
            var node = [];
            for (var i = 0; i < elements.length; i++)
            {
                if (node.length == 0) {
                    node.push(document);
                }
                switch (elements[i].charAt(0))
                {
                    case '#':
                        childElements = [];
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements;
                        break;
                    case '.':
                        childElements = [];
                        for (var j = 0; j < node.length; j++)
                        {
                            var temps = this.getClass(elements[i].substring(1), node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                    default:
                        childElements = [];
                        for (var j = 0; j < node.length; j++)
                        {
                            var temps = this.getTagName(elements[i], node[j]);
                            for (var k = 0; k < temps.length; k++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
        }
        else
        {
            switch (args.charAt(0))
            {
                case '#':
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements = this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTagName(args);
            }
        }
    }
    else if (typeof args == 'object') {
        if (args != undefined) {
            this.elements[0] = args;
        }
    }
}
Base.prototype.getId = function (id)
{
    return document.getElementById(id);
};
Base.prototype.getTagName = function (tag, parentNode)
{
    var node = null;
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    }
    else {
        node = document;
    }
    var tags = node.getElementsByTagName(tag);
    for (var i = 0; i < tags.length; i++) {
        temps.push(tags[i]);
    }
    return temps;
};
Base.prototype.getClass = function (className, parentNode)
{
    var node = null;
    var temps = [];
    if (parentNode != undefined) {
        node = parentNode;
    }
    else {
        node = document;
    }
    var all = node.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            temps.push(all[i]);
        }
    }
    return temps;
}
Base.prototype.find = function (str)
{
    var childElements = [];
    for (var i = 0; i < this.elements.length; i++)
    {
        switch (str.charAt(0))
        {
            case '#':
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.':
                var temps = this.getClass(str.substring(1), this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
                break;
            default:
                var temps = this.getTagName(str, this.elements[i]);
                for (var j = 0; j < temps.length; j++) {
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}
Base.prototype.getElement = function (num)
{
    return this.elements[num];
};
Base.prototype.eq = function (num)
{
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
Base.prototype.css = function (attr, value)
{
    for (var i = 0; i < this.elements.length; i++)
    {
        if (arguments.length == 1) {
            return getStyle(this.elements[i], attr);
        }
        this.elements[i].style[attr] = value;
    }
    return this;
}
Base.prototype.addClass = function (className)
{
    for (var i = 0; i < this.elements.length; i++)
    {
        if (!hasClass(this.elements[i], className)) {
            this.elements[i].className += ' ' + className;
        }
    }
    return this;
}
Base.prototype.removeClass = function (className)
{
    for (var i = 0; i < this.elements.length; i++)
    {
        if (hasClass(this.elements[i], className))
        {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), 
            ' ');
        }
    }
    return this;
}
Base.prototype.addRule = function (num, selectorText, cssText, position)
{
    var sheet = document.styleSheets[num];
    insertRule(sheet, selectorText, cssText, position);
    return this;
}
Base.prototype.removeRule = function (num, index)
{
    var sheet = document.styleSheets[num];
    deleteRule(sheet, index);
    return this;
}
Base.prototype.html = function (str)
{
    for (var i = 0; i < this.elements.length; i++)
    {
        if (arguments.length == 0) {
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}
Base.prototype.hover = function (over, out)
{
    for (var i = 0; i < this.elements.length; i++)
    {
        addEvent(this.elements[i], 'mouseover', over);
        if (sys.ie && sys.ie < 9) {
            addEvent(this.elements[i], 'mouseleave', out)
        }
        else {
            addEvent(this.elements[i], 'mouseout', out)
        };
    }
    return this;
};
Base.prototype.show = function ()
{
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
    return this;
}
Base.prototype.hide = function ()
{
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
    return this;
}
Base.prototype.center = function (width, height)
{
    var top = (getInner().height - 250) / 2;
    var left = (getInner().width - 350) / 2;
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    }
    return this;
}
Base.prototype.lock = function ()
{
    for (var i = 0; i < this.elements.length; i++)
    {
        this.elements[i].style.width = getInner().width + 'px';
        this.elements[i].style.height = getInner().height + 'px';
        this.elements[i].style.display = 'block';
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = 'hidden';
        addEvent(window, 'scroll', scrollTop);
    }
    return this;
};
Base.prototype.unlock = function ()
{
    for (var i = 0; i < this.elements.length; i++)
    {
        this.elements[i].style.display = 'none';
        document.documentElement.style.overflow = 'auto';
        removeEvent(window, 'scroll', scrollTop);
    }
    return this;
}
Base.prototype.click = function (fn)
{
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}
Base.prototype.submit = function (fn)
{
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onsubmit = fn;
    }
    return this;
}
Base.prototype.resize = function (fn)
{
    for (var i = 0; i < this.elements.length; i++)
    {
        var element = this.elements[i];
        addEvent(window, 'resize', function ()
        {
            fn();
            if (element.offsetLeft > getInner().width - element.offsetWidth) {
                element.style.left = getInner().width - element.offsetWidth + 'px';
            }
            if (element.offsetTop > getInner().height - element.offsetHeight) {
                element.style.top = getInner().height - element.offsetHeight + 'px';
            }
        });
    }
    return this;
}
Base.prototype.extend = function (name, fn)
{
    Base.prototype[name] = fn;
};
function getTarget(evt)
{
    if (evt.target) {
        evt = evt.target;
    }
    else if (window.event.srcElement) {
        evt = window.event.srcElement;
    }
    return evt;
}
function createXHR()
{
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    }
    else if (typeof ActiveXObject != "undefined")
    {
        var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
        for (var i = 0; i < version.length; i++) {
            try {
                return new ActiveXObject(version[i]);
            }
            catch (e) {}
        }
    }
    else {
        throw new Error('您的系统或浏览器不支持XHR对象！');
    }
}
function moveElement(elementID, final_x, final_y, interval)
{
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById(elementID)) {
        var elem = elementID;
    }
    else {
        var elem = document.getElementById(elementID);
    }
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        moveing = false;
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    elem.movement = setTimeout(function ()
    {
        moveElement(elementID, final_x, final_y, interval);
    }, interval);
}
Base.prototype.animate = function (obj) 
{
    for (var i = 0; i < this.elements.length; i ++) 
    {
        var element = this.elements[i];
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';
        var start = obj['start'] != undefined ? obj['start'] : attr == 'opacity' ? parseFloat(getStyle(element, 
        attr)) * 100 : parseInt(getStyle(element, attr));
        var t = obj['t'] != undefined ? obj['t'] : 10;
        var step = obj['step'] != undefined ? obj['step'] : 20;
        var alter = obj['alter'];
        var target = obj['target'];
        var mul = obj['mul'];
        var speed = obj['speed'] != undefined ? obj['speed'] : 6;
        var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';
        if (alter != undefined && target == undefined) {
            target = alter + start;
        }
        else if (alter == undefined && target == undefined && mul == undefined) {
            throw new Error('alter增量或target目标量必须传一个！');
        }
        if (start > target) {
            step = - step;
        }
        if (attr == 'opacity') 
        {
            element.style.opacity = parseInt(start)  / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(start) + ')';
        }
        else {}
        if (mul == undefined) {
            mul = {};
            mul[attr] = target;
        }
        clearInterval(element.timer);
        element.timer = setInterval(function () 
        {
            var flag = true;
            for (var i in mul) 
            {
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];
                if (type == 'buffer') 
                {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100)  / speed : (target - parseInt(getStyle(element, 
                    attr)))  / speed;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }
                if (attr == 'opacity') 
                {
                    if (step == 0) {
                        setOpacity();
                    }
                    else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
                        setOpacity();
                    }
                    else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
                        setOpacity();
                    }
                    else 
                    {
                        var temp = parseFloat(getStyle(element, attr)) * 100;
                        element.style.opacity = parseInt(temp + step)  / 100;
                        element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')';
                    }
                    if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) {
                        flag = false;
                    }
                }
                else 
                {
                    if (step == 0) {
                        setTarget();
                    }
                    else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
                        setTarget();
                    }
                    else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
                        setTarget();
                    }
                    else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }
                    if (parseInt(target) != parseInt(getStyle(element, attr))) {
                        flag = false;
                    }
                }
            }
            if (flag) {
                clearInterval(element.timer);
                if (obj.fn != undefined) {
                    obj.fn();
                }
            }
        }, t);
        function setTarget() 
        {
            element.style[attr] = target + 'px';
        }
        function setOpacity() 
        {
            element.style.opacity = parseInt(target)  / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
        }
    }
    return this;
};
