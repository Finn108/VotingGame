var VotingGame = (function (VG) {
  "use strict";

  // Details for all the different upgrades (assigned to VG so we could play
  // with them in tests)
  VG._upgradesDetails = [
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

  return VG;
})(VotingGame || {});
