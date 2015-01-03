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
	}
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
            Display the upgrades sidebar
            */
			$("#upgrades").toggle("drop", {direction:"down"}, 1000);
		}
	},
	Cookie: {
		3: function (game) {
			alert("Yeah!");
		}
	}
};
