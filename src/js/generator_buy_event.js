var VotingGame = (function (VG) {
  "use strict";
  
  VG._genBuyEvent = function (event, gen) {
    /*
    Whenever a generator is bought, we check if we have an event for that
    generator in that level and run it.
    */
    var genId = gen.id;
    var level = gen.getLevel();
    var genBuyEvents = VG._events.genBuyEvents;
    if (genId in genBuyEvents && level in genBuyEvents[genId]) {
      genBuyEvents[genId][level](VG);
    }
  };

  return VG;
})(VotingGame || {});