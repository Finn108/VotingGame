/*
The event class and its derivitives. These objects are in charge of finding new occurrences and making changes according to them.
*/

// Events that happen because of points change
var voteEvents = [
	{
		vote: 3,
		func: function (game) {
			console.log("event for 3 votes");
      console.log(game.votesCounter);
      game.votesCounter.revealCounter();
		}
	}
];
