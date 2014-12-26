var noteRotateMatrixRe = /matrix\(0.99619\d+\, 0\.08715\d+\, -0\.08715\d+\, 0\.99619\d+\, -104\, -148\)/;

function enterValue(field) {
	/*
	Inserts data into the selected element and presses 'enter'
	*/
	var inputData;
	var selected = $(document.activeElement);

	switch(field) {
		case "title":
			inputData = "שקר";
			break;
		case "description":
			inputData = "מפלגת הכל שקרים";
			break;
	}

	selected.val(inputData);
	selected.trigger( $.Event("keydown", { which: 13 }));
}


QUnit.test("card rotates after name and title input", function(assert) {
	"use strict";
	var done = assert.async();

	// Start the opening sequence
	openingSequence();

	setTimeout(function() {
		assert.equal(
			document.activeElement.id,
			"noteTitle",
			"Note name is selected"
		);
		enterValue("title");

		assert.equal(
			document.activeElement.id,
			"noteSubtitle",
			"Note description is selected"
		);

		enterValue("description");

		setTimeout( function() {
			var note = $("#note");
			assert.ok(
				noteRotateMatrixRe.test(note.css("transform")),
				"Note was tilted"
			);
			done();
		}, 1100);

	}, 1700);
});

QUnit.test("hints display", function(assert){
	"use strict";
	var done = assert.async();
	var noteHint = $("#hintBox");

	openingSequence();

	assert.ok(! noteHint.is(":visible"), "Hint should be invisible at first");

	setTimeout(function() {
		assert.equal(
			noteHint.text(),
			"בבקשה תרשום את אות (או אותיות) המפלגה שלך",
			"First hint text"
		);
		assert.ok(noteHint.is(":visible"), "First hint visible");
		enterValue("title");

		setTimeout(function() {
			assert.ok(
				! noteHint.is(":visible"),
				"Hint should hide after enter"
			);

		}, 700);

		setTimeout(function() {
			assert.equal(
				noteHint.text(),
				"בבקשה תרשום את שם המפלגה שלך",
				"Second hint text"
			);

			assert.ok(noteHint.is(":visible"), "Second hint visible");

			enterValue("description");
			setTimeout(function() {
				assert.ok(
					! noteHint.is(":visible"),
					"Second hint hide after enter"
				);
			}, 700);

			setTimeout(function() {
				assert.equal(
					noteHint.text(),
					"לחץ כדי להצביע",
					"Third hint text"
				);

				assert.ok(noteHint.is(":visible"), "Third hint visible");

				$("#note").click();

				setTimeout(function() {
					assert.ok(
						! noteHint.is(":visible"),
						"Third hint hide after note click"
					);
					done();
				}, 700);
			}, 2500);
		}, 2500);
	}, 3800);
});

QUnit.test("skip opening", function(assert){
	"use strict";
	var done = assert.async();
	skipOpening();

	setTimeout(function() {
		assert.ok(! $("hintBox").is(":visible"), "No hints");
		assert.ok(
			noteRotateMatrixRe.test($("#note").css("transform")),
			"Note tilted"
		);
		assert.ok($("#noteTitle").val().length !== 0);
		assert.ok($("#noteSubtitle").val().length !== 0);
		done();
	}, 1200);

});