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
  var game = new Game();
  game.reset(false, 5);
  game.start();
	var note = $("#note");
  var genButton = $("#genVoter");
  var generator = game.getGenById("Voter");

  genButton.click();
  assert.equal(
    game.votesCounter.getVotesPerSecond(),
    0.2,
    "VPS should be equal to single voter"
  );

  generator.updateVotesPerSecond(3);
  assert.equal(
    game.votesCounter.getVotesPerSecond(),
    3,
    "VPS should be equal to voter's change"
  );

  generator.updateVotesPerSecond("*3");
  assert.equal(
    game.votesCounter.getVotesPerSecond(),
    9,
    "VPS should be equal to voter's second change"
  );
});
