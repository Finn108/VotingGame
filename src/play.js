/*
Starts the game
*/

$(document).ready(function() {
  "use string";
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

	console.log(queryString);

	var skipIntro = "skipIntro" in queryString;
  var startingPoints = Number(queryString.points) || 0;

	game.reset(skipIntro, startingPoints);
	game.start();
});
