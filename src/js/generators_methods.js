var VotingGame = (function (VG) {
  "use strict";

  function genBuyEvent (event, gen) {
    /*
    Whenever a generator is bought, we check if we have an event for that
    generator in that level and run it. Also, we add the buy event to the
    game state.
    */
    var genId = gen.id;
    var level = gen.getLevel();
    var genBuyEvents = VG._events.genBuyEvents;
    if (genId in genBuyEvents && level in genBuyEvents[genId]) {
      genBuyEvents[genId][level](VG);
    }
    VG._gameState.generators[genId] = level;
  }
  
  VG._createGenerators = function (generatorsState) {
    var gensState = generatorsState || {};
    var gensDiv = $("#generators");

    VG._generatorsDetails.forEach(function (genDetails) {
      var genId = genDetails.id;
      var level = 0;
      if (genId in gensState) {
        genDetails.level = gensState[genId].level;
        genDetails.shown = gensState[genId].shown;
      }

      var gen = new VG._Generator(genDetails, VG.votesCounter, gensDiv);
      VG._generators.push(gen);
      $(gen).on("buy", genBuyEvent);

    });
  };

  return VG;
})(VotingGame || {});
