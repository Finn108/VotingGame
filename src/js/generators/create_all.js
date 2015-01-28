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
    var price = gen.getPrice();
    var genBuyEvents = VG._events.genBuyEvents;
    if (genId in genBuyEvents && level in genBuyEvents[genId]) {
      genBuyEvents[genId][level](VG);
    }

    // Add to gameState
    if (genId in VG._gameState.generators) {
      VG._gameState.generators[genId].level = level;
      VG._gameState.generators[genId].price = price;
    }
    else {
      VG._gameState.generators[genId] = {
        level: level,
        shown: true, // We assume they only bought it after they saw it...
        price: price,
      };
    }
  }

  function genRevealedEvent (event, gen) {
    /*
    When a generator is first seen we add its details to the gameState
    */
    VG._gameState.generators[gen.id] = {
      shown: true,
      level: gen.getLevel(),
    };
  }

  if (! VG._gens) VG._gens = {};

  VG._gens.createAll = VG._createGenerators = function () {
    var gensDiv = $("#generators");

    VG._generatorsDetails.forEach(function (genDetails) {
      var genId = genDetails.id;
      var targetLevel = 0;

      var gen = new VG._Generator(genDetails, gensDiv);
      VG._generators.push(gen);
      $(gen).on("buy", genBuyEvent);
      $(gen).on("reveal", genRevealedEvent);

    });
  };


  return VG;
})(VotingGame || {});
