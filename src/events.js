/*
The event class and its derivitives. These objects are in charge of finding new occurrences and making changes according to them.
*/

// Events that happen because of points change
var voteEvents = [
	{
		vote: 1,
		func: function (game) {
			var voterGenerator = $.grep(game.generators, function(item) {
					return item.id === "Voter";
			})[0];
			console.log("event for 1 vote");
		}
	}
];