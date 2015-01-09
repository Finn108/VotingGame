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
  this.levelCtrl = new LevelController();
	this.votesClickValue = 1;
	this.generators = [];
	this.upgrades = [];

	// Used to reference the game object from nested functions
	var game = this;

	var reachedLastvoteEvent = false;
  var currentLevel = 0;

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

  function generatorBuyEvent(event, gen) {
    /*
    Runs the relevant
    */
    var genId = gen.id;
    var level = gen.getLevel();
    if (genId in genBuyEvents && level in genBuyEvents[genId]) {
      genBuyEvents[genId][level](game);
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

	this.reset = function(skipIntro, startingPoints) {
		/*
		Reset the game state

		-skipIntro: whether to show the intro or not
    -startingPoints: How many points to start the game with
		*/
		console.log("reseting");

		if (!skipIntro) {
			openingSequence();
		}
		else skipOpening();


		// Attach click event to vote note
		$("#note").on("click", clickEvent);

    // Attach event to vote change
		$(this.votesCounter).on("votesChanged", votesChangedEvent);

		// Create generators:
		var gensDiv = $("#generators");
		generatorsDetails.forEach(function (item) {
      var gen = new Generator(this.votesCounter, gensDiv, item);
			this.generators.push(gen);
      $(gen).on("buy", generatorBuyEvent);

		}, game);

		// Create upgrades:
		var upgDiv = $("#upgrades");
		upgradesDetails.forEach(function (item) {
			this.upgrades.push(new Upgrade(this, upgDiv, item));
		}, game);

    // Adds the starting points
    startingPoints = startingPoints || 0;
    console.log("starting with " + startingPoints + " points");
    this.votesCounter.addVotes(startingPoints);
	};

	this.start = function() {
		console.log("starting");
		setInterval(updateState, miliseconds);
	};

	this.getGenById = function(genId) {
		/*
		Returns the generator with the given ID
		*/
		var generator = $.grep(
			game.generators,
			function(item) {
				return item.id === genId;
			}
		)[0];
		return generator;
	};

  this.getUpgById = function(upgId) {
    var upgrade = $.grep(
      game.upgrades,
      function(item) {
        return item.id === upgId;
      }
    )[0];
    return upgrade;
  };

  this.goUpLevel = function() {
    currentLevel++;
    var details = levelsDetails[currentLevel];
    console.log("Moving to level " + details.title);
    this.levelCtrl.changeLevel(details.title, details.targetDesc);
  };
}
