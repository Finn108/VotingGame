var VotingGame = (function (VG) {
  "use strict";

  // Some usefull constants (sometimes used in tests)
  VG._cMainPath = "./";

  var updateInterval = -1;
  // Used in 'tick' function
  var frameRate = 25;
  
  VG.reset = function (gameState) {
    /*
    Creates all the different elements in the game according to the gameState.
    */
    clearInterval(updateInterval);
    gameState = VG._gameState = VG._validateGameState(gameState);
    VG.clickValue = 1;
    VG._generators = [];
    VG._upgrades = [];
    VG._level = gameState.level;
    VG._currentVoteEvent = 0;

    if (! gameState.skipIntro) {
      VG._opening();
      gameState.skipIntro = true;
    }
    else {
      VG._openingSkip(gameState.noteTitle, gameState.noteDesc);
    }

    // Increase the votes on each click
    $("#note").click(function () {
      VG.votesCounter.addVotes(VG.clickValue);
    });

    // Return the number of votes to the given game state
    VG.votesCounter.reset();

    VG._createGenerators();
    VG._createUpgrades(gameState.upgrades);
    VG._updateGeneratorsToState(gameState.generators);

    // The addVotes function must happen after the reset and the generators
    // and upgraders create. Otherwise the events related to the votes won't
    // work properly
    VG.votesCounter.addVotes(gameState.votes);

    VG.votesCounter.updateVotes(frameRate);
    VG.save();
  };

  VG.start = function () {
    // Used to configure the games 'tick' rate
    var miliseconds = 40;

		updateInterval = setInterval(function () {
      VG.votesCounter.updateVotes(frameRate);
      VG.save();
    }, miliseconds);
  };

  VG.getGenById = function (genId) {
		/*
		Returns the generator with the given ID
		*/
		var generator = $.grep(
			VG._generators,
			function(item) {
				return item.id === genId;
			}
		)[0];
		return generator;
  };

  VG.getUpgById = function (upgId) {
    var upgrade = $.grep(
      VG._upgrades,
      function(item) {
        return item.id === upgId;
      }
    )[0];
    return upgrade;
  };

  VG.cleanUp = function () {
    /*
    Removes all the events, upgrades and generators from the basic
    configuration of the game. Used mainly for testing.
    After running this function you can run reset without things being totally
    messed up.
    */
    VG._upgradesDetails = [];
    VG._generatorsDetails = [];
    VG._events = {
      voteEvents: [],
      genBuyEvents: [],
    };
  };

  VG.restoreDefaults = function () {
    /*
    Returns the events configurations to the default values. Used mainly for
    testing.
    */
    VG._upgradesDetails = VG._upgradesDetailsDefault;
    VG._generatorsDetails = VG._generatorsDetailsDefault;
    // Make sure that if you change events - you do VotingGame._events = <>
    // and not VG._events.voteEvents = <>. Otherwise you'll change the default
    VG._events = VG._eventsDefault;
  };

  return VG;
})(VotingGame || {});
