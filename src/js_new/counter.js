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
			$(VC).trigger("votesChanged", currentVotes);
			previousVotes = currentVotes;
		}

	}
  
  VC.addVotes = function (numOfVotes) {
		currentVotes += numOfVotes;
		refreshDisplay();
  };

  VC.removeVotes = function (numOfVotes) {
      currentVotes -= numOfVotes;
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

  VC.revealCounter = function () {
    /*
    Fades the counter in. Uses the votesDisplay parent since there are
    two different parts
    */
    votesDisplay.parent().fadeIn();
  };

  VC.addVotesPerSecond = function (numOfVPS) {
    votesPerSecond += numOfVPS;
    refreshDisplay();
  };

  VC.removeVotesPerSecond = function (numOfVPS) {
    votesPerSecond -= numOfVPS;
    refreshDisplay();
  };

  VC.getVotesPerSecond = function () {
    return votesPerSecond;
  };

  VC.revealVPS = function () {
    /*
    Fades the votes per second in.
    */
    votesPSDisplay.fadeIn();
  }; 

  return VG;
})(VotingGame || {});
