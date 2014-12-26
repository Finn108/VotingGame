/*
Some small additions to jquery for the game
*/

(function($){
	/*
	Disables the selection of a text element
	*/
	$.fn.disableSelection = function() {
		return this
				 .attr('unselectable', 'on')
				 .css('user-select', 'none')
				 .on('selectstart', false);
	};
})(jQuery);