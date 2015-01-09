// Replace the actual upgrades with some silly custom ones
var upgradesDetails = [
  {
    id: "Upg1",
    name: "Add one more vote",
    description: "",
    price: 5,
    func: function (game) {
      game.votesCounter.addVotes(1);
    },
  },
  {
    id: "Upg2",
    name: "Click is worth +2",
    description: "",
    price: 5,
    func: function (game) {
      game.votesClickValue += 2;
    }
  }
];

QUnit.test("buy basic upgrade", function(assert) {
  var game = new Game();
  game.reset(true, 5);
  game.start();

  var myUp = game.getUpgById("Upg1");
  myUp.display();
  
  $("#upgradeUpg1").click();
  assert.equal(
    $("#votesNumText").text(),
    "1",
    "Upgrade should leave one point"
  );
});

QUnit.test("can't buy more than once", function(assert) {
  var game = new Game();
  game.reset(true, 20);
  var votesDisplay = $("#votesNumText");
  var note = $("#note");

  note.click();
  assert.equal(votesDisplay.text(), "21", "One click is one vote");

  var myUp = game.getUpgById("Upg2");
  myUp.display();

  for (var i=0; i < 4; i++) {
    $("#upgradeUpg2").click();
  }

  assert.equal(votesDisplay.text(), "16", "Upgrade is only bought once");
  note.click();
  assert.equal(votesDisplay.text(), "19", "One click is three vote");

});
