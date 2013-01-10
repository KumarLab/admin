/*!
 * JavaScript Nicecon
 * Version 1.0.0
 *
 * by Prabhat Kumar
 *
 * Copyright © 2013. All rights reserved.
 * http://kumarlab.org/
 *
 * Date: Wed 1/9/2013 -- 6:00 PM [-Indian Standard Time]
 */
(function(){
  var Nicecon = {};
	var currentFavicon = null;
	var originalFavicon = null;
	var originalTitle = null;
	var canvas = null;
	var options = {};
	var defaults = {
		color:'#ff0084',	// Colour of Nicecon.
		background:'#bbb',	// Background colour of Nicecon.
		shadow:'#fff',		// Shadow of Nicecon.
		fallback:false
	};
	// Default for User Agent.
	var ua = (function(){
		var agent = navigator.userAgent.toLowerCase();
		return function(browser){
			return agent.indexOf(browser) !== -1;};
	}());
	// Default for Browsers.
	var browser = {
		ie:ua('msie'),
		chrome:ua('chrome'),
		webkit:ua('chrome') || ua('safari'),
		safari:ua('safari') && !ua('chrome'),
		mozilla:ua('mozilla') && !ua('chrome') && !ua('safari')
	};
	// Function for getting favicon tag.
	var getFaviconTag = function(){
		var links = document.getElementsByTagName('link');
		for(var i = 0, l = links.length; i < l; i++){
			if(links[i].getAttribute('rel') === 'icon' || links[i].getAttribute('rel') === 'shortcut icon'){
                return links[i];
			}
		}
		return false;
	};
	// Function for remove favicon tag.
	var removeFaviconTag = function(){
		var links = document.getElementsByTagName('link');
		var head = document.getElementsByTagName('head')[0];
		for(var i = 0, l = links.length; i < l; i++){
			if(links[i].getAttribute('rel') === 'icon' || links[i].getAttribute('rel') === 'shortcut icon'){
				head.removeChild(links[i]);
			}
		}
	};
	// Function to set favicon tag.
	var setFaviconTag = function(url){
		removeFaviconTag();
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'icon';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
	};
	// Function to get canvas.
    var getCanvas = function(){
		if(!canvas){
			canvas = document.createElement("canvas");
			canvas.width = 16;
			canvas.height = 16;
		}
		return canvas;
	};
	// Function to draw a favicon through canvas.
	var drawFavicon = function(percentage){
		var canvas = getCanvas();
		var context = canvas.getContext("2d");
		var percentage = percentage || 0;
		var src = currentFavicon;
		var faviconImage = new Image();
		faviconImage.onload = function(){
			if(context){
				context.clearRect(0, 0, 16, 16);
				// Now, it will 'Draw shadow'...
				context.beginPath();
				context.moveTo(canvas.width / 2, canvas.height / 2);
				context.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2), 0, Math.PI * 2, false);
				context.fillStyle = options.shadow;context.fill();
				// Now, it will 'Draw background'...
				context.beginPath();
				context.moveTo(canvas.width / 2, canvas.height / 2);
				context.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, 0, Math.PI * 2, false);
				context.fillStyle = options.background;context.fill();
				// Now, it will 'Draw pie'...
				if(percentage > 0){
					context.beginPath();
					context.moveTo(canvas.width / 2, canvas.height / 2);
					context.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 2, (-0.5) * Math.PI, (-0.5 + 2 * percentage / 100) * Math.PI, false);
					context.lineTo(canvas.width / 2, canvas.height / 2);
					context.fillStyle = options.color;
					context.fill();
				}
				setFaviconTag(canvas.toDataURL());
			}
		};
		// Allow cross origin resource requests if the image is not a data:uri
		if(!src.match(/^data/)){
			faviconImage.crossOrigin = 'anonymous';
		}
		faviconImage.src = src;
	};
	// Function to update title.
	var updateTitle = function(percentage){
		if(percentage > 0){
			document.title = '(' + percentage + '%) ' + originalTitle;
		}
		else{
			document.title = originalTitle;
		}
	};
	// Function to set nicecon options.
	Nicecon.setOptions = function(custom){
		options = {};
		for(var key in defaults){
			options[key] = custom.hasOwnProperty(key)?custom[key]:defaults[key];
		}
		return this;
	};
	// Function to set nicecon progress.
	Nicecon.setProgress = function(percentage){
		if(!originalTitle){
			originalTitle = document.title;
		}
		if(!originalFavicon || !currentFavicon){
			var tag = getFaviconTag();
			originalFavicon = currentFavicon = tag ? tag.getAttribute('href'):'/favicon.ico';
		}
		if(!isNaN(parseFloat(percentage)) && isFinite(percentage)){
			if(!getCanvas().getContext || browser.ie || browser.safari || options.fallback == true){
				// Fallback to updating the browser title if unsupported...
				return updateTitle(percentage);
			}
			else if(options.fallback === 'force'){
				updateTitle(percentage);
			}
			return drawFavicon(percentage);
		}
		return false;
	};
	// Function to nicecon reset.
	Nicecon.reset = function(){
		if(originalTitle){
			document.title = originalTitle;
		}
		if(originalFavicon){
			currentFavicon = originalFavicon;setFaviconTag(currentFavicon);
		}
	};
	Nicecon.setOptions(defaults);
	window.Nicecon = Nicecon;
})();
