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

		var buyBtnElem = document.createElement("div");
		buyBtnElem.className = "upgradeBtnBuy";
		buyBtnElem.textContent = "קנה!";

		var boxElem = document.createElement("div");
		boxElem.className = "upgradeBox";

		var titleElem = document.createElement("div");
		var priceStr = numNames(details.price);
		titleElem.className = "upgradeBoxTitle";
		titleElem.textContent = details.name + " - " + priceStr + "₪";
		boxElem.appendChild(titleElem);

		var descElem = document.createElement("div");
		descElem.className = "upgradeBoxDesc";
		descElem.textContent = details.description;
		boxElem.appendChild(descElem);

		var jqUpgrade = $(upgradeElem);
		jqUpgrade.append([buyBtnElem, boxElem]);
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
