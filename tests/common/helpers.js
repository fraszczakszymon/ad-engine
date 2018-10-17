import { timeouts } from '../common/timeouts';
import adSlots from '../common/adSlots';

const newUrlTimeout = 10000;
const valueToDivideBy = 10;
const pauseBetweenScrolls = 250;
const timeToStartPlaying = 3000;
const aspectRatioDelta = 3;

class Helpers {
	constructor() {
		this.classHidden = '.hide';
		this.pageBody = 'body';
		this.classProperty = 'class';
		this.navbar = 'nav';
		this.clickThroughUrlDomain = 'fandom';
		this.wrapper = '.wrapper';
	}

	/**
	 * Waits for the URL provided as the parameter.
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
	 * Adds additional parameters to URL.
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
	 * Provides parameters with the example page to load and ad slot to wait for.
	 * @param adPage example page with ads to load
	 * @param adSlot ad slot to wait for visible
	 */
	reloadPageAndWaitForSlot(adPage, adSlot) {
		browser.reload();
		browser.windowHandleSize({ width: 1920, height: 1080 });
		browser.url(adPage); // mandatory, because test page fails to load without it
		browser.waitForVisible(adSlot, timeouts.standard);
	}

	/**
	 * Refreshes the page and pauses all the actions to let them reload properly.
	 * @param adSlot slot to wait for
	 * @param timeout duration of the pause
	 */
	refreshPageAndWaitForSlot(adSlot, timeout = timeouts.pageReload) {
		browser.refresh();
		browser.pause(timeout);
		browser.waitForVisible(adSlot);
	}

	/**
	 * Waits until the ad slot to receive its line item id parameter.
	 * @param adSlot ad slot that should receive the parameter
	 */
	waitForLineItemIdAttribute(adSlot) {
		browser.waitUntil(() => browser.element(adSlot).getAttribute(adSlots.lineItemIdAttribute) !== null, timeouts.standard, 'No line item id attribute', timeouts.interval);
	}

	/**
	 * Returns line item ID of the given slot.
	 * @param adSlot slot to get line item ID from
	 * @returns {String|String[]|*|(WebdriverIO.Client<string> & WebdriverIO.Client<null> & string & null)|(WebdriverIO.Client<string[]> & WebdriverIO.Client<null[]> & string[] & null[])|WebdriverIO.Client<any>|string}
	 */
	getLineItemId(adSlot) {
		return browser.element(adSlot).getAttribute(adSlots.lineItemIdAttribute);
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

	/**
	 * Waits for the adslot\'s "data-slot-result" attribute to receive desired parameter.
	 * @param adSlot slot to receive the parameter
	 * @param result parameter that result should equal to
	 */
	waitForResult(adSlot, result) {
		browser.waitUntil(() => browser.element(adSlot).getAttribute(adSlots.resultAttribute) === result, timeouts.standard, `Result mismatch: expected ${result}`, timeouts.interval);
	}

	/**
	 * Checks the slot\'s dimensions. Returns result and (if present) error messages.
	 * @param adSlot slot dimensions are taken from
	 * @param width slot\'s width
	 * @param height slot\'s height
	 * @param customPrefix additional information to add before the error message (e.g. if the size applies to default or resolved state of the slot)
	 * @returns {{status: boolean, capturedErrors: string}} status: true if there were no errors, false if errors were found; capturedErrors: error message.
	 */
	checkSlotSize(adSlot, width, height, customPrefix = '') {
		let result = true;
		let errorMessages = '';
		const slotSize = browser.getElementSize(adSlot);

		if (slotSize.width !== width) {
			result = false;
			errorMessages += `${customPrefix} Width incorrect: expected ${slotSize.width} to equal ${width}\n`;
		}
		if (slotSize.height !== height) {
			result = false;
			errorMessages += `${customPrefix} Height incorrect: expected ${slotSize.height} to equal ${height}\n`;
		}
		return {
			status: result,
			capturedErrors: errorMessages,
		};
	}

	/**
	 * Checks the slot\'s dimensions using ratio to measure height.
	 * @param adSlot slot dimensions are taken from
	 * @param expectedWidth correct slot\'s width
	 * @param heightRatio slot's ratio to measure height
	 * @param customPrefix additional information to add before the error message (e.g. if the size applies to default or resolved state of the slot)
	 * @returns {{status: boolean, capturedErrors: string}} status: true if there were no errors, false if errors were found; capturedErrors: error message.
	 */
	checkSlotRatio(adSlot, expectedWidth, heightRatio, customPrefix = '') {
		let result = true;
		let errorMessages = '';

		const slotSize = browser.getElementSize(adSlot);

		if (slotSize.width !== expectedWidth) {
			result = false;
			errorMessages += `${customPrefix} Slot width ratio incorrect - expected ${expectedWidth} - actual ${slotSize.width}\n`;
		}

		if (Math.abs(slotSize.height - expectedWidth / heightRatio) > aspectRatioDelta) {
			result = false;
			errorMessages += `${customPrefix} Slot height ratio incorrect - expected ${expectedWidth / heightRatio} - actual ${slotSize.height}\n`;
		}
		return {
			status: result,
			capturedErrors: errorMessages,
		};
	}

	/**
	 * Checks UAP slot size based on the given ratio.
	 * @param adSlot slot to measure
	 * @param heightRatio ratio value for height of the slot
	 * @param customPrefix custom message to add before the error message
	 * @returns {{status: boolean, capturedErrors: string}} returns false if no errors were found, else returns true. captured errors: returns string with errors
	 */
	checkUAPSizeSlotRatio(adSlot, heightRatio, customPrefix = '') {
		return this.checkSlotRatio(adSlot, browser.getViewportSize('width'), heightRatio, customPrefix);
	}

	/**
	 * Checks slot ratio based on a given derivative value.
	 * @param adSlot slot to measure
	 * @param sizeDeterminant derivative value for the slot
	 * @param heightRatio ratio value for height of the slot
	 * @param customPrefix custom message to add before the error message
	 * @returns {{status: boolean, capturedErrors: string}} returns false if no errors were found, else returns true. captured errors: returns string with errors
	 */
	checkDerivativeSizeSlotRatio(adSlot, sizeDeterminant, heightRatio, customPrefix = '') {
		return this.checkSlotRatio(adSlot, browser.getElementSize(sizeDeterminant, 'width'), heightRatio, customPrefix);
	}

	/**
	 * It checks redirect on click and returns result.
	 * @param adSlot slot to click
	 * @param url expected url
	 * @returns {boolean} returns false if there were no errors, else it returns true
	 */
	adRedirect(adSlot, url = this.clickThroughUrlDomain) {
		let result = false;

		this.waitForLineItemIdAttribute(adSlot);
		browser.waitForEnabled(adSlot, timeouts.standard);
		browser.click(adSlot);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		this.waitForUrl(url);

		if (browser.getUrl().includes(url)) {
			result = true;
		}
		this.closeNewTabs();
		return result;
	}

	/**
	 * Checks slot\'s status after making sure it exists in the code.
	 * Returns information about visibility in general, visibility in viewport and about being enabled.
	 * @param adSlot slot to wait for
	 * @returns {{visible: *, inViewport: (Boolean|Boolean[]), enabled: (Boolean|Boolean[])}} slot statuses
	 */
	checkSlotStatus(adSlot) {
		browser.waitForExist(adSlot, timeouts.standard);
		return {
			visible: browser.isVisible(adSlot),
			inViewport: browser.isVisibleWithinViewport(adSlot),
			enabled: browser.isEnabled(adSlot)
		};
	}

	/**
	 * Switches focus to a given frame. If you want to go back to default frame, use browser.frame() instead.
	 * @param frameID name of the frame to change focus to
	 */
	switchToFrame(frameID) {
		const frame = browser.element(frameID).value;

		browser.frame(frame);
	}
}

export default new Helpers();
