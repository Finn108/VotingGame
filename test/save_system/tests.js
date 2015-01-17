QUnit.test("test _validateGameState", function (assert) {
  var defaultGameState = {
    level: 0,
    votes: 0,
    skipIntro: false,
    noteTitle: "",
    noteDesc: "",
    generators: {},
    upgrades: {},
  };

  assert.deepEqual(
    VotingGame._validateGameState({}),
    defaultGameState,
    "No game state should return default"
  );

  defaultGameState.skipIntro = true;
  assert.deepEqual(
    VotingGame._validateGameState({skipIntro: true}),
    defaultGameState,
    "Giving one argument still returns a full state"
  );

  var specailState = {
    level: 3,
    votes: 23423,
    noteDesc: "Hello",
    noteTitle: "Again",
    babba: "what is this?!",
    bibbibi: "An argument for ANTS?",
  };

  assert.deepEqual(
      VotingGame._validateGameState(specailState),
      {
        level: 3,
        votes: 23423,
        skipIntro: false,
        noteTitle: "Again",
        noteDesc: "Hello",
        generators: {},
        upgrades: {},
      },
      "Unnecessary arguments are thrown out"
  );
});

QUnit.test("cookie creation and load", function (assert) {
  $.cookie("GS", "");
  VotingGame.reset();

  var defaultGameState = {
    level: 0,
    votes: 0,
    skipIntro: false,
    noteTitle: "",
    noteDesc: "",
    generators: {},
    upgrades: {},
  };

  assert.deepEqual(VotingGame._load(), defaultGameState);
});

QUnit.test("remember state", function (assert) {
  var done = assert.async();
  $.cookie("GS", "");
  VotingGame.reset({skipIntro: true});
  VotingGame.start();

  for (var i=0; i < 50; i++) $("#note").click();

  setTimeout(function () {
    assert.equal(VotingGame._load().votes, 50);
    done();
  }, 100);

});
