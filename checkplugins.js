//检测插件 在 ie 中无效

	function hasPlugin (name) {
		// body...
		name = name.toLowerCase();
		for(var i = 0; i < navigator.plugins.length; i++){
			if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
				alert("false");
				return false;
			}
		}
		alert("true");
		return true;
	}

//IE 中  传递的name 必须为待检测插件的唯一COM标识符
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		alert("true");
		return true;
	}
	catch(ex){
		alert(ex);
		return false;
	}
}

//检测所有浏览器的flash
function hasFlash(){
	var result = hasPlugin("Flash");
	if(!result){
		result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
	}
	return result;
}

//检测所有浏览器的QuickTime 
function hasQuickTime(){
	var result = hasPlugin("QuickTime");
	if(!result){
		result = hasIEPlugin("QuickTime.QuickTime");
	}
	return result;
}