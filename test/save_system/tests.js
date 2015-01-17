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
    skipIntro: true,
    noteTitle: "",
    noteDesc: "",
    generators: {},
    upgrades: {},
  };

  assert.deepEqual(VotingGame.load(), defaultGameState);
});

QUnit.test("remember state", function (assert) {
  var done = assert.async();
  $.cookie("GS", "");
  VotingGame.reset({skipIntro: true});
  VotingGame.start();

  for (var i=0; i < 50; i++) $("#note").click();

  setTimeout(function () {
    assert.equal(VotingGame.load().votes, 50);
    done();
  }, 100);

});

QUnit.test("generator appearing at load", function (assert) {
  var done = assert.async();
  var gameState = {
    skipIntro: true,
    votes: 8,
    generators: {
      Voter: {
        shown: true,
        level: 3,
      }
    }
  };

  $.cookie("GS", gameState);
  VotingGame.reset(VotingGame.load());

  setTimeout(function () {
    assert.ok($("#genVoter").is(":visible"));
    done();
  }, 100);


});

QUnit.test("upgrades that were bought shouldn't appear", function (assert) {
  "use strict";
  var done = assert.async();
  var upgradeDetails = [
    {
      id: "ClickPlus1",
      name: "Click Upgrade",
      price: 10,
      description: "Every click is worth on more",
      func: function(game) {
        game.clickValue ++;
      },
    },
  ];

  VotingGame._upgradesDetails = upgradeDetails;
  // Remove vote events to prevent annoying problems
  VotingGame._events.voteEvents = [];
  var gameState = {
    skipIntro: true,
    upgrades: {
      "ClickPlus1": true
    },
    generators: {
      Voter: {
        shown: true,
        level: 10,
      }
    },
    votes: 30
  };

  VotingGame.reset(gameState);
  VotingGame.start();
  setTimeout(function () {
    assert.ok(! $("#upgradeClickPlus1").is(":visible"));
    done();
  }, 1000);
});
