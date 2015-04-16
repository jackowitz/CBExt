// A very fragile, screen-scraping approach to automating
// authorizing Facebook apps. Just looks all buttons with
// a particular name and blindly clicks them.
$(function authorize() {
	var timer = setInterval(buttonReady, 1111);
	function buttonReady() {
		$("[name='__CONFIRM__']").each(function() {
			$(this).click();
		});
	}
});
