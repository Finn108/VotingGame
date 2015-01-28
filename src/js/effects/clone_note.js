var VotingGame = (function (VG) {
  "use strict";
    
  var note = $("#mainNote");
  if (! VG.effects) VG.effects = {};

  VG.effects.cloneNote = function (copyName) {
    /*
    Note is searched once but since it changes we clone it from the current
    state
    */
    var clone = note.clone();
    clone.attr("id", "").removeClass("");
    
    // Copy the textarea content unless specified not to
    copyName = typeof copyName !== 'undefined' ? copyName : true;
    if (copyName) {
      clone.children().last().val(note.children().last().val());
    }

    clone.removeClass("noanim anim tilt");

    return clone;
  };

  return VG;
})(VotingGame || {});
