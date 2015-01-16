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
  var bought = false;
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
    jqUpgrade.disableSelection();
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
    var innerNote = upgradeElem.children().first();
    var envelope = upgradeElem.children().last();
    innerNote.css("right", "-100%");
    envelope.css("right", "-100%");
    upgradeElem.css("display", "");

    envelope.animate({right: "34px"}, 900, "easeOutQuad", function () {
      innerNote.animate({right: "0%"}, 1200, "easeInOutCubic");
      setTimeout(function () {
        envelope.animate({right: "0%"}, 600);
      }, 700);
    });
    // Listen to click and vote change events
	  upgradeElem.on("click", upgrade.buy);
    $(game.votesCounter).on("votesChanged", checkPurchasable);
  }

  function hide() {
    /*
    Hides the upgrade. Will be a lot more dramatic
    */
    var innerNote = upgradeElem.children().first();
    var envelope = upgradeElem.children().last();

    envelope.animate({right: "+=53px"}, 400, "swing", function () {
      innerNote.animate({right: "-100%"}, 1200, "easeInOutQuad", function (){
        envelope.animate({right: "-100%"}, 600);
      });
    });
    /*
    No reason to keep listening after we're out -
    BUT currently afraid it will mess shit up...
    */
	  //upgradeElem.off("click", upgrade.buy);
    //$(game.votesCounter).off("votesChanged", checkPurchasable);
  }

  this.buy = function() {
		/*
		Buys an instance of the upgrade and runs the upgrade function on the game
    object
		*/
    if (bought) return;
		if (game.votesCounter.getVotes() < price) return;
    bought = true;
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
