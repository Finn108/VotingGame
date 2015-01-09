/*
Creates the dramatic opening in which the user writes the name of his party
*/
function openingSequence() {
	"use strict";

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
			$(this).disableSelection();
			clearTimeout(titleHintTimeout);
			clearHint();

			descHintTimeout = setTimeout(
				showHint,
				500,
				"הקלד את שם המפלגה החדשה שלך"
			);

			this.readOnly = true;
			

			noteDesc.focus();
		}
	});

	// Change the enter key for the note description
	noteDesc.keydown(function (event) {
		if ($.inArray(event.which, tabOrEnter) > -1) {
			event.preventDefault();

			clearTimeout(descHintTimeout);
			clearHint();

			clickHintTimeout = setTimeout(
				showHint,
				500,
				"לחץ כדי להצביע"
			);

			this.readOnly = true;
			$(this).disableSelection();

			note.addClass("anim tilt");
			note.on("click", clearClickHint);
		}
	});

  // Remove existing values (in case autocomplete is on)
  noteTitle.val("");
  noteDesc.val("");
	setTimeout(fadeNoteIn, 600);
}

function skipOpening() {
	"use strict";

	var note = $("#note");
	var noteTitle = note.children().first();
	var noteDesc = note.children().last();

	noteTitle.val("שקר");
	noteDesc.val("מפלגת הכול שקרים");
	note.addClass("noanim tilt");
	note.children().attr("readonly", true);
	note.children().disableSelection();
	note.fadeIn();
}
