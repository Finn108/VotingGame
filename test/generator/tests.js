var generatorsDetails = [
  {
    id: "Voter",
		name: "Single Voter",
		votesPerSec: 0.2,
		description: "Votes every few seconds. FOREVER",
		price: 5,
		picture: "../../assets/loneVoter.png",
  }
];


QUnit.test("Check generator VPS change", function(assert) {
  VotingGame.reset({skipIntro: true, votes: 13});
	var note = $("#note");
  var genButton = $("#genVoter");
  var generator = VotingGame.getGenById("Voter");

  genButton.click();
  assert.equal(
    VotingGame.votesCounter.getVotesPerSecond(),
    0.2,
    "VPS should be equal to single voter"
  );

  generator.updateVotesPerSecond(3);
  assert.equal(
    VotingGame.votesCounter.getVotesPerSecond(),
    3,
    "VPS should be equal to voter's change"
  );

  generator.updateVotesPerSecond("*3");
  assert.equal(
    VotingGame.votesCounter.getVotesPerSecond(),
    9,
    "VPS should be equal to voter's second change"
  );
});


QUnit.test("Other generator as currency (Army)", function (assert) {
  "use strict";

  VotingGame.cleanUp();
  VotingGame._generatorsDetails = [
    {
      id: "Voter",
      name: "Single Voter",
      votesPerSec: 0.2,
      description: "Votes every 5 seconds",
      price: 13,
      picture: "loneVoter.png",
    },
    {
      id: "Army",
      name: "Armed Operation",
      votesPerSec: 122181,
      description: "Attack",
      price: 72,
      picture: "army.png",
      currency: "Voter",
    },
  ];

  var gameState = {
    skipIntro: true,
    generators: {
      Voter: {
        level: 90,
        price: "*1", // Should keep price as it's ment to be
        shown: true,
      }
    }
  };

  VotingGame.reset(gameState);
  VotingGame.start();

  var voterPrice = $("#genVoter > .genBtnPrice").text();

  $("#genArmy").click();

  assert.equal(
    $("#genArmy > .genBtnLvl").text(),
    "1",
    "Army rose up one level"
  );

  assert.equal(
    $("#genVoter > .genBtnPrice").text(),
    voterPrice,
    "Voter still has a high price"
  );

  assert.equal(
    $("#genVoter > .genBtnLvl").text(),
    "18"
  );

});
