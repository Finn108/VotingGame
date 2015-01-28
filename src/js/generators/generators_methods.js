var VotingGame = (function (VG) {
  "use strict";

 
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
      gen.updatePrice(state.price);
      if (state.shown) gen.showButton();
    }
  };


  return VG;
})(VotingGame || {});
