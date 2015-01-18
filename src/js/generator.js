var VotingGame = (function (VG) {
  "use strict";

  VG._Generator = function (details, generatorsDiv) {
    /*
    A purchasable item that constantly generates votes.

    - details: an object with the necessary details about this generator.
      Example:
      {
        id: "Voter",
        name: "voter",
        description: "He'll always vote for you!",
        price: 5,
        picture: "voter.png",
        level: 0, // The amount of generators of this type that were bought
        shown: false,
        // Optional - ID of another generator. Instead of paying with votes
        // it will reduce the number of that generator
        currency: "Cookie",
      }
    - votesCounter: The votes counter object that the generator will update
    - generatorsDiv: jQuery of the generators container div - $("#geneartors")
    */

    // Private attributes
    var votesCounter = VG.votesCounter;
    var button = initElement();
    var price = details.price;
    var currency = details.currency || "vote";
    var name = details.name;
    var votesPerSecond = details.votesPerSec;
    var level = 0;
    var peekedIn = false;
    var visible = false;

    // Used to reference the Generator within nested functions
    var generator = this;

    // Public attributes
    this.id = details.id;

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
      var priceStr = VG.numNames(price);
      var vpsText = VG.numNames(details.votesPerSec) + " הצבעות לשנייה";

      // Change the votes per second text
      if (votesPerSecond < 1) {
        var waitTime = 1 / votesPerSecond;
        vpsText = "הצבעה כל " + waitTime + " שניות";
      }

      btnElem.id = "gen" + details.id;
      btnElem.className = "genBtn";


      // Used for testing
      if (details.picture.indexOf("assets") === -1) {
        imgElem.src = VG._cMainPath + "assets/" + details.picture;
      }
      else {
        imgElem.src = details.picture;
      }
      imgElem.className = "genBtnPic";

      priceElem.className = "genBtnPrice";
      priceElem.textContent = details.name + " - " + priceStr + "₪";

      descElem.className = "genBtnDesc";
      descElem.innerHTML = details.description;

      levelElem.className = "genBtnLvl";
      levelElem.textContent = 0;

      summaryElem.className = "genBtnSummary";
      summaryTextElem.textContent = vpsText;
      summaryElem.appendChild(summaryTextElem);

      var jqBtn = $(btnElem);
      jqBtn.append([imgElem, priceElem, descElem, levelElem, summaryElem]);
      // Prevent annoying selection markers on generators
      jqBtn.disableSelection();
      generatorsDiv.append(jqBtn);
      return jqBtn;
    }

    function updateDisplay() {
      var priceStr = VG.numNames(price);
      var totalVotesPerSecond = votesPerSecond * (level + 1);
      button.find(".genBtnPrice").text(name + " - " + priceStr + "₪");
      button.find(".genBtnLvl").text(level);
    }

    function increaseLevel() {
      /*
      Increases the generator's level, change the VPS and triggers a "buy"
      event
      */
      votesCounter.addVotesPerSecond(votesPerSecond);
      price = Math.floor(price * 1.3);
      level += 1;
      updateDisplay();
      $(generator).trigger("buy", generator);
    }

    function buy() {
      /*
      Buys an instance of the generator and updates the votesPerSecond,
      totalVotes and numberOfGenerators.
      If the currency is not just vote - it updates the relevant generator
      */
      if (votesCounter.getVotes() < price) return;
      if (currency === "vote") {
        votesCounter.removeVotes(price);
      }
      else {
        var currencyGen = VG.getGenById(currency);
        currencyGen.updateLevel("-" + price);
      }
      increaseLevel();
    }

    function checkAvailability (currentVotes) {
      /*
      See if this generator can be bought and change the button class if it
      can be.
      */
      if (currentVotes >= price) {
        button.addClass("genBtnAvailable");
      }
      else {
        button.removeClass("genBtnAvailable");
      }

      // The rest is not relevant if we're already on the screen
      if (visible) return;

      // Peek in when the current number of votes reaches 70%
      if (! peekedIn && currentVotes >= (price * 7) / 10) {
        peekIn();
      }

      if (currentVotes >= price) reveal();
    }

    function peekIn () {
      /*
      Moves the button to the screen just a tiny bit
      */
      button.show();
      button.animate({left: "+=20px"}, 1000, "easeOutCubic");
      peekedIn = true;
    }

    function reveal () {
      /*
      Moves the entire button to the screen
      */
      button.animate({left: "0%"}, 2000, "easeOutCubic");
      visible = true;
      $(generator).trigger("revealed", generator);
    }

    /*******************************/
    /* Run after creation + events */
    /*******************************/

    // Update the level and price immediatly after creation
    updateDisplay();

    button.on("click", buy);

    if (currency === "vote") {
      /*
      Whenever the vote changes we check if we should pop in or if we need to
      change the buy visibality
      */
      $(votesCounter).on("votesChanged", function (event, currentVotes) {
        checkAvailability(currentVotes);
      });
    }
    else {
      /*
      If we're buying other generators - check availability according to their
      status
      */
      generator = VG.getGenById(currency);
      $(generator).on("buy", function (event, gen) {
        var currentLevel = gen.getLevel();
        checkAvailability(currentLevel);
      });
    }
    
    /******************/
    /* Public Methods */
    /******************/

    this.updateVotesPerSecond = function (newVPS) {
      /*
      Changes the votes per second to the given value. Updates the global
      votes per second accordingly.
      - newVPS can be either a number to set the votes per second to or a
        statement to run with the current votesPerSecond. For example:
        > generator.updateVotesPerSecond("- 3");
      */
      var currentTotalVPS = votesPerSecond * level;

      votesPerSecond = VG.updateNumber(votesPerSecond, newVPS);
      if (! votesPerSecond) return;

      var newTotalVPS = votesPerSecond * level;
      votesCounter.removeVotesPerSecond(currentTotalVPS);
      votesCounter.addVotesPerSecond(newTotalVPS);
      updateDisplay();
    };

    this.updatePrice = function (newPrice) {
      /*
      Changes the price of the generator. Can be a number or a string like "/2"
      */
      price = VG.updateNumber(price, newPrice);
      updateDisplay();
    };

    this.getPrice = function () {
      /*
      Returns the generator's price
      */
      return price;
    };

    this.reachTargetLevel = function (targetLevel) {
      /*
      Updates the generator to reach the given level without executing a buy
      so the votes won't change.
      */
      if (targetLevel) {
        for (var i=0; i < targetLevel; i++) {
          increaseLevel();
        }
      }
    };

    this.updateLevel = function (newLevel) {
      /*
      Changes the generator's level but doesn't affect the price. Ment to be
      used when the generator is the currency (for example when Military 
      Operation costs Voters)
      */
      level = VG.updateNumber(level, newLevel);
      updateDisplay();
    };

    this.showButton = function () {
      /*
      Peeks and immediatly reveals the generator button
      */
      peekIn();
      reveal();
    };

    this.getLevel = function () {
      return level;
    };


  };

  return VG;
})(VotingGame || {});
