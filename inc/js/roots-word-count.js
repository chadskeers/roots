// Word count
// Reworked it pulling the values from the $.editor created in scripts.js
(function($) {
	wpWordCount = {

		init : function() {
			var t = this, last = 0, co = $.editor;

			$('#wp-word-count').html( 'Word Count: <span id="word-count">0</span>' );
			t.block = 0;
			t.wc(co.getValue());
			$(co.getInputField()).keyup( function(e) {
				if ( e.keyCode == last ) return true;
				if ( 13 == e.keyCode || 8 == last || 46 == last ) t.wc(co.getValue());
				last = e.keyCode;
				return true;
			});
		},

		wc : function(tx) {
			var t = this, w = $('#word-count'), tc = 0;

			if ( t.block ) return;
			t.block = 1;

			setTimeout( function() {
				if ( tx ) {
					tx = tx.replace( /<.[^<>]*?>/g, ' ' ).replace( /&nbsp;|&#160;/gi, ' ' );
					tx = tx.replace( /[0-9.(),;:!?%#$¿'"_+=\\/-]*/g, '' );
					tx.replace( /\S\s+/g, function(){tc++;} );
				}
				w.html(tc.toString());

				setTimeout( function() { t.block = 0; }, 2000 );
			}, 1 );
		}
	}

	$(document).ready( function(){ wpWordCount.init(); } );
}(jQuery));
