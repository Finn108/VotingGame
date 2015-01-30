var VotingGame = (function (VG) {
  "use strict";
  
  if (! VG.effects) VG.effects = {};

  VG.effects.genNoteToss = function (generator) {
  	/*
  	Throws a voting note from the generator to the voting box
  	*/
    var miniNote = VG.effects.cloneNote(false);
    var button = $("#gen" + generator.id);
    var tossZone = $("#noteTossZone");
    var votingBox = $("#votingBox").find("img");

    miniNote.css("transform", "scale(0.2) rotate(130deg)");
    // Create the note relative to the button position
    miniNote.css("top", button.offset().top - 45);
    miniNote.css("left", button.offset().left + 152);

    miniNote.appendTo(tossZone);

    var targetPosition = {
      left: votingBox.offset().left + 200,
      top: votingBox.offset().top,
    };

    miniNote.animate(targetPosition, 600, "swing", function (){
      miniNote.remove();
    });

  };

  return VG;
})(VotingGame || {});
