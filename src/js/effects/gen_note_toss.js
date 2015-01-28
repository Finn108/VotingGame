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

    miniNote.css("transform", "scale(0.2) rotate(130deg)");
    miniNote.css("left", "61px");
    miniNote.css("top", "-62px");

    miniNote.appendTo(tossZone);

    miniNote.animate({left: "400px", top: "440px"});

  };

  return VG;
})(VotingGame || {});
