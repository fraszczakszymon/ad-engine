import helpers from '../common/helpers';
import { timeouts } from '../common/timeouts';

const loadAdTime = 10000;

class DelayAd {
	constructor() {
		this.pageLink = 'slots/delay/';
		this.topLeaderboard = '#top_leaderboard[data-gpt-line-item-id="271491732"]';
		this.topBoxad = '#top_boxad[data-gpt-line-item-id="271491732"]';
		this.loadAdsButton = '#clickDelay';
		this.resultAttribute = 'data-slot-result';
		this.viewedAttribute = 'data-slot-viewed';
		this.topLeaderboardWidth = 728;
		this.topLeaderboardHeight = 90;
		this.topBoxadWidth = 300;
		this.topBoxadHeight = 250;
		this.adLoaded = 'success';
		this.adViewed = 'true';
	}

	/**
	 * Waits for the delay to pass so the ads load up.
	 */
	waitToLoadAds() {
		browser.waitUntil(() => browser.getText(this.loadAdsButton) === 'Load ads (9s)', timeouts.standard, 'Button not loaded', helpers.interval);
		browser.waitUntil(() => browser.getText(this.loadAdsButton) === 'Load ads', loadAdTime, 'Ads not loaded', helpers.interval);
	}
}

export default new DelayAd();
