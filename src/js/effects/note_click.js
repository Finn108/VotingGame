var VotingGame = (function (VG) {
  "use strict";

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function addTextPopup(pageX, pageY) {
    var popupTexts = [
      "השפעתי!",
      "אני אזרח טוב",
      "דמוקרטיה!",
      "אתה תותח!",
      "תורם למדינה!",
      "מימשתי את זכותי!",
    ];
    var popup = $("<span>").text(randomChoice(popupTexts));
    popup.disableSelection();
    var popupWidth = popup.text().length * 8;
    var yPos = pageY - 30;
    var xPos = pageX + randomRange(-popupWidth, -5);
    popup.css({ top: yPos, left: xPos, position: "fixed"});
    $("#clickAlerts").append(popup);

    popup.animate({top: "-=80px", opacity: 0}, 2000, "swing", function () {
      popup.remove();
    }); 
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
      top: "20%",
      left: horizontalPos,
    });

    
    var dropZone = $("#noteDropZone");
    dropZone.append(miniNote);

    miniNote.animate({ top: "100%" }, 850, "easeInCirc", function () {
      // Increase the votes amount only after it reaches the box
      VG.votesCounter.addVotes(VG.clickValue);
      miniNote.remove();
    });
    
    addTextPopup(event.pageX, event.pageY);

  });

  return VG;
})(VotingGame || {});
