/*
Starts the game
*/

$(document).ready(function() {
	var game = new Game();
	game.reset(true);
	game.start();
});
