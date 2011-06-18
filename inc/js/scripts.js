jQuery.noConflict();
     
jQuery(document).ready(function($){
	// if there is a content textarea, turn it into a codemirror 
	if ($("#content").length) {
		// If anyone can tell me a better way of getting access to the editor in other scripts, I'd love to hear it
		// for now I'm just assigning it to the jQuery namespace
		var timer;
		var options = {tabMode :"indent", mode: {name: "xml", htmlMode: true}};
		var visualButton = $("#edButtonPreview");
		var htmlButton = $("#edButtonHTML");
		visualButton.attr('onClick', '');
		htmlButton.attr('onClick', '');
		
		if (htmlButton.hasClass("active")) {
			$.editor = CodeMirror.fromTextArea($("#content")[0], options);
			resizeCodeMirror();
		} else {
			$.editor = null;
		}
		
		visualButton.click(function() {
			if ($.editor !== null) {
				$.editor.save();
				$.editor.toTextArea();
				$.editor = null;
				switchEditors.go('content', 'tinymce')
				clearInterval(timer);
			}
		});
		
		htmlButton.click(function() {
			if ($.editor === null) {
				switchEditors.go('content', 'html')
				$.editor = CodeMirror.fromTextArea($("#content")[0], options);
				resizeCodeMirror();
				timer = setInterval(function() { $.editor.save(); }, 5000);
			}
		});
		
		// Rehash some of the editor.dev.js code to adjust the codemirror size according to cookies
		function resizeCodeMirror() {
			var h = wpCookies.getHash('TinyMCE_content_size');
	
			if ( getUserSetting( 'editor' ) == 'html' ) {
				if ( h ) {
					if ($.editor !== null) {
						$($.editor.getScrollerElement()).css('height', h.ch - 15 + 'px');
						$.editor.refresh();
					}
				}
			} 
		}
	}
});