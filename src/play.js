/*
Starts the game
*/

$(document).ready(function() {
	var game = new Game();
	var queryString = (function () {
	  // This function is anonymous, is executed immediately and
	  // the return value is assigned to QueryString!
	  var qs = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0; i < vars.length; i++) {
	    var pair = vars[i].split("=");
	    	// If first entry with this name
	    if (typeof qs[pair[0]] === "undefined") {
	      qs[pair[0]] = pair[1];
	    	// If second entry with this name
	    } else if (typeof qs[pair[0]] === "string") {
	      var arr = [ qs[pair[0]], pair[1] ];
	      qs[pair[0]] = arr;
	    	// If third or later entry with this name
	    } else {
	      qs[pair[0]].push(pair[1]);
	    }
	 }
	    return qs;
	})();
	
	// This is for the background. Don't kill me if this is the worng place to put it :(
	var c=document.getElementById("bgCanvas");
	var B=c.getContext("2d");
	var ww = window.innerWidth;
	var wh = window.innerHeight;
	B.canvas.width = ww;
	B.canvas.height = wh;
	B.beginPath();
	B.rect(0,0,ww/3,wh);
	B.fillStyle="#1c809e";
	B.fill();
	B.beginPath();
	B.rect(ww/3,0,ww/3,wh);
	B.fillStyle="#2199bc";
	B.fill();
	B.beginPath();
	B.rect((ww/3)*2,0,ww/3,wh);
	B.fillStyle="#27b3dc";
	B.fill();
	B.beginPath();
	B.moveTo(0,0);
	B.lineTo(ww/3,60);
	B.lineTo((ww/3)*2,60);
	B.lineTo(ww,0);
	B.closePath();
	B.fillStyle="#edf7f2";
	B.fill();

	console.log(queryString);

	skipIntro = "skipIntro" in queryString;
	game.reset(skipIntro);
	game.start();
});
