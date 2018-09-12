const newUrlTimeout = 10000;
const valueToDivideBy = 10;
const pauseBetweenScrolls = 250;

class Helpers {
	constructor() {
		this.newsAndStories = 'http://www.wikia.com/fandom';
		this.interval = 500;
	}

	/**
	 * Waits for the URL provided as the parameter
	 * @param {string} newUrl - URL we are waiting for
	 */
	waitForUrl(newUrl) {
		browser.waitUntil(() => browser.getUrl() === newUrl, newUrlTimeout, 'expected new page after 10 seconds', this.interval);
	}

	/**
	 * Scrolls by given number of pixels starting from the given element. If no element is given, it scrolls from the top.
	 * @param {number} px - number of pixels by which we want to scroll
	 * @param scrollFromElement - element we want to scroll from
	 */
	slowScroll(px, scrollFromElement = null) {
		if (scrollFromElement !== null) {
			for (let i = (px / valueToDivideBy); i < px; i += i) {
				browser.scroll(scrollFromElement, 0, i);
				browser.pause(pauseBetweenScrolls);
			}
		} else {
			for (let i = (px / valueToDivideBy); i < px; i += i) {
				browser.scroll(0, i);
				browser.pause(pauseBetweenScrolls);
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
				finalLink += `&${parameter}`;
			});
		}
		return finalLink;
	}
}

export default new Helpers();
