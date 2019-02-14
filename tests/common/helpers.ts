import { expect } from 'chai';
import { timeouts } from './timeouts';
import { queryStrings } from './query-strings';
import { adSlots } from './ad-slots';

const valueToDivideBy = 10;
const pauseBetweenScrolls = 250;
const timeToStartPlaying = 3000;

class Helpers {
	constructor() {
		this.classHidden = '.hide';
		this.classProperty = 'class';
		this.main = '.main';
		this.navbar = 'nav';
		this.clickThroughUrlDomain = 'fandom';
		this.wrapper = '.wrapper:first-of-type';
		this.slotResult = 'data-slot-result';
	}

	/**
	 * Waits for the URL provided as the parameter.
	 * @param {string} newUrl - URL we are waiting for
	 */
	waitForUrl(newUrl) {
		browser.waitUntil(
			() => RegExp(newUrl).test(browser.getUrl()),
			timeouts.newUrlTimeout,
			'expected new page after 10 seconds',
			timeouts.interval,
		);
	}

	waitForViewabillityCounted(timeout = timeouts.viewabillity) {
		browser.pause(timeout);
	}

	navigateToUrl(url, ...parameters) {
		browser.url(queryStrings.getUrl(url, ...parameters));
	}

	/**
	 * Scrolls by given number of pixels starting from the given element.
	 * If no element is given, it scrolls from the top.
	 * @param {number} px - number of pixels by which we want to scroll
	 * @param scrollFromElement - element we want to scroll from
	 */
	slowScroll(px, scrollFromElement = null) {
		const step = px / valueToDivideBy;

		if (scrollFromElement !== null) {
			for (let i = step; i < px; i += step) {
				browser.scroll(scrollFromElement, 0, i);
				browser.pause(pauseBetweenScrolls);
			}
		} else {
			for (let i = step; i < px; i += step) {
				browser.scroll(0, i);
				browser.pause(pauseBetweenScrolls);
			}
		}
	}

	waitToStartPlaying() {
		browser.pause(timeToStartPlaying);
	}

	reloadPageAndWaitForSlot(adSlot) {
		browser.refresh();
		browser.waitForVisible(adSlot, timeouts.standard);
	}

	openUrlAndWaitForSlot(url, adSlot) {
		browser.url(url);
		browser.waitForVisible(adSlot, timeouts.standard);
	}

	refreshPageAndWaitForSlot(adSlot, timeout = timeouts.standard) {
		browser.refresh();
		browser.pause(timeout);
		browser.waitForVisible(adSlot, timeout);
	}

	waitForVideoAdToFinish(adDuration) {
		browser.pause(adDuration);
	}

	waitForVideoToProgress(videoDuration) {
		browser.pause(videoDuration);
	}

	waitForValuesLoaded(field = false) {
		if (field) {
			return browser.waitUntil(() => browser.getText(field) !== 'Waiting...', timeouts.standard);
		}

		return browser.waitUntil(() => browser.getText(this.main) !== 'Waiting...', timeouts.standard);
	}

	/**
	 * Waits until the ad slot to receive its line item id parameter.
	 * @param adSlot ad slot that should receive the parameter
	 */
	waitForLineItemIdAttribute(adSlot) {
		browser.waitForExist(adSlot, timeouts.standard);
		browser.waitUntil(
			() => this.isLineItemExisting(adSlot),
			timeouts.standard,
			'No line item id attribute',
			timeouts.interval,
		);
	}

	/**
	 * Returns line item ID of the given slot.
	 * @param adSlot slot to get line item ID from
	 * @returns {string}
	 */
	getLineItemId(adSlot) {
		return browser.element(adSlot).getAttribute(adSlots.lineItemIdAttribute);
	}

	isLineItemExisting(adSlot) {
		return !!this.getLineItemId(adSlot);
	}

	/**
	 * Returns creative ID of the given slot.
	 * @param adSlot slot to get line item ID from
	 * @returns {string}
	 */
	getCreativeId(adSlot) {
		return browser.element(adSlot).getAttribute(adSlots.creativeIdAttribute);
	}

	isCreativeIdExisitng(adSlot) {
		return !!this.getCreativeId(adSlot);
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
		this.switchToTab(1);
		this.waitForUrl(url);

		if (browser.getUrl().includes(url)) {
			result = true;
		}
		this.closeNewTabs();

		return result;
	}

	/**
	 * Switches focus to a given frame. If you want to go back to default frame, use browser.frame()
	 * instead.
	 * @param frameID name of the frame to change focus to
	 */
	switchToFrame(frameID) {
		const frame = browser.element(frameID).value;

		browser.frame(frame);
	}

	switchToTab(tabId = 1) {
		// TODO remove this workaround after chromedriver update for opening new pages
		browser.pause(timeouts.standard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[tabId]);
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
		browser.pause(timeouts.standard);
		browser.switchTab(tabIds[0]);
	}

	/**
	 * @param width
	 * @param height
	 */
	setDefaultWindowSize(width = 1600, height = 900) {
		browser.windowHandleSize({
			width,
			height,
		});
	}

	checkVisualRegression(results) {
		results.forEach((result) => expect(result.isWithinMisMatchTolerance).to.be.ok);
	}
}

export const helpers = new Helpers();
