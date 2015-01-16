var VotingGame = (function (VG) {
  "use strict";

  // Some usefull constants (sometimes used in tests)
  VG._cMainPath = "./";

  var defaultGameState = {
    level: 0,
    votes: 0,
    skipIntro: false,
    noteTitle: "",
    noteDesc: "",
    generators: {},
    upgrades: {},
  };
  
  VG.reset = function (gameState) {
    /*
    Creates all the different elements in the game according to the gameState.
    */
    gameState = gameState || defaultGameState;
    VG.clickValue = 1;
    VG._generators = [];
    VG._upgrades = [];
    VG._level = gameState.level || 0;

    if (! gameState.skipIntro) {
      var nameDetails = VG._opening();
      gameState.noteTitle = nameDetails[0];
      gameState.noteDesc = nameDetails[1];

    }
    else {
      VG._openingSkip(gameState.noteTitle, gameState.noteDesc);
    }
    
    // Increase the votes on each click
    $("#note").click(function () {
      VG.votesCounter.addVotes(VG.clickValue);
    });

    VG._createGenerators(gameState.generators);
    VG._createUpgrades(gameState.upgrades);

    // Return the number of votes to the given game state
    VG.votesCounter.addVotes(gameState.votes);
  };

  VG.start = function () {
    // Used to configure the games 'tick' rate
    var miliseconds = 40;
    var frameRate = 25;

		setInterval(function () {
      VG.votesCounter.updateVotes(frameRate);
      //TODO Write the save function!!!
      //VG._save();
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

  return VG;
})(VotingGame || {});
