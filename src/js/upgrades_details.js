/*
Details for the different upgrades. Might be seperated to a few files in the
future depends on how complex the upgrades will become.
*/

var upgradesDetails = [
	{
		id: "ClickPlus1",
		name: "שדרוג קליק",
		price: 10,
		description: "כל קליק שווה פי 2",
		func: function(game) {
			game.votesClickValue ++;
		},
	},
	{
		id: "VoterEachSecond",
		name: "שדרוג מצביע",
		price: 9,
		description: "מצביעים עכשיו הולכים לקלפי כל שנייה",
		func: function (game) {
			var voterGenerator = $.grep(game.generators, function(item) { 
				return item.id === "Voter";
			})[0];
 
			voterGenerator.updateVotesPerSecond(1);
		},
	},
];
