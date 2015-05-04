$(function displayStoredRings() {
	//alert("Your book is overdue.");
	chrome.storage.local.get(null, function(items) {
		for(var ring in items) {
			$('body').append('<div class="ringname">' + items[ring].name + '<br></div>');
		}
	}); 


$( "#target" ).click(function() {
	// remove rings from local storage
	chrome.storage.local.get(null, function(items) {
		for(var ring in items) {
			chrome.storage.local.remove(ring);
		}
		$( ".ringname" ).remove();
	}); 
});

$( "#other" ).click(function() {
  $( "#target" ).click();
});


//$("#test").text("Javascript sucks!");

});
