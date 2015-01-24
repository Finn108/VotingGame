var VotingGame = (function (VG) {
  "use strict";

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  $("#mainNote").click(function (event) {
    if (! VG.started) return;
    var bigNote = $(this);
  	var miniNote = bigNote.clone();
  	// Add the textarea data (jquery doesn't clone this by default)
  	miniNote.children().last().val(bigNote.children().last().val());
  	miniNote.removeClass("noanim anim tilt");
    miniNote.attr("id", "");
    // Place the note on a random horizontal position
    var minLeft = -75;
    var maxLeft = 25;
    var horizontalPos = randomRange(minLeft, maxLeft);
    var rotation = randomRange(0, 360);
    miniNote.css({
      transform: "scale(0.2, 0.2) rotate(" + rotation + "deg)",
      top: "0%",
      left: horizontalPos,
    });

    
    var dropZone = $("#noteDropZone");
    dropZone.append(miniNote);

    miniNote.animate({ top: "100%" }, 700, "easeInCirc", function () {
      // Increase the votes amount only after it reaches the box
      VG.votesCounter.addVotes(VG.clickValue);
      miniNote.remove();
    });

    /******************/
    /* Add text popup */
    /******************/
    var popupTexts = [
      "השפעתי!",
      "אני אזרח טוב",
      "דמוקרטיה!",
    ];
    var popup = $("<span>").text(randomChoice(popupTexts));
    popup.disableSelection();
    var yPos = event.pageY - 20; // prevent blocking the note
    var xPos = event.pageX + randomRange(-60, 0);
    popup.css({ top: yPos, left: xPos, position: "fixed"});
    $("#clickAlerts").append(popup);

    popup.animate({top: "-=80px", opacity: 0}, 2000, "swing", function () {
      popup.remove();
    }); 
  });

  return VG;
})(VotingGame || {});
