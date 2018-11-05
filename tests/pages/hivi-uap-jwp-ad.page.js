import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const loadAdTime = 10000;

class HiviUapJwp {
	constructor() {
		this.pageLink = '/templates/hivi-uap-jwp/';
		this.loadAdsButton = '#clickDelay';
		this.inHouseLineItemId = '271491732';
		this.uapLineItemId = '4517824948';
	}

	/**
	 * Waits for the delay to pass so the ads load up.
	 */
	waitToLoadAds() {
		browser.waitUntil(
			() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP (9s)',
			timeouts.standard,
			'Button not loaded',
			timeouts.interval);
		browser.waitUntil(
			() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP',
			loadAdTime,
			'Ads not loaded',
			timeouts.interval);
	}

	/**
	 * Waits for the delay to pass so ads can load and scrolls to the first ad slot.
	 * After that, waits until the second ad slot is visible and scrolls to it.
	 * This method is desired for mobile tests.
	 * @param slot1 first ad slot/module to scroll to
	 * @param slot2 second ad slot/module to scroll to
	 * @param timeout time to wait for the slot
	 */
	waitForAdsAfterDelayAndScrollToAdSlotOnMobile(slot1, slot2, timeout = timeouts.standard) {
		this.waitToLoadAds();
		browser.scroll(slot1);
		browser.waitForVisible(slot2, timeout);
		browser.scroll(slot2); // separate scroll, because this slot is not immediately visible
	}

	/**
	 *Waits for the delay to pass so ads can load and scrolls to the desired slot.
	 * This method is desired for desktop tests.
	 * @param adSlot slot we want to be visible
	 */
	waitForAdsAfterDelayAndScrollToAdSlotOnDesktop(adSlot) {
		this.waitToLoadAds();
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlot, timeouts.standard);
	}

	/**
	 * Clicks on the button to load ads. After the click, scrolls to the first ad slot.
	 * After the second ad slot is visible, it scrolls to it.
	 * This method is desired for mobile tests.
	 * @param slot1 first ad slot/module to scroll to
	 * @param slot2 second ad slot/module to scroll to
	 * @param timeout time to wait for the slot
	 */
	waitForAdsAfterClickAndScrollToAdSlotOnMobile(slot1, slot2, timeout = timeouts.standard) {
		browser.waitForVisible(this.loadAdsButton, timeouts.standard);
		browser.waitUntil(
			() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP (7s)',
			timeouts.standard,
			'Button not loaded',
			timeouts.interval);
		browser.click(this.loadAdsButton);
		browser.scroll(slot1);
		browser.waitForVisible(slot2, timeout);
		browser.scroll(slot2); // separate scroll, because this slot is not immediately visible
	}

	/**
	 * Clicks on the button to load ads. After the click, scrolls to the desired slot.
	 * This method is desired for desktop tests.
	 * @param adSlot slot we want to be visible
	 */
	waitForAdsAfterClickAndScrollToAdSlotOnDesktop(adSlot) {
		browser.waitForVisible(this.loadAdsButton);
		browser.click(this.loadAdsButton);
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlot, timeouts.standard);
	}
}

export default new HiviUapJwp();
