class Helpers {
	waitForUrl(newUrl) {
		browser.waitUntil(() => browser.getUrl() === newUrl, 10000, 'expected new page after 10 seconds', 500);
	}
}

export default new Helpers();
