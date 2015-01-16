var VotingGame = (function (VG) {
  "use strict";

  // Details for all the different upgrades
  var upgradesDetails = [
    {
      id: "ClickPlus1",
      name: "שדרוג קליק",
      price: 10,
      description: "כל קליק שווה פי 2",
      func: function(game) {
        game.clickValue ++;
      },
    },
    {
      id: "VoterEachSecond",
      name: "שדרוג מצביע",
      price: 9,
      description: "מצביעים עכשיו הולכים לקלפי כל שנייה",
      func: function (game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updateVotesPerSecond(1);
      },
    },
  ];

  VG._createUpgrades = function (upgradesState) {
    var upgsState = upgradesState || {};
		var upgsDiv = $("#upgrades");

		upgradesDetails.forEach(function (item) {
      var upgrade = new VG._Upgrade(item, VG, upgDiv);
      VG._upgrades.push(upgrade);
      if (item.id in upgsState && upgsState[item.id]) {
        upgrade.activate();
      }
    });
  };
})(VotingGame || {});
