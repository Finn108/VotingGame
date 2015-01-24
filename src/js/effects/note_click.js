var VotingGame = (function (VG) {
  "use strict";

  $("#mainNote").click(function () {
  	var miniNote = this.clone();
  	// Add the textarea data (jquery doesn't clone this by default)
  	miniNote.children().last().val(this.children().last().val());
  	miniNote.removeClass("noanim anim tilt");
	miniNote

  });

  return VG;
})(VotingGame || {});
