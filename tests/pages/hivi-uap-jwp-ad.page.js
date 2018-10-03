import helpers from '../common/helpers';
import { timeouts } from '../common/timeouts';

const loadAdTime = 10000;

class HiviUapJwp {
	constructor() {
		this.pageLink = '/templates/hivi-uap-jwp/';
		this.loadAdsButton = '#clickDelay';
		this.resultAttribute = 'data-slot-result';
		this.viewedAttribute = 'data-slot-viewed';
		this.adLoaded = 'success';
		this.adViewed = 'true';
		this.inHouseLineItemId = '271491732';
		this.uapLineItemId = '4517824948';
	}

	/**
	 * Waits for the delay to pass so the ads load up.
	 */
	waitToLoadAds() {
		browser.waitUntil(() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP (9s)', timeouts.standard, 'Button not loaded', helpers.interval);
		browser.waitUntil(() => browser.getText(this.loadAdsButton) === 'Load UAP:JWP', loadAdTime, 'Ads not loaded', helpers.interval);
	}
}

export default new HiviUapJwp();
