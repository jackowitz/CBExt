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
		var groupid = ring['groupid'];
		var name = ring['name'];

		var obj = {};
		obj[groupid] = ring;
		chrome.storage.local.set(obj, function() {
			if (chrome.runtime.lastError) {
				alert('Saving keys failed.');
			} else {
				var fmt = 'Keys for ' + name + ' (' +
					groupid + ') saved successfully.';
				alert(fmt);
			}
		});
	}
}
