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
	var price = details.price;
	var upgradeFunc = details.func;
  var displayed = false;
  var purchaseable = false;
  // Reference this in nested functions:
  var upgrade = this;
  // Public varriables
  this.id = details.id;


	function initElement() {
		/*
		Creates the html element for the upgrader. Returns the button element
		as a jQuery object.
		*/
		var upgradeElem = document.createElement("div");
		upgradeElem.className = "upgrade";
    upgradeElem.style.display = "none";
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

  function checkPurchasable() {
    /*
    Checks if the upgrade can be purchased and changes the class accordingly
    */
    if (price >= game.votesCounter.getVotes()) {
      upgradeElem.removeClass("activated");
      upgradeElem.addClass("deactivated");
    }
    else {
      upgradeElem.removeClass("deactivated");
      upgradeElem.addClass("activated");
    }
  }

  function show() {
    /*
    Display the upgrade. Will be a lot more dramatic
    */
    upgradeElem.fadeIn();
    // Listen to click and vote change events
	  upgradeElem.on("click", upgrade.buy);
    $(game.votesCounter).on("votesChanged", checkPurchasable);
  }

  function hide() {
    /*
    Hides the upgrade. Will be a lot more dramatic
    */
    upgradeElem.fadeOut();
    /*
    No reason to keep listening after we're out -
    BUT currently afraid it will mess shit up...
    */
	  //upgradeElem.off("click", upgrade.buy);
    //$(game.votesCounter).off("votesChanged", checkPurchasable);
  }

  this.buy = function() {
		/*
		Buys an instance of the generator and updates the votesPerSecond,
		totalVotes and numberOfGenerators
		*/
		if (game.votesCounter.getVotes() < price) return;
		game.votesCounter.removeVotes(price);
		upgradeFunc(game);
    hide();
	};

  this.display = function(game) {
    /*
    Sets the upgrade to display once additional dependencies have been met
    */
    upgrade.displayed = true;
    show();
    return;
  };

  this.wasDisplayed = function() {
    /*
    Returns whether the upgrade was ever displayed or not. 
    */
    return displayed;
  };

}
