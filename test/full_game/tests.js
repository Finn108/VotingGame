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

QUnit.test("20 clicks to get Voter", function(assert) {
	var done = assert.async();
	var game = startGame();
	var note = $("#note");
	var voterBtn = $("#genVoter");
	var results = $("#votesNumText");
	for (i = 0; i < 20; i++) {
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

QUnit.module("Buy event tests");
QUnit.test("VPS counter appears after 4 Voters", function(assert) {
  var done = assert.async();
  var game = new Game();
  game.reset(true);
  game.start();
  var note = $("#note");
  var voterBtn = $("#genVoter");
  var votesDisplay = $("#votesNumText");
  var vpsDisplay = $("#votesPerSecText");
  assert.ok(! vpsDisplay.is(":visible"), "VPS invisible at start");
  for (i = 0; i < 175; i++) note.click();
  setTimeout(function () {
    assert.ok(! vpsDisplay.is(":visible"), "VPS invisible after many clicks");
    for (c = 0; c < 5; c++) voterBtn.click();
    setTimeout(function () {
      console.log(vpsDisplay.text());
      assert.ok(
        vpsDisplay.is(":visible"),
        "VPS visible at 1VPS"
      );
      done();
    }, 50);
  }, 50);
});

QUnit.module("Game object function tests");
QUnit.test("getGenById", function(assert) {
	var game = startGame();
	var voterGen = game.getGenById("Voter");
	assert.equal(voterGen.id, "Voter");
});