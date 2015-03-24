// Find the Crypto-Book signin button and inject our in-the-browser
// LRS authentication mechanism as the onclick handler.
$(function injectAuthenticate() {
	var signin = $('.crypto-book-signin #signin');
	if (signin.length) {
		signin.on('click', authenticate);
	}
});

// Do the acutal LRS authentication process.
function authenticate() {
	// 1. Extract the challenge (hidden) field from the form.
	var challenge = $('.crypto-book-signin #challenge');
	if (challenge.length > 0) {
		var start = new Date().getTime();
		var challenge = challenge[0].innerText;
		// 2. Make sure that an appropriate set of keys are saved
		//    in Chrome local storage.
		chrome.storage.local.get('ring', function(items) {
			if (!items.hasOwnProperty('ring')) {
				alert('Do you have keys saved?');
			} else {
				var ring = items.ring;
				var pi = 0;
				// 3. Find our place in the ring. XXX This can be
				//    definitely be moved out of the every-auth path.
				ring.x = new BigInteger(ring.x);
				for (var i = 0; i < ring.L.length; i++) {
					ring.L[i] = new BigInteger(ring.L[i]);
					if (g.modPow(ring.x, p).equals(ring.L[i])) {
						pi = i;
					}
				}
				// 4. Generate the signature.
				// 5. Populate and submit the form.
				var sig = sign(challenge, ring.L, ring.x, pi);
				var end = new Date().getTime();
				$('.crypto-book-signin #c0').val(sig[0]);
				$('.crypto-book-signin #s').val(sig[1]);
				$('.crypto-book-signin #tag').val(sig[2]);
				$('.crypto-book-signin #start').val(start);
				$('.crypto-book-signin #end').val(end);

				var form = $('.crypto-book-signin');
				if (form.length) {
					form.submit();
				}
			}
		});
	} else {
		alert('No crypto-book-signin field.');
	}
};
