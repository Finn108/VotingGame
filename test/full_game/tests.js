QUnit.module("Click tests");
QUnit.test("single click test", function(assert) {
	var note = $("#noteImg");
	var results = $("#votesNumText");
	note.click();
	assert.equal(results.text(), "1");
});

QUnit.test("10 clicks to get Voter", function(assert) {
	var done = assert.async();
	var note = $("#noteImg");
	var voterBtn = $("#genVoter");
	var results = $("#votesNumText");
	for (i = 0; i < 10; i++) {
		note.click();
	}
	setTimeout(function () {
		assert.ok(voterBtn.hasClass("genBtnAvailable"));
		done();
	}, 50);
});
