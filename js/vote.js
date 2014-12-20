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

	function refreshDisplay() {
		/*
		Writes the current votes and votes-per-second count to the screen
		*/
		votesDisplay.text(numNames(currentVotes));
		votesPSDisplay.text("(" + votesPerSecond + " קולות לשנייה)");
	}

	this.updateVotes = function(frameRate) {
		currentVotes += (votesPerSecond / frameRate);
		refreshDisplay();
	}

	this.addVotes = function(numOfVotes) {
		currentVotes += numOfVotes;
		refreshDisplay();
	}

	this.removeVotes = function(numOfVotes) {
		currentVotes -= numOfVotes;
		refreshDisplay();
	}

	this.getVotes = function() {
		return currentVotes
	}

	this.addVotesPerSecond = function (numOfVotesPS) {
		votesPerSecond += numOfVotesPS;
		refreshDisplay();
	}
}


function Generator(votesCounter, generatorsDiv, details) {
	/*
	A purchasable item that constantly generates votes.

	- generatorsDiv: jQuery of the generators container div ( $("#geneartors") )
	- details: an object with the necessary details about this generator.
		Example:
		{
			id: "Voter",
			name: "voter",
			description: "He'll always vote for you!",
			price: 5,
			picture: "voter.png",
		}
	*/
	console.log("creating generator: " + details.id)

	function initElement() {
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
		summaryTextElem.textContent = ""; // Will be added dynamically later
		summaryElem.appendChild(summaryTextElem);

		var jqBtn = $(btnElem);
		jqBtn.append([imgElem, priceElem, descElem, levelElem, summaryElem]);
		generatorsDiv.append(jqBtn);
		return jqBtn;
	}

	var button = initElement();
	var price = details.price;
	var name = details.name;
	var level = 0;
	var votesPerSecond = details.votesPerSec;
	var votesCounter = votesCounter;

	function updateDisplay() {
		var priceStr = numNames(price);
		var totalVotesPerSecond = votesPerSecond * (level + 1)
		button.find(".genBtnPrice").text(name + " - " + priceStr + "₪");
		button.find(".genBtnLvl").text(level);
		if (totalVotesPerSecond < 1) {
			var waitTime = 1 / totalVotesPerSecond;
			var message = "הצבעה כל " + waitTime + " שניות";
			button.find(".genBtnSummary > p").text(message);
		}
		else {
			var message = totalVotesPerSecond + " הצבעות לשנייה";
			button.find(".genBtnSummary > p").text(message);
		}
	}
	// Update immediately after creation
	updateDisplay();

	function buy() {
		/*
		Buys a instance of the generator and updates the votesPerSecond,
		totalVotes and numberOfGenerators
		*/
		if (votesCounter.getVotes() < price) return;
		votesCounter.removeVotes(price);
		votesCounter.addVotesPerSecond(votesPerSecond);
		price = Math.floor(price * 1.3);
		level += 1;
		updateDisplay();
	}

	button.on("click", buy);

	this.checkAvailability = function() {
		/*
		See if this generator can be bought and change the button class if it
		can be.
		*/
		if (votesCounter.getVotes() >= price) {
			button.addClass("genBtnAvailable");
		}
		else {
			button.removeClass("genBtnAvailable");
		}
	}

};

function Upgrader(game, upgradersDiv, details) {
	/*
	Changes different settings in the game when bought. For instance increasing
	the value of each click.

	- game: The main game object
	- upgradersDiv: jQuery of the div in which upgrades will reside
	- details: an object with the necessary details about this upgrader.
		Example:
		{
			id: "ClickInhancer",
			name: "Click +1!",
			description: "Each click will be worth so much more!",
			price: 30,
			func: function (game) {
				game.votesClickValue ++;
			},
		}
	*/

	console.log("creating upgrader: " + details.id);

	function initElement() {
		/*
		Creates the html element for the upgrader. Returns the button element
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
		summaryTextElem.textContent = ""; // Will be added dynamically later
		summaryElem.appendChild(summaryTextElem);

		var jqBtn = $(btnElem);
		jqBtn.append([imgElem, priceElem, descElem, levelElem, summaryElem]);
		generatorsDiv.append(jqBtn);
		return jqBtn;
	}

	var button = initElement();
}


function Game() {
	"use strict";

	this.votesCounter = new VotesCounter();
	this.votesClickValue = 1;
	this.generators = [];

	// Used to reference the game object from nested functions
	var game = this;

	// Used to configure the games 'tick' rate
	var frameRate = 25;
	var miliseconds = 40;

	function clickEvent () {
		game.votesCounter.addVotes(game.votesClickValue);
	}

	function updateState() {
		/*
		This is the main function that updates the current game state.
		*/
		game.votesCounter.updateVotes(frameRate);
		game.generators.forEach(function (generator) {
			generator.checkAvailability();
		})
	}

	this.reset = function() {
		console.log("reseting");

		// Attach click event to vote note
		$("#noteImg").on("click", clickEvent);

		// Create generators:
		var gensDiv = $("#generators");
		generatorsDetails.forEach(function (item) {
			this.generators.push(new Generator(this.votesCounter,
											   gensDiv,
											   item));
		}, game);
	}

	this.start = function() {
		console.log("starting");
		setInterval(updateState, miliseconds);
	}
}

$(document).ready(function() {
	var game = new Game();
	game.reset();
	game.start();
});
