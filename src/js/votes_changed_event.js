var VotingGame = (function (VG) {
  "use strict";

	function votesChangedEvent(event, currentVotes) {
    /*
    Every time the votes change we iterate over the configured vote events and
    run every event that was ment for the current vote number or a vote
    number lower than the current.
    Additionally we update the game state with the current Votes
    */
    VG._gameState.votes = currentVotes;
    var voteEvents = VG._events.voteEvents;
    var pointer = VG._currentVoteEvent;

    if (pointer >= voteEvents.length) {
			return;
		}

		while (pointer < voteEvents.length &&
           currentVotes >= voteEvents[pointer].vote) {
			var currentEvent = voteEvents[pointer];
      VG._currentVoteEvent = ++pointer;
			currentEvent.func(VG);
		}
	}

  $(VG.votesCounter).on("votesChanged", votesChangedEvent);

  return VG;
})(VotingGame || {});
