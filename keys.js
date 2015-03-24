// Inject an onclick handler for handling saving a set of
// Crypto-Book keys from a web page.
$(function injectSaveKeys() {
	var save = $('.crypto-book-keys #save');
	if (save.length) {
		save.on('click', saveKeys);
	}
});

// Do the actual saving of keys to Chrome local storage.
function saveKeys() {
	var keys = $('.crypto-book-keys #keys');
	if (keys.length) {
		var ring = JSON.parse(keys[0].innerText);
		chrome.storage.local.set({'ring': ring}, function() {
			if (chrome.runtime.lastError)
				alert('Saving keys failed.');
			else
				alert('Key ring saved successfully.');
		});
	}
}
