class Helpers {
	constructor() {
		this.newsAndStories = 'http://www.wikia.com/fandom';
	}

	/**
	 * Waits for the URL provided as the parameter
	 * @param {string} newUrl - URL we are waiting for
	 */
	waitForUrl(newUrl) {
		browser.waitUntil(() => browser.getUrl() === newUrl, 10000, 'expected new page after 10 seconds', 500);
	}

	slowScroll(px, scrollFromElement = null) {
		if (scrollFromElement !== null) {
			for (let i = (px / 10); i < px; i += i) {
				browser.scroll(scrollFromElement, 0, i);
				browser.pause(250);
			}
		} else {
			for (let i = (px / 10); i < px; i += i) {
				browser.scroll(0, i);
				browser.pause(250);
			}
		}
	}


	/**
	 * Closes all the tabs but the first one and switches back to it.
	 */
	closeNewTabs() {
		const tabIds = browser.getTabIds();

		if (tabIds.length > 1) {
			for (let i = 1; i <= tabIds.length - 1; i += 1) {
				browser.close(i);
			}
		}
		browser.switchTab(tabIds[0]);
	}

	/**
	 * Adds additional parameters to URL
	 * @param {string} url - base URL
	 * @param {array} parameters - array of parameters to add
	 * @returns {string} given URL with added parameters
	 */
	addParametersToUrl(url, parameters) {
		let finalLink = `${url}?${parameters[0]}`;

		parameters.shift();
		if (parameters.length > 0) {
			parameters.forEach((parameter) => {
				finalLink = `${finalLink}&${parameter}`;
			});
		}
		return finalLink;
	}
}

export default new Helpers();
