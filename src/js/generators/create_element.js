var VotingGame = (function (VG) {
  "use strict";
  
  if (! VG._gens) VG._gens = {};

  VG._gens.createElement = function (details) {
    /*
    Creates the html element for the generator. Returns the button element
    as a jQuery object.
    details include:
      - id
      - name
      - price
      - picture
    */
    var btn = $("<div>");
    btn.attr("id", "gen" + details.id);
    btn.addClass("generator");

    var img = $("<img>");
    img.attr("src", VG._cMainPath + "assets/" + details.picture);
    img.appendTo(btn);

    // Voter name
    $("<div>").text(details.name).appendTo(btn);

    // Price mark
    $("<span>").text(details.price + " x").appendTo(btn);

    return btn;
  };

  VG._gens.addNoteToBtn = function (button) {
    /*
    Receives the button element and adds the note clone to it.
    Done outside of create function since note might not be complete at this
    point.
    */
    VG.effects.cloneNote(false).appendTo(button);
    // Also add the overlay class
    $("<div>").addClass("overlay").appendTo(button);
  };

  return VG;
})(VotingGame || {});