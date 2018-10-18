import { timeouts } from '../common/timeouts';

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
}

export default new HiviUapJwp();
