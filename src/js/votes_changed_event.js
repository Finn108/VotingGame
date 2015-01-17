var VotingGame = (function (VG) {
  "use strict";
  
  var reachedLastvoteEvent = false;

	function votesChangedEvent(event, currentVotes) {
    /*
    Every time the votes change we iterate over the configured vote events and
    run every event that's was ment for the current vote number or a vote
    number lower than the current.
    Additionally we update the game state with the current Votes
    */
    VG._gameState.votes = currentVotes;

		if (reachedLastvoteEvent) return;

    var voteEvents = VG._events.voteEvents;

		if (voteEvents.length === 0) {
			reachedLastvoteEvent = true;
			return;
		}

		while (voteEvents.length > 0 && currentVotes >= voteEvents[0].vote) {
			var currentEvent = voteEvents[0];
			voteEvents.shift();
			currentEvent.func(VG);
		}
	}

  $(VG.votesCounter).on("votesChanged", votesChangedEvent);

  return VG;
})(VotingGame || {});
