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
				2000,
				"בבקשה תרשום את אות (או אותיות) המפלגה שלך"
			);
		}, 1000);
	}

	// Change the enter key for the note title
	noteTitle.keydown(function (event) {
		if (event.which === 13) {
			event.preventDefault();

			clearTimeout(titleHintTimeout);
			clearHint();

			descHintTimeout = setTimeout(
				showHint,
				2000,
				"בבקשה תרשום את שם המפלגה שלך"
			);

			this.readOnly = true;
			$(this).disableSelection();

			noteDesc.focus();
		}
	});

	// Change the enter key for the note description
	noteDesc.keydown(function (event) {
		if (event.which === 13) {
			event.preventDefault();

			clearTimeout(descHintTimeout);
			clearHint();

			clickHintTimeout = setTimeout(
				showHint,
				2000,
				"לחץ כדי להצביע"
			);

			this.readOnly = true;
			$(this).disableSelection();

			note.addClass("anim tilt");
			note.on("click", clearClickHint);
		}
	});

	setTimeout(fadeNoteIn, 600);
}

function skipOpening() {
	var note = $("#note");
	var noteTitle = note.children().first();
	var noteDesc = note.children().last();

	noteTitle.val("שקר");
	noteDesc.val("מפלגת הכול שקרים");
	note.addClass("noanim tilt");
}