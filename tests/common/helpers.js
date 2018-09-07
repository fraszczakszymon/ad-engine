class Helpers {
	constructor() {
		this.newsAndStories = 'http://www.wikia.com/fandom';
	}

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

	/**
	 * Closes all the tabs but the first one and switches back to it.
	 */
	closeNewTabs() {
		const tabIds = browser.getTabIds();
		if (tabIds.length > 1) {
			for (let i = 1; i < tabIds.length - 1; i += 1) {
				browser.close(i);
			}
		}
		browser.switchTab(0);
	}
}

export default new Helpers();
