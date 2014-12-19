/*
Cool little game for the upcoming elections!

Created by Finn108 & nice-shot

Copyright 2014 or something...

Version 0.1.0
*/
 
// Some small and helpful functions

function addCommas(num) {
	/*
	Seperates big numbers with commas. For example:
	> addCommas(2345262)
	2,345,262
	*/

	var numStr = String(Math.floor(num));
	var numSepRgx = /(\d+)(\d{3})/;
	while (numSepRgx.test(numStr)) {
		numStr = numStr.replace(numSepRgx, '$1' + ',' + '$2');
	}
	return numStr;
}

function numNames(num) {
	/*
	Converts a given number to a readable name. For example:
	> numNames(10340210)
	10.34 Million // (in hebrew)
	*/

	// Nothing to edit
	if (num < 1000) return num;

	// No need to add names, just commas
	if (num < 1000000) return addCommas(num);

	var rangeNames = [
		"אלף",
		"מיליון",
		"מיליארד",
		"ביליון",
		"ביליארד",
		"טריליון",
		"טריליארד"
	];
	var thousandsCount = 0;
	var numDivided = num;
	while (numDivided > 1000) {
		numDivided=numDivided/1000;
		thousandsCount++;
	}
	var numInRange = num / Math.pow(1000, thousandsCount)
	return numInRange.toFixed(3) + " " + rangeNames[thousandsCount-1];
}

// Main Classes

function VotesCounter(initialVotes, votesPerSecond) {
	/*
	Handles changing the number of votes and votes per second and displaying
	them.
	*/
	var currentVotes = initialVotes || 0;
	var votesPerSecond = votesPerSecond || 0;
	var votesDisplay = $("#votesNumText");
	var votesPSDisplay = $("#votesPerSecText");

	// Used to configure the games 'tick' rate
	var frameRate = 25;
	var miliseconds = 40;

	// Used to refrence VotesCounter in nested functions
	var votesCounter = this;

	function refreshDisplay() {
		/*
		Writes the current votes and votes-per-second count to the screen
		*/
		votesDisplay.text(numNames(currentVotes));
		votesPSDisplay.text("(" + numNames(votesPerSecond) + " קולות לשנייה)");
	}

	function updateVotes () {
		currentVotes += (votesPerSecond / frameRate);
		refreshDisplay();
	}

	this.addVotes = function (numOfVotes) {
		currentVotes += numOfVotes;
		refreshDisplay();
	}

	this.addVotesPerSecond = function (numOfVotesPS) {
		votesPerSecond += numOfVotesPS;
		refreshDisplay();
	}

	setInterval(updateVotes, miliseconds);
}


function Generator(votesCounter, generatorsDiv, details) {
	/*
	generatorsDiv - jQuery of the generators container div ( $("#geneartors") )
	details - an object with the necessary details about this generator.
		Example:
		{
			id: "Voter",
			name: "voter",
			description: "He'll always vote for you!",
			price: 5,
			picture: "voter.png",
			summary: "Adds +5 every second",
		}
	*/
	console.log("creating generator: " + details.id)

	this.init = function() {
		/*
		Creates the html element for the generator. Returns the button element
		as a jQuery object.
		*/
		var btnElem = document.createElement("div");
		var imgElem = document.createElement("img");
		var priceElem = document.createElement("div");
		var descElem = document.createElement("div");
		var levelElem = document.createElement("div");
		var summaryElem = document.createElement("div");
		var summaryTextElem = document.createElement("p");
		var priceStr = numNames(details.price)

		btnElem.id = "gen" + details.id;
		btnElem.className = "genBtn";

		imgElem.src = "assets/" + details.picture;
		imgElem.className = "genBtnPic";

		priceElem.className = "genBtnPrice";
		priceElem.textContent = details.name + " - " + priceStr + "₪";

		descElem.className = "genBtnDesc";
		descElem.innerHTML = details.description;

		levelElem.className = "genBtnLvl";
		levelElem.textContent = 0;

		summaryElem.className = "genBtnSummary";
		summaryTextElem.textContent = details.summary;
		summaryElem.appendChild(summaryTextElem);

		var jqBtn = $(btnElem);
		jqBtn.append([imgElem, priceElem, descElem, levelElem, summaryElem]);
		generatorsDiv.append(jqBtn);
		return jqBtn;
	}

	this.btn = this.init()

	console.log("finished creating generator")
};


function Game() {
	"use strict";

	var votesCounter = new VotesCounter();

	var votesClickValue = 500;
	var generators = []

	function clickEvent () {
		votesCounter.addVotes(votesClickValue);
	}

	this.reset = function() {
		console.log("reseting");

		// Attach click event to vote note
		$("#noteImg").on("click", clickEvent);

		// Create generators:
		var gensDiv = $("#generators");
		generatorsDetails.forEach(function (item) {
			generators.push(new Generator(votesClickValue, gensDiv, item));
		});
		//$.getJSON("js/generators.json", function(data) {
		//	console.log(data)
		//});

	}

	this.start = function() {
		console.log("starting");
	}
}

$(document).ready(function() {
	var game = new Game();
	game.reset();
	game.start();
});
