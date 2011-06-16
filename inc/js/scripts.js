jQuery.noConflict();
     
jQuery(document).ready(function($){
	// if there is a content textarea, turn it into a codemirror 
	if ($("#content").length) {
		// If anyone can tell me a better way of getting access to the editor in other scripts, I'd love to hear it
		// for now I'm just assigning it to the jQuery namespace
		$.editor = CodeMirror.fromTextArea($("#content")[0], {mode: {name: "xml", htmlMode: true}});
		
		// Save the code in CodeMirror to the real textarea every 5 seconds
		// this is necesary for autosave to work... or we could override the autosave file,
		// but this is easy and I don't think it should be a problem for webpage-size chunks of text
		setInterval(function() { $.editor.save(); }, 5000);	
		
	}
});