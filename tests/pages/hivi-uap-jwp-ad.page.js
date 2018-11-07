import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const loadAdTime = 10000;

class HiviUapJwp {
	constructor() {
		this.pageLink = '/templates/hivi-uap-jwp/';
		this.loadAdsButton = '#clickDelay';
		this.inHouseLineItemId = '271491732';
		this.uapLineItemId = '4517824948';
		this.staticFrame = '[name="google_osd_static_frame"]';
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
	 * Waits for the delay to pass so ads can load and scrolls to the desired ad slot.
	 * This method is desired for mobile tests.
	 * @param adSlot first ad slot/module to scroll to
	 */
	waitForAdsAfterDelayAndScrollToAdSlotOnMobile(adSlot) {
		this.waitToLoadAds();
		browser.scroll(adSlot);
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
	 * Clicks on the button to load ads. After the click, scrolls to the slot\`s approximate position.
	 * This method is desired for mobile tests.
	 * @param adSlot ad slot to scroll to
	 */
	waitForAdsAfterClickAndScrollToAdSlotOnMobile(adSlot) {
		browser.waitForVisible(this.loadAdsButton, timeouts.standard);
		browser.waitUntil(
			() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP (7s)',
			timeouts.standard,
			'Button not loaded',
			timeouts.interval);
		browser.click(this.loadAdsButton);
		browser.scroll(adSlot);
	}

	/**
	 * Clicks on the button to load ads. After the click, scrolls to the slot\'s approximate position.
	 * This method is desired for desktop tests.
	 * @param adSlot slot we want to be visible
	 */
	waitForAdsAfterClickAndScrollToAdSlotOnDesktop(adSlot) {
		browser.waitForVisible(this.loadAdsButton);
		browser.waitUntil(
			() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP (7s)',
			timeouts.standard,
			'Button not loaded',
			timeouts.interval);
		browser.click(this.loadAdsButton);
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlot, timeouts.standard);
		browser.scroll(adSlot);
	}
}

export default new HiviUapJwp();
