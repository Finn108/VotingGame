function startGame() {
	var game = new Game();
	game.reset();
	game.start();
	return game;
}

QUnit.module("Click tests");
QUnit.test("single click test", function(assert) {
	var game = startGame();
	var note = $("#note");
	var results = $("#votesNumText");
	note.click();
	assert.equal(results.text(), "1", "Click should increase points");
});

QUnit.test("10 clicks to get Voter", function(assert) {
	var done = assert.async();
	var game = startGame();
	var note = $("#note");
	var voterBtn = $("#genVoter");
	var results = $("#votesNumText");
	for (i = 0; i < 10; i++) {
		note.click();
	}
	setTimeout(function () {
		assert.ok(
			voterBtn.hasClass("genBtnAvailable"),
			"Voter is available to purchase"
		);
		done();
	}, 50);
});
