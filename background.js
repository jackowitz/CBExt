function install_notice() {
    if (localStorage.getItem('install_time'))
        return;

    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    //chrome.tabs.create({url: "http://cryptobook.ninja"});
    //chrome.tabs.create({url: "installed.html"});
}
install_notice();
