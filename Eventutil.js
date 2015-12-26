var Eventutil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener)
			element.addEventListener(type, handler, false);
		else if(elemnt.attachEvent)
			element.attachEvent("on" + type, handler);
		else 
			element["on" + type] = handler;
	},

	getEvent: function(event){
		return event ? event : window.event;
	},

	getTarget: function(event){
		return event.target || event.srcElement;
	},

	preventDefault:function(event){
		if(event.preventDefault)
			event.preventDefault();
		else{
			event.returnValue = false;
		}
	},

	removeHandler: function(element, type, handler){
		if(element.removeEventListener)
			element.ramoveEventListener(type, handler, false);
		else if(element.detachEvent)
			element.detachEvent("on"+type, handler);
		else 
			element["on" +　type] = null;
	},

	stopPropagation:function(event) {//立即停止事件在DOM层次的传播
		if(event.stopPropagation)
			event.stopPropagation();
		else 
			event.cancelBubble = true;
	},
	
	getRelatedTarget:function(event) {//获取相关的元素，只对 mouseover 和mouseout有效
		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if(event.toElement) {
			return event.toElement;
		} else if(event.fromElement) {
			return event.fromElement;
		} else  {
			return null;
		}
	},

	getButton: function(event){
		if(document.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;//DOM中的button只有0（主鼠标） 1（次鼠标） 2（滚轮） 三个值
		} else {
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},

	getWheelDelta: function(event){//跨浏览器处理滚轮事件
		if(event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40;
		}
	},

	getCharCode: function(event){//返回键值
		if(typeof event.charCode == "number")
			return event.charCode;
		else 
			return event.keyCode;
	}
}

Eventutil.addHandler(window, "beforeunload", function(event){
	event = Eventutil.getEvent(event);
	var message = "I'm really going to miss you if you go.";
	event.returnValue = message;
	return message;
});

//contextmenu 事件
Eventutil.addHandler(window, "load", function(event){
	var div = document.getElementById("myDiv");

	Eventutil.addHandler(div, "contextmenu", function(event){
		event = Eventutil.getEvent(event);
		Eventutil.preventDefault(event);

		var menu = document.getElementById("myMenu");
		menu.style.left = event.clientX + "px";
		menu.style.top = event.clientY + "px";
		menu.style.visibility = "visible";
	});

	Eventutil.addHandler(document, "click", function(event){
		document.getElementById("myMenu").style.visibility = "hidden";
	});
});

//文本输入事件
var text = document.querySelector("#myText");
Eventutil.addHandler(text, "textInput", function(event){
	event = Eventutil.getEvent(event);
	alert(event.data);
});

var p = document.querySelector("#testP");
/*p.onclick = function(event){
	alert(event.type);
	//event.stopPropagation();
};*/

Eventutil.addHandler(window, "load", function(event){ alert("loaded");});

Eventutil.addHandler(p, "click", function(event){
	event = Eventutil.getEvent(event);
	var keys = new Array();

	if(event.shiftKey){
		keys.push("shift");
	};
	if(event.altKey){
		keys.push("alt");
	};
	if(event.ctrlKey){
		keys.push("ctrl");
	};

	alert("keys:" + keys.join(","));
});
Eventutil.addHandler(p, "mouseover",function(event){
	event = Eventutil.getEvent(event);
	alert(Eventutil.getRelatedTarget(event).id);
});

var m = document.querySelector("#mouse");
Eventutil.addHandler(m, "mousedown", function(event){
	event = Eventutil.getEvent(event);
	alert(Eventutil.getButton(event));
});

//滚轮事件
Eventutil.addHandler(document, "mousewheel", function(event){
	event = Eventutil.getEvent(event);
	alert(event.wheelDelta);
})