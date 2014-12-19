/*
Cool little game for the upcoming elections!

Created by Finn108 & nice-shot

Copyright 2014 or something...

Version 0.1.0
*/

function Generator(generatorsDiv, details) {
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
	console.log("started creating generator")
	

	/* Creates the html element for the generator */
	this.init = function() {
		var btnElem = document.createElement("div");
		var imgElem = document.createElement("img");
		var priceElem = document.createElement("div");
		var descElem = document.createElement("div");
		var levelElem = document.createElement("div");
		var summaryElem = document.createElement("div");
		var summaryTextElem = document.createElement("p");

		btnElem.id = "gen" + details.id;
		btnElem.className = "genBtn";

		imgElem.src = "assets/" + details.picture;
		imgElem.className = "genBtnPic";

		priceElem.className = "genBtnPrice";
		priceElem.textContent = details.name + " - " + details.price + "₪";

		descElem.className = "genBtnDesc";
		descElem.textContent = details.description;

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

	var votes = 0;
	var votesPerSecond = 0;
	var votesClickValue = 1;
	var generators = []

	var displayVotes = function() {
		$("#votesNumText").text(votes)
	}
	var clickEvent = function() {
		votes += votesClickValue;
		displayVotes();
	}
	

	this.reset = function() {
		console.log("reseting");

		// Attach click event to vote note
		$("#noteImg").on("click", clickEvent);

		// Create generators:
		var gensDiv = $("#generators");
		generatorsDetails.forEach(function (item) {
			generators.push(new Generator(gensDiv, item));
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
