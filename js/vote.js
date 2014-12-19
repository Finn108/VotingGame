/*
Cool little game for the upcoming elections!

Created by Finn108 & nice-shot

Copyright 2014 or something...

Version 0.1.0
*/

function Generator() {
};

function Game() {
	"use strict";

	var votes = 0;
	var votesPerSecond = 0;
	var votesClickValue = 1;

	var displayVotes = function() {
		$("#votesNumText").text(votes)
	}
	var clickEvent = function() {
		votes += votesClickValue;
		displayVotes();
	}

	this.reset = function() {
		console.log("reseting");
		// Attach click event to vote note
		$("#noteImg").on("click", clickEvent)
	}

	this.start = function() {
		console.log("starting");
	}
}

$(document).ready(function() {
	var game = new Game();
	game.reset();
	game.start();
});
