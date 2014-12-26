/*
The main game object. This will hold all the votesCounter, generators,
upgrades, events and whatever else the game will need.

Most of its attributes are public so that upgraders could change them.

> game = new Game();
> game.reset(); // Prepare the game elements
> game.start(); // Play :)
*/

function Game() {
	"use strict";

	this.votesCounter = new VotesCounter();
	this.votesClickValue = 1;
	this.generators = [];
	this.upgrades = [];

	// Used to reference the game object from nested functions
	var game = this;
	var reachedLastvoteEvent = false;

	// Used to configure the games 'tick' rate
	var frameRate = 25;
	var miliseconds = 40;

	function clickEvent() {
		game.votesCounter.addVotes(game.votesClickValue);
	}

	function votesChangedEvent() {
		if (reachedLastvoteEvent) return;

		if (voteEvents.length === 0) {
			console.log("reached final vote events");
			reachedLastvoteEvent = true;
			return;
		}

		var currentVotes = game.votesCounter.getVotes();

		if (currentVotes >= voteEvents[0].vote) {
			var currentEvent = voteEvents[0];
			voteEvents.shift();
			currentEvent.func(game);
		}
	}

	function updateState() {
		/*
		This is the main function that updates the current game state.
		*/
		game.votesCounter.updateVotes(frameRate);
		game.generators.forEach(function (generator) {
			generator.checkAvailability();
		});
	}

	this.reset = function(skipIntro) {
		/*
		Reset the game state

		-skipIntro: whether to show the intro or not
		*/
		console.log("reseting");

		if (!skipIntro) {
			openingSequence();
		}
		else skipOpening();


		// Attach click event to vote note
		$("#note").on("click", clickEvent);
		$(this.votesCounter).on("votesChanged", votesChangedEvent);

		// Attach votes changed event
		//votesCounter.

		// Create generators:
		var gensDiv = $("#generators");
		generatorsDetails.forEach(function (item) {
			this.generators.push(new Generator(this.votesCounter,
											   gensDiv,
											   item));
		}, game);

		// Create upgrades:
		var upgDiv = $("#upgrades");
		upgradesDetails.forEach(function (item) {
			this.upgrades.push(new Upgrade(this, upgDiv, item));
		}, game);
	};

	this.start = function() {
		console.log("starting");
		setInterval(updateState, miliseconds);
	};
}
