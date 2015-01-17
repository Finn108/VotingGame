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

    // Add to gameState
    if (genId in VG._gameState.generators) {
      VG._gameState.generators[genId].level = level;
    }
    else {
      VG._gameState.generators[genId] = {
        level: level,
        shown: true // We assume they only bought it after they saw it...
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
  
  VG._updateGeneratorsToState = function (generatorsState) {
    /*
    Since there are a lot of dependencies between upgrades and generator. We'll
    create both of them and only afterwords apply the current state. We run
    reachTargetLevel after creation to catch its triggers
    */
    var gensState = generatorsState || {};
    for (var genId in gensState) {
      var gen = VG.getGenById(genId);
      var state = gensState[genId];
      gen.reachTargetLevel(state.level);
      if (state.shown) gen.showButton();
    }
  };

  VG._createGenerators = function () {
    var gensDiv = $("#generators");

    VG._generatorsDetails.forEach(function (genDetails) {
      var genId = genDetails.id;
      var targetLevel = 0;

      var gen = new VG._Generator(genDetails, VG.votesCounter, gensDiv);
      VG._generators.push(gen);
      $(gen).on("buy", genBuyEvent);
      $(gen).on("reveal", genRevealedEvent);

    });
  };

  return VG;
})(VotingGame || {});
