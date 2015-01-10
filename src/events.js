/*
The event class and its derivitives. These objects are in charge of finding new
occurrences and making changes according to them.
*/

// Events that happen because of points change
var voteEvents = [
	{
		vote: 3,
		func: function (game) {
			game.votesCounter.revealCounter();
		}
	},
  {
    vote: 170,
    func: function (game) {
      game.goUpLevel();
    }
  },
  {
    // Increase generators div size by a bit to prevent scrollbar intervention
    vote: 45500000,
    func: function (game) {
      console.log("got to new stuff maybe thingy");
      $("#generators").css({width: "362px"});
    }
  },
];

// Events that occur after a purchase of a generator
// They are arranged: genBuyEvents[genId][numOfBuys]
var genBuyEvents = {
	Voter: {
		1: function (game) {
			game.votesCounter.revealVPS();
		},
		6: function (game) {
            /*
            Display the upgrades sidebar + add the first upgrade
            */
			$("#upgrades").toggle("drop", {direction:"down"}, 1000);
      var upgrade = game.getUpgById("ClickPlus1");
      // wait for the upgrades bar to load
      setTimeout(upgrade.display, 1500);
		}
	},
	Cookie: {
		3: function (game) {
			alert("Yeah!");
		}
	}
};
