/*
Creates the dramatic opening in which the user writes the name of his party
*/
function openingSequence() {
	"use strict";
	
	var note = $("#note");
	var noteTitle = note.children().first();
	var noteDesc = note.children().last();
	var titleHintTimeout;
	var descHintTimeout;
	var clickHintTimeout;
	
	function fadeNoteIn() {
		/*
		Enter the note and after a few seconds focus on the text box
		*/
		note.fadeIn();
		setTimeout(function() {
			noteTitle.focus();
			titleHintTimeout = setTimeout(addTitleHint, 2000);
		}, 1000);
	}
	
	function addHintClick() {
		$("#noteVoteHint").fadeIn();
	}
	
	function addTitleHint() {
		$("#noteTitleHint").fadeIn();
	}
	
	function addDescHint() {
		$("#noteSubtitleHint").fadeIn();
	}
	
	function clearClickHint() {
		clearTimeout(clickHintTimeout);
		$("#noteVoteHint").fadeOut();
		note.off("click", clearClickHint);
	}
	
	// Change the enter key for the note title
	noteTitle.keydown(function (event) {
		if (event.which === 13) {
			clearTimeout(titleHintTimeout);
			$("#noteTitleHint").fadeOut();
			descHintTimeout = setTimeout(addDescHint, 2000);
			this.readOnly = true;
			$(this).disableSelection();
			noteDesc.focus();
			event.preventDefault();
		}
	});
	
	// Change the enter key for the note description
	noteDesc.keydown(function (event) {
		if (event.which === 13) {
			clearTimeout(descHintTimeout);
			$("#noteSubtitleHint").fadeOut();
			this.readOnly = true;
			$(this).disableSelection();
			event.preventDefault();
			note.addClass("anim tilt");
			clickHintTimeout = setTimeout(addHintClick, 2000);
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