QUnit.test("initiation test", function(assert) {
	var counter = new VotesCounter();
	var votesNum = $("#votesNumText");
	var votesPS = $("#votesPerSecText");
	counter.updateVotes(45);

	assert.equal(votesNum.text(), "0");
	assert.equal(votesPS.text(), "(0 קולות לשנייה)");

});
