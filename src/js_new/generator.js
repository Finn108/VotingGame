var VotingGame = (function (VG) {
  "use strict";

  VG._Generator = function (details, votesCounter, generatorsDiv) {
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
      }
    - votesCounter: The votes counter object that the generator will update
    - generatorsDiv: jQuery of the generators container div - $("#geneartors")
    */

    // Private attributes
    var button = initElement();
    var price = details.price;
    var name = details.name;
    var votesPerSecond = details.votesPerSec;
    var level = details.level || 0;
    // Show the generator if the details state he was already revealed
    if (details.shown) this.reveal();

    // Used to reference the Generator within nested functions
    var generator = this;

    // Public attributes
    this.id = details.id;
    this.peekedIn = false;
    this.visible = false;

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
        imgElem.src = "assets/" + details.picture;
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

    function buy() {
      /*
      Buys an instance of the generator and updates the votesPerSecond,
      totalVotes and numberOfGenerators
      */
      if (votesCounter.getVotes() < price) return;
      votesCounter.removeVotes(price);
      votesCounter.addVotesPerSecond(votesPerSecond);
      price = Math.floor(price * 1.3);
      level += 1;
      updateDisplay();
      $(generator).trigger("buy", generator);
    }

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
    };

    this.updateVotesPerSecond = function (newVPS) {
      /*
      Changes the votes per second to the given value. Updates the global
      votes per second accordingly.
      - newVPS can be either a number to set the votes per second to or a
        statement to run with the current votesPerSecond. For example:
        > generator.updateVotesPerSecond("- 3");
      */
      var currentTotalVPS = votesPerSecond * level;

      if (typeof(newVPS) === "number") {
        votesPerSecond = newVPS;
      }
      else if (typeof(newVPS) === "string") {
        /* jshint -W061 */
        votesPerSecond = eval(votesPerSecond + newVPS);
      }
      else {
        console.log("couldn't update votes on " + generator.id);
        return;
      }

      var newTotalVPS = votesPerSecond * level;
      votesCounter.removeVotesPerSecond(currentTotalVPS);
      votesCounter.addVotesPerSecond(newTotalVPS);
      updateDisplay();
    };

    this.peekIn = function () {
      /*
      Moves the button to the screen just a tiny bit
      */
      button.show();
      button.animate({left: "+=20px"}, 1000, "easeOutCubic");
      generator.peekedIn = true;
    };

    this.reveal = function () {
      /*
      Moves the entire button to the screen
      */
      button.animate({left: "0%"}, 2000, "easeOutCubic");
      generator.visible = true;
    };

    this.getLevel = function () {
      return level;
    };

    // Update immediately after creation
    updateDisplay();
    button.on("click", buy);
    $(votesCounter).on("votesChanged", function () {
      if (generator.visible) return;

      var currentVotes = votesCounter.getVotes();

      // Peek in when the current number of votes reaches 70%
      if (! generator.peekedIn && currentVotes >= (price * 7) / 10) {
        generator.peekIn();
      }

      if (currentVotes >= price) generator.reveal();

    });

  };

  return VG;
})(VotingGame || {});
