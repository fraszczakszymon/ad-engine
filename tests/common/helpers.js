class Helpers {
	waitForUrl(newUrl) {
		browser.waitUntil(() => browser.getUrl() === newUrl, 10000, 'expected new page after 10 seconds', 500);
	}
	waitForVideoOverlay() {
		browser.pause(5000);
	}

	slowScroll(px) {
		for (let i = (px / 10); i < px; i += i) {
			browser.scroll(0, i);
			browser.pause(250);
		}
	}
}

export default new Helpers();
