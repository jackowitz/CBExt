$(function injectSaveKeys() {
	var save = $('.crypto-book-keys #save');
	if (save.length) {
		save.on('click', saveKeys);
	}
});

function saveKeys() {
	var keys = $('.crypto-book-keys #keys');
	if (keys.length) {
		var ring = JSON.parse(keys[0].innerText);
		chrome.storage.local.set({'ring': ring}, function() {
			alert('Key ring saved successfully.');
		});
	}
}
