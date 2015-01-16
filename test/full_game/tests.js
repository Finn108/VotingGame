function startGame(skipIntro) {
	skipIntro = skipIntro || true;
	VotingGame.reset({skipIntro: skipIntro});
	VotingGame.start();
	return VotingGame;
}

QUnit.module("Click tests");
QUnit.test("single click test", function(assert) {
  var done = assert.async();
  startGame();
	var note = $("#note");
	var results = $("#votesNumText");
  // Adding timeout for the fadeIn effect
  setTimeout(function () {
    note.click();
    assert.equal(results.text(), "1", "Click should increase points");
    done();
  }, 100);
});

QUnit.test("20 clicks to get Voter", function(assert) {
	var done = assert.async();
  VG = startGame();
	var note = $("#note");
	var voterBtn = $("#genVoter");
	var results = $("#votesNumText");
  setTimeout(function () {
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
  }, 50);
});

QUnit.module("Buy event tests");
QUnit.test("VPS counter appears after 4 Voters", function(assert) {
	var done = assert.async();
  VG = startGame();
	var note = $("#note");
	var voterBtn = $("#genVoter");
	var votesDisplay = $("#votesNumText");
	var vpsDisplay = $("#votesPerSecText");
	assert.ok(! vpsDisplay.is(":visible"), "VPS invisible at start");
  for (i = 0; i < 175; i++) {
    note.click();
  }
  setTimeout(function () {
    assert.ok(! vpsDisplay.is(":visible"), "VPS invisible after many clicks");
    for (c = 0; c < 5; c++) voterBtn.click();
    setTimeout(function () {
      assert.ok(
        vpsDisplay.is(":visible"),
        "VPS visible at 1VPS"
      );
      done();
    }, 50);
  }, 50);
});

QUnit.test("Upgrades appear after a few voters", function(assert) {
  VG = startGame();
	var note = $("#note");
	var voterBtn = $("#genVoter");
	var voterLvl = voterBtn.find(".genBtnLvl");
	var voterPrice = voterBtn.find(".genBtnPrice");
	var upgradesBar = $("#upgrades");

	// assumes the second Voter buy event is used to display the upgrades
	var necessaryVoters = Object.keys(VG._events.genBuyEvents.Voter)[1];
	assert.ok(! upgradesBar.is(":visible"), "Upgrades invisible at start");
	while (Number(voterLvl.text()) < necessaryVoters) {
		var nextLvlPriceTxt = voterPrice.text().split("-")[1];
		var nextLvlPrice = Number(nextLvlPriceTxt.replace("₪", ""));

		for (var i=0; i < nextLvlPrice; i++) {
			note.click();
		}
		voterBtn.click();
	}

	assert.ok(
		upgradesBar.is(":visible"),
		"Upgrades visible after " + necessaryVoters + " voters"
	);
});

QUnit.module("Game object function tests");
QUnit.test("getGenById", function(assert) {
  VG = startGame();
	var voterGen = VG.getGenById("Voter");
	assert.equal(voterGen.id, "Voter");
});
