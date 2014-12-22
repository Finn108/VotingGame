/*
Handles changing the number of votes and votes per second and displaying
them.

> counter = new VotesCounter();
*/

function VotesCounter(initialVotes, initialVotesPerSecond) {
	"use strict";

	// Private attributes
	var currentVotes = initialVotes || 0;
	var votesPerSecond = initialVotesPerSecond || 0;
	var votesDisplay = $("#votesNumText");
	var votesPSDisplay = $("#votesPerSecText");

	// Private methods
	function refreshDisplay() {
		/*
		Writes the current votes and votes-per-second count to the screen
		*/
		votesDisplay.text(numNames(currentVotes));
		votesPSDisplay.text("(" + votesPerSecond + " קולות לשנייה)");
	}

	// Public methods
	this.updateVotes = function(frameRate) {
		/*
		This method is supposed to run in every `tick` of the game to properly
		update the votes number
		*/
		currentVotes += (votesPerSecond / frameRate);
		refreshDisplay();
	};

	this.addVotes = function(numOfVotes) {
		currentVotes += numOfVotes;
		refreshDisplay();
	};

	this.removeVotes = function(numOfVotes) {
		currentVotes -= numOfVotes;
		refreshDisplay();
	};

	this.getVotes = function() {
		return currentVotes;
	};

	this.addVotesPerSecond = function (numOfVPS) {
		votesPerSecond += numOfVPS;
		refreshDisplay();
	};
	
	this.removeVotesPerSecond = function (numOfVPS) {
		votesPerSecond -= numOfVPS;
		refreshDisplay();
	};
}
