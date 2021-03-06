var noteRotateMatrixRe = /matrix\(0.99619\d+\, 0\.08715\d+\, -0\.08715\d+\, 0\.99619\d+\, -104\, 0\)/;

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
  VotingGame.reset();
  VotingGame._opening();

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

  VotingGame.reset();
  VotingGame._opening();

  assert.ok(! noteHint.is(":visible"), "Hint should be invisible at first");

  setTimeout(function() {
    assert.equal(
      noteHint.text(),
      "הקלד את אותיות המפלגה החדשה שלך",
      "First hint text"
    );
    assert.ok(noteHint.is(":visible"), "First hint visible");
    enterValue("title");

    setTimeout(function() {
      assert.equal(
        noteHint.text(),
        "הקלד את שם המפלגה החדשה שלך",
        "Second hint text"
      );

      enterValue("description");

      setTimeout(function() {
        assert.equal(
          noteHint.text(),
          "לחץ כדי להצביע",
          "Third hint text"
        );

        $("#note").click();

        setTimeout(function() {
          assert.ok(
            ! noteHint.is(":visible"),
            "Third hint hide after note click"
          );
          done();
        }, 700);
      }, 1500);
    }, 1000);
  }, 3800);
});

QUnit.test("level title display", function(assert) {
  "use strict";
  var done = assert.async();
  var titleBox = $("#levelTitle");

  VotingGame.reset();
  VotingGame._opening();

  assert.ok(! titleBox.is(":visible"), "Title should be invisible at first");

  setTimeout(function() {
    enterValue("title");
    setTimeout(function() {
      enterValue("description");
      assert.ok(
        ! titleBox.is(":visible"),
        "Title should still be invisible"
      );
      setTimeout(function() {
        assert.ok(
          titleBox.is(":visible"),
          "Title should appear after party name"
        );

        assert.equal(
          titleBox.children().first().text(),
          "במרוץ לראשות וועד הבית",
          "first level text"
        );
        done();
      }, 2000);
    }, 1000);
  }, 3800);
});

QUnit.test("skip opening", function(assert) {
  "use strict";
  var done = assert.async();
  VotingGame.reset();
  VotingGame._openingSkip();

  setTimeout(function() {
    assert.ok(! $("hintBox").is(":visible"), "No hints");
    assert.ok($("#levelTitle").is(":visible"), "Title is visible");
    assert.ok(
      noteRotateMatrixRe.test($("#note").css("transform")),
      "Note tilted"
    );
    assert.ok($("#noteTitle").val().length !== 0);
    assert.ok($("#noteSubtitle").val().length !== 0);
    done();
  }, 1200);

});
