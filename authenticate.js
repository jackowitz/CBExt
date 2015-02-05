$(function injectAuthenticate() {
	var signin = $('.crypto-book-signin #signin');
	if (signin.length) {
		signin.on('click', authenticate);
	}
});

function authenticate() {
	var challenge = $('.crypto-book-signin #challenge');
	if (challenge.length > 0) {
		var response = $('.crypto-book-signin #response');
		if (response.length > 0) {
			var challenge = challenge[0].innerText;
			chrome.storage.local.get('ring', function(items) {
				if (!items.hasOwnProperty('ring')) {
					alert('Do you have keys saved?');
				} else {
					var ring = items.ring;
					var pi = 0;
					ring.x = new BigInteger(ring.x);
					for (var i = 0; i < ring.L.length; i++) {
						ring.L[i] = new BigInteger(ring.L[i]);
						if (g.modPow(ring.x, p).equals(ring.L[i])) {
							pi = i;
						}
					}
					response.val(sign(challenge, ring.L, ring.x, pi));
				}
			});
		} else {
			alert('No crypto-book-response field.');
		}
	} else {
		alert('No crypto-book-challenge field.');
	}
};
