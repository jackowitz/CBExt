// A very fragile, screen-scraping approach to automating
// authorizing Facebook apps. Just looks all buttons with
// a particular name and blindly clicks them.
window.addEventListener('load', function() {
	var timer = setInterval(buttonReady, 111);
	function buttonReady() {
		bs = document.getElementsByName('__CONFIRM__')
		for (var i = 0; i < bs.length; i++) {
			bs[i].click();
			clearInterval(timer);
		}
	}
}, false);
