var VotingGame = (function (VG) {
  "use strict";
  
  // Set configuration for jquery-cookie
  $.cookie.json = true;

  VG._validateGameState = function (gameState) {
    /*
    Recives a gameState object and returns it with the default parameters
    if none are configured for it.
    */

    var defaultGameState = {
      level: 0,
      votes: 0,
      skipIntro: false,
      noteTitle: "",
      noteDesc: "",
      generators: {},
      upgrades: {},
    };

    if (! gameState ) return defaultGameState;

    var newGameState = {};

    for (var key in defaultGameState) {
      // Ignore properties from prototype and other weird stuff
      if (! defaultGameState.hasOwnProperty(key) ) continue;
      var val = gameState[key];
      var defaultVal = defaultGameState[key];
      newGameState[key] = val || defaultVal;
    }

    return newGameState;
  };

  VG.save = function () {
    /*
    Saves the current game state to a cookie named 'GS'
    */
    $.cookie("GS", VG._gameState);
  };

  VG.load = function () {
    /*
    Loads the current game state from the cookie 'GS'. DOESN'T RESET THE GAME!
    Thie method only returns the loaded save details (should be passed on to
    reset).
    */
    return $.cookie("GS");
  };

  return VG;
})(VotingGame || {});
