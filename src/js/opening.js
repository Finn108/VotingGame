var VotingGame = (function (VG) {
  "use strict";

  // Start the dramatic note and hints appearance
  VG._opening = function () {
    var note = $("#note");
    var noteTitle = note.children().first();
    var noteDesc = note.children().last();
    var hintBox = $("#hintBox");
    var titleHintTimeout;
    var descHintTimeout;
    var clickHintTimeout;
    var tabOrEnter = [9, 13];

    function showHint(hint) {
      hintBox.text(hint);
      hintBox.fadeIn();
    }

    function clearHint() {
      hintBox.fadeOut();
    }

    function clearClickHint() {
      clearTimeout(clickHintTimeout);
      clearHint();
      note.off("click", clearClickHint);
    }

    function showTitle() {
      var details = VG.getLevelDetails();
      var titleBox = $("#levelTitle");
      titleBox.children().first().text("במרוץ ל" + details.title);
      titleBox.children().last().text(details.targetDesc);
      titleBox.fadeIn();

    }

    function fadeNoteIn() {
      /*
      Enter the note and after a few seconds focus on the text box
      */
      note.fadeIn();
      setTimeout(function() {
        noteTitle.focus();
        titleHintTimeout = setTimeout(
          showHint,
          500,
          "הקלד את אותיות המפלגה החדשה שלך"
        );
      }, 1000);
    }

    // Change the enter key for the note title
    noteTitle.keydown(function (event) {
      if ($.inArray(event.which, tabOrEnter) > -1) {
        event.preventDefault();

        // Save the note title to the gameState
        VG._gameState.noteTitle = noteTitle.val();

        clearTimeout(titleHintTimeout);
        clearHint();

        descHintTimeout = setTimeout(
          showHint,
          500,
          "הקלד את שם המפלגה החדשה שלך"
        );


        this.readOnly = true;
        $(this).disableSelection();
        // Make it unselectable in firefox
        $(this).focus(function () { this.blur(); });
        

        noteDesc.focus();
      }
    });

    // Change the enter key for the note description
    noteDesc.keydown(function (event) {
      if ($.inArray(event.which, tabOrEnter) > -1) {
        event.preventDefault();
        // Save the party name to the gameState
        VG._gameState.noteDesc = noteDesc.val();

        clearTimeout(descHintTimeout);
        clearHint();

        clickHintTimeout = setTimeout(
          showHint,
          500,
          "לחץ כדי להצביע"
        );

        setTimeout(showTitle, 1300);
        
        this.readOnly = true;
        $(this).disableSelection();
        // Make it unselectable in firefox
        $(this).focus(function () { this.blur(); } );

        note.addClass("anim tilt");
        note.on("click", clearClickHint);
      }
    });

    // Remove existing values (in case autocomplete is on)
    noteTitle.val("");
    noteDesc.val("");
    setTimeout(fadeNoteIn, 600);
  };
  
  // Skip the crap and start the game with the given note
  VG._openingSkip = function (titleText, descText) {
    var note = $("#note");
    var noteTitle = note.children().first();
    var noteDesc = note.children().last();
    var titleBox = $("#levelTitle");
    var details = VG.getLevelDetails();

    noteTitle.val(titleText || "שקר");
    noteTitle.focus(function () { this.blur(); } );
    noteDesc.val(descText || "מפלגת הכול שקרים");
    noteDesc.focus(function () { this.blur(); } );
    note.addClass("noanim tilt");
    note.children().attr("readonly", true);
    note.children().disableSelection();
    note.fadeIn();
    titleBox.children().first().text("במרוץ ל" + details.title);
    titleBox.children().last().text(details.targetDesc);
    titleBox.fadeIn();
  };

  return VG;
})(VotingGame || {});
