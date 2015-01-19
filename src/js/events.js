var VotingGame = (function (VG) {
  "use strict";

  VG._events = VG._eventsDefault = {};

  // Events that happen because of points change
  VG._events.voteEvents = [
    {
      vote: 3,
      func: function (game) {
        game.votesCounter.revealCounter();
      }
    },
	{
      vote: 50,
      func: function (game) {
        var upgrade = game.getUpgById("Clicker2");
        upgrade.display();
      }
    },
	{
      vote: 100,
      func: function (game) {
        var upgrade = game.getUpgById("Clicker3");
        upgrade.display();
      }
    },
    {
      vote: 170,
      func: function (game) {
        game.goUpLevel();
      }
    },
	{
      vote: 500,
      func: function (game) {
        var upgrade = game.getUpgById("Clicker4");
        upgrade.display();
      }
    },
    {
      vote: 26216,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 8268400,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 7284000000,
      func: function (game) {
        game.goUpLevel();
      }
    },
    {
      vote: 1000000000000,
      func: function (game) {
        game.goUpLevel();
      }
    }
  ];

  // Events that occur after a purchase of a generator
  // They are arranged: genBuyEvents[genId][numOfBuys]
  VG._events.genBuyEvents = {
    Voter: {
      1: function (game) {
        game.votesCounter.revealVPS();
      },
      3: function (game) {
        /*
        Display the upgrades sidebar + add the first upgrade
        */
        $("#upgrades").toggle("drop", {direction:"down"}, 1000);
        var upgrade = game.getUpgById("Clicker1");
		var upgrade2 = game.getUpgById("Voter1");
        // wait for the upgrades bar to load
        setTimeout(upgrade.display, 1500);
		upgrade2.display();
      },
	  6: function (game) {
        var upgrade = game.getUpgById("Voter2");
        upgrade.display();
      },
	  20: function (game) {
        var upgrade = game.getUpgById("Voter3");
        upgrade.display();
      },
	  40: function (game) {
        var upgrade = game.getUpgById("Voter4");
        upgrade.display();
      },
      50: function (game) {
        var upgrade = game.getUpgById("Voter5");
        upgrade.display();
      },
      55: function (game) {
        var upgrade = game.getUpgById("Voter6");
        upgrade.display();
      }
    },
  	Cookie: {
		1: function (game) {
			var upgrade = game.getUpgById("Cookie1");
			upgrade.display();
		},
		5: function (game) {
			var upgrade = game.getUpgById("Cookie2");
			upgrade.display();
		},
		10: function (game) {
			var upgrade = game.getUpgById("Cookie3");
			upgrade.display();
		},
		15: function (game) {
			var upgrade = game.getUpgById("Cookie4");
			upgrade.display();
		},
		20: function (game) {
			var upgrade = game.getUpgById("Cookie5");
			upgrade.display();
		},
		30: function (game) {
			var upgrade = game.getUpgById("Cookie6");
			upgrade.display();
		},
		40: function (game) {
			var upgrade = game.getUpgById("Cookie7");
			upgrade.display();
		},
		50: function (game) {
			var upgrade = game.getUpgById("Cookie8");
			upgrade.display();
		},
		60: function (game) {
			var upgrade = game.getUpgById("Cookie9");
			upgrade.display();
		}
	},
  	Campaign: {
		1: function (game) {
			var upgrade = game.getUpgById("Campaign1");
			upgrade.display();
		},
		5: function (game) {
			var upgrade = game.getUpgById("Campaign2");
			upgrade.display();
		},
		10: function (game) {
			var upgrade = game.getUpgById("Campaign3");
			upgrade.display();
		},
		15: function (game) {
			var upgrade = game.getUpgById("Campaign4");
			upgrade.display();
		},
		20: function (game) {
			var upgrade = game.getUpgById("Campaign5");
			upgrade.display();
		},
		30: function (game) {
			var upgrade = game.getUpgById("Campaign6");
			upgrade.display();
		},
		40: function (game) {
			var upgrade = game.getUpgById("Campaign7");
			upgrade.display();
		},
		50: function (game) {
			var upgrade = game.getUpgById("Campaign8");
			upgrade.display();
		}
	},
	Rabi: {
		1: function (game) {
			var upgrade = game.getUpgById("Rabi1");
			upgrade.display();
		},
		5: function (game) {
			var upgrade = game.getUpgById("Rabi2");
			upgrade.display();
		},
		10: function (game) {
			var upgrade = game.getUpgById("Rabi3");
			upgrade.display();
		},
		15: function (game) {
			var upgrade = game.getUpgById("Rabi4");
			upgrade.display();
		},
		20: function (game) {
			var upgrade = game.getUpgById("Rabi5");
			upgrade.display();
		},
		30: function (game) {
			var upgrade = game.getUpgById("Rabi6");
			upgrade.display();
		},
		40: function (game) {
			var upgrade = game.getUpgById("Rabi7");
			upgrade.display();
		}
	},
	Gays: {
		1: function (game) {
			var upgrade = game.getUpgById("Gays1");
			upgrade.display();
		},
		5: function (game) {
			var upgrade = game.getUpgById("Gays2");
			upgrade.display();
		},
		10: function (game) {
			var upgrade = game.getUpgById("Gays3");
			upgrade.display();
		},
		15: function (game) {
			var upgrade = game.getUpgById("Gays4");
			upgrade.display();
		},
		20: function (game) {
			var upgrade = game.getUpgById("Gays5");
			upgrade.display();
		},
		30: function (game) {
			var upgrade = game.getUpgById("Gays6");
			upgrade.display();
		}
	}
  };

  return VG;
})(VotingGame || {});
