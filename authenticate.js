// Find the Crypto-Book signin button and inject our in-the-browser
// LRS authentication mechanism as the onclick handler.
$(function injectAuthenticate() {
	$('.crypto-book-signin-btn').each(function() {
		$(this).on('click', function() {
			authenticate($(this));
		});
	});
	$('.crypto-book-get-extn').each(function() {
		$(this).hide();
	});
	$('.crypto-book-chat').each(function() {
		$(this).removeAttr("hidden");
	});
});

// Do the acutal LRS authentication process.
function authenticate(btn) {
	// 1. Extract the challenge (hidden) field from the form.
	var challenge = $('.crypto-book-signin #challenge');
	if (challenge.length > 0) {
		var start = new Date().getTime();
		var challenge = challenge[0].innerText;
		// 2. Make sure that an appropriate set of keys are saved
		//    in Chrome local storage.
		var groupid = btn.attr('id');
		var href = btn.attr('data-href');
		chrome.storage.local.get(null, function(items) {
			if (!items.hasOwnProperty(groupid)) {
				window.location.href = href;
			} else {
				var ring = items[groupid];
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
				$('.crypto-book-signin #groupid').val('groups/'+groupid);

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
