var Utils = require('/helper/Utils');

exports.navigationWindow = null;
exports.handleOpenWindow = function(evt) {
    var target = (evt.row && evt.row.title) || evt.target;
    if (exports[target]) {
    	if(exports.navigationWindow != null) {
    		var w = exports[target](evt);
    		w.title = target;
	     	exports.navigationWindow.openWindow(w);
	    }
    }
}
exports.include = function() {
	var args = arguments || [];
	for(var i = 0, len = args.length; i < len; i++) {
		var obj = require(args[i]);
		for(var key in obj) {
			exports[key] = obj[key];
		}
	}
}
exports.createInitialWindow = function(_title, _content) {
	var win = Ti.UI.createWindow({
		title: _title
	});
	win.add(_content);
	if(Utils.iOS) {
		exports.navigationWindow = Ti.UI.iOS.createNavigationWindow({
			window: win
		});
		return exports.navigationWindow;
	}
	return win;
}

exports.createWindow = function(_args) {
	_args = _args || {};
	if(Utils.android) {
		_args.fullscreen = false;
	}
	return Ti.UI.createWindow(_args);
}