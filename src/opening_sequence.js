/*
Creates the dramatic opening in which the user writes the name of his party
*/
function openingSequence() {
	"use strict";
	
	var note = $("#note");
	var noteTitle = note.children().first();
	var noteDesc = note.children().last();
	
	function fadeNoteIn() {
		/*
		Enter the note and after a few seconds focus on the text box
		*/
		note.fadeIn();
		setTimeout(function() {
			noteTitle.focus();
		}, 1000);
	}
	
	// Change the enter key for the note title
	noteTitle.keydown(function (event) {
		if (event.which === 13) {
			this.readOnly = true;
			$(this).disableSelection();
			noteDesc.focus();
			event.preventDefault();
		}
	});
	
	// Change the enter key for the note description
	noteDesc.keydown(function (event) {
		if (event.which === 13) {
			this.readOnly = true;
			$(this).disableSelection();
			event.preventDefault();
			note.addClass("anim tilt");
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