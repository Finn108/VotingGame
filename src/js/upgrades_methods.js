var VotingGame = (function (VG) {
  "use strict";
  
  function upgradeBuyEvent (event, upgrade) {
    /*
    Adds the upgrade to the gameState to save.
    */
    VG._gameState.upgrades[upgrade.id] = true;
  }

  VG._createUpgrades = function (upgradesState) {
    var upgsState = upgradesState || {};
		var upgsDiv = $("#upgrades");

		VG._upgradesDetails.forEach(function (item) {
      var upgrade = new VG._Upgrade(item, VG, upgsDiv);
      VG._upgrades.push(upgrade);
      if (item.id in upgsState && upgsState[item.id]) {
        upgrade.activate();
      }
      else {
        $(upgrade).on("buy", upgradeBuyEvent);
      }
    });
  };

  return VG;
})(VotingGame || {});
