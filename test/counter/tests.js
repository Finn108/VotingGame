QUnit.test("initiation test", function(assert) {
  VotingGame.reset();
  VotingGame.start();
	var votesNum = $("#votesNumText");
	var votesPS = $("#votesPerSecText");

	assert.equal(votesNum.text(), "0", "Number of votes is 0");
	assert.equal(votesPS.text(), "(0 קולות לשנייה)", "Votes per second is 0");

});
