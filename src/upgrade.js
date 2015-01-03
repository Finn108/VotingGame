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

var isTest = false;

function Upgrade(game, upgradersDiv, details) {
	"use strict";

	console.log("creating upgrader: " + details.id);

	var upgradeElem = initElement();
	var upgradeBtn = upgradeElem.find(".upgradeBtnBuy");
	var price = details.price;
	var upgradeFunc = details.func;

	function initElement() {
		/*
		Creates the html element for the upgrader. Returns the button element
		as a jQuery object.
		*/
		var upgradeElem = document.createElement("div");
		upgradeElem.className = "upgrade";
		upgradeElem.id = "upgrade" + details.id;

		var containerDivElem = document.createElement("div");
		upgradeElem.appendChild(containerDivElem);

		var titleElem = document.createElement("div");
		var priceStr = numNames(details.price);
		titleElem.textContent = details.name + " - " + priceStr + "₪";
		containerDivElem.appendChild(titleElem);

		var descElem = document.createElement("div");
		descElem.textContent = details.description;
		containerDivElem.appendChild(descElem);

		var envelopeElem = document.createElement("img");
		envelopeElem.src = "assets/upgradeEnvelope.png";
		if (isTest) envelopeElem.src = "../../assets/upgradeEnvelope.png";
		upgradeElem.appendChild(envelopeElem);

		var jqUpgrade = $(upgradeElem);
		upgradersDiv.append(jqUpgrade);
		return jqUpgrade;
	}

	function buy() {
		/*
		Buys an instance of the generator and updates the votesPerSecond,
		totalVotes and numberOfGenerators
		*/
		if (game.votesCounter.getVotes() < price) return;
		game.votesCounter.removeVotes(price);
		upgradeFunc(game);
		upgradeElem.fadeOut();
	}

	upgradeBtn.on("click", buy);
}
