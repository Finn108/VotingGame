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
  }
];

QUnit.test("buy basic upgrade", function(assert) {
  var game = new Game();
  game.reset(true, 5);
  game.start();

  $("#upgradeUpg1").click();
  assert.equal(
    $("#votesNumText").text(),
    "1",
    "Upgrade should leave one point"
  );
});
