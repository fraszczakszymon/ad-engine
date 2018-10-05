import { timeouts } from '../common/timeouts';
import adSlots from '../common/adSlots';

const newUrlTimeout = 10000;
const valueToDivideBy = 10;
const pauseBetweenScrolls = 250;
const timeToStartPlaying = 3000;

class Helpers {
	constructor() {
		this.classHidden = '.hide';
		this.pageBody = 'body';
		this.classProperty = 'class';
		this.navbar = 'nav';
		this.fandomWord = 'fandom';
	}

	/**
	 * Waits for the URL provided as the parameter
	 * @param {string} newUrl - URL we are waiting for
	 */
	waitForUrl(newUrl) {
		browser.waitUntil(() => RegExp(newUrl).test(browser.getUrl()), newUrlTimeout, 'expected new page after 10 seconds', timeouts.interval);
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

	/**
	 * Pauses actions so the movie can start playing before executing other actions.
	 */
	waitToStartPlaying() {
		browser.pause(timeToStartPlaying);
	}

	/**
	 * Reformats the errors from the array and prints them as a numbered list.
	 * @param arrayOfErrors
	 * @returns {string}
	 */
	errorFormatter(arrayOfErrors) {
		let finalString = 'Errors found: \n';
		let i = 1;

		arrayOfErrors.forEach((error) => {
			finalString += `#${i}: ${error} \n`;
			i += 1;
		});
		return finalString;
	}

	/**
	 * Provides parameters with the example page to load and ad slot to wait for
	 * @param adPage example page with ads to load
	 * @param adSlot ad slot to wait for visible
	 */
	reloadPage(adPage, adSlot) {
		browser.reload();
		browser.windowHandleSize({ width: 1920, height: 1080 });
		browser.url(adPage); // mandatory, because test page fails to load without it
		browser.waitForVisible(adSlot, timeouts.standard);
	}

	/**
	 * Refreshes the page and pauses all the actions to let elements reload properly.
	 * @param timeout duration of the pause
	 */
	refreshPage(timeout = timeouts.pageReload) {
		browser.refresh();
		browser.pause(timeout);
	}

	/**
	 * Waits for the new tab to open
	 */
	waitForNewTab() {
		browser.waitUntil(() => browser.getTabIds().length > 1, timeouts.standard, 'Tab has not been opened', timeouts.interval);
	}

	/**
	 * Waits until the ad slot to receive its line item id parameter.
	 * @param adSlot ad slot that should receive the parameter
	 */
	waitForLineItemParam(adSlot) {
		browser.waitUntil(() => browser.element(adSlot).getAttribute(adSlots.lineItemParam) !== null, timeouts.standard, 'No line item id attribute', timeouts.interval);
	}

	/**
	 * Waits until the element is visible and its height is greater than 0.
	 * @param adSlot ad slot we are waiting for
	 */
	waitForExpanded(adSlot) {
		browser.waitUntil(() => browser.getElementSize(adSlot, 'height') > 0, timeouts.standard, 'Element not expanded', timeouts.interval);
	}

	/**
	 * Waits for the adslot\'s attribute "Viewed" to equal "true".
	 * @param adSlot ad slot waiting for bool value
	 */
	waitForViewed(adSlot) {
		browser.waitUntil(() => browser.element(adSlot).getAttribute(adSlots.viewedAttribute) === adSlots.adViewed, timeouts.standard, 'Slot has not been viewed', timeouts.interval);
	}
}

export default new Helpers();
