/*
Creates the votesCounter attribute that handles changing the number of votes
and votes per second and displaying them.
*/
var VotingGame = (function (VG) {
  "use strict";
  
  var VC = VG.votesCounter = {};

	var currentVotes = 0;
	var previousVotes = currentVotes; // Used for event triggers
	var votesPerSecond = 0;
	var votesDisplay = $("#votesNumText");
	var votesPSDisplay = $("#votesPerSecText");

	function refreshDisplay() {
		/*
		Writes the current votes and votes-per-second count to the screen
		*/
		votesDisplay.text(VG.numNames(currentVotes));
		votesPSDisplay.text("(" + VG.numNames(votesPerSecond) + " קולות לשנייה)");
		if (previousVotes !== currentVotes) {
			$(VC).trigger("votesChanged");
			previousVotes = currentVotes;
		}

	}
  
  VC.addVotes = function (numOfVotes) {
		currentVotes += numOfVotes;
		refreshDisplay();
  };

  VC.updateVotes = function (frameRate) {
		/*
		This method is supposed to run in every `tick` of the game to properly
		update the votes number based on the votes per second.
		*/
		currentVotes += (votesPerSecond / frameRate);
		refreshDisplay();
	};

  VC.getVotes = function () {
    return currentVotes;
  };
  
  //TODO Remove this thing the minute all of the vote counter's attributes are
  //in place
  function VotesCounter(initialVotes, initialVotesPerSecond) {

    // Private attributes
    var currentVotes = initialVotes || 0;
    var previousVotes = currentVotes; // Used for event triggers
    var votesPerSecond = initialVotesPerSecond || 0;
    var votesDisplay = $("#votesNumText");
    var votesPSDisplay = $("#votesPerSecText");

    // Reference self from nested functions
    var counter = this;

    // Private methods

    // Public methods
    this.updateVotes = function(frameRate) {
      /*
      This method is supposed to run in every `tick` of the game to properly
      update the votes number
      */
      currentVotes += (votesPerSecond / frameRate);
      refreshDisplay();
    };

    this.addVotes = function(numOfVotes) {
      currentVotes += numOfVotes;
      refreshDisplay();
    };

    this.removeVotes = function(numOfVotes) {
      currentVotes -= numOfVotes;
      refreshDisplay();
    };

    this.getVotes = function() {
      return currentVotes;
    };

    this.addVotesPerSecond = function (numOfVPS) {
      votesPerSecond += numOfVPS;
      refreshDisplay();
    };

    this.removeVotesPerSecond = function (numOfVPS) {
      votesPerSecond -= numOfVPS;
      refreshDisplay();
    };

    this.getVotesPerSecond = function () {
      return votesPerSecond;
    };

    this.revealCounter = function() {
      /*
      Fades the counter in. Uses the votesDisplay parent since there are
      two different parts
      */
      votesDisplay.parent().fadeIn();
    };

    this.revealVPS = function() {
      /*
      Fades the votes per second in.
      */
      votesPSDisplay.fadeIn();
    };
  }
  

  return VG;
})(VotingGame || {});
