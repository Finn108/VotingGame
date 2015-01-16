var VotingGame = (function (VG) {
  "use strict";

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
    VG._generators = [];
    VG._upgrades = [];

    if (skipIntro) {
      var nameDetails = VG._opening();
      gameState.noteTitle = nameDetails[0];
      gameState.noteDesc = nameDetails[1];

    }
    else {
      VG._openingSkip(gameState.noteTitle, gameState.noteDesc);
    }
    
    $("#note").click(function () {
      VG.votesCounter.addVotes(VG.clickValue);
    });

    VG._createGenerators(gameState.generators);
    VG._createUpgrades(gameState.upgrades);
  };

})(VotingGame || {});
