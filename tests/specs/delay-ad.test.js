import delayAd from '../pages/delay-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test delay ad page', () => {
	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(delayAd.loadAdsButton, timeouts.standard);
	});

	it('will test if ads are not immediately visible', () => {
		expect(browser.isExisting(delayAd.resultAttribute))
			.to
			.be
			.false;
		expect(browser.isExisting(delayAd.resultAttribute))
			.to
			.be
			.false;
	});

	it('will test visibility and dimensions of delayed top leaderboard and top boxad', () => {
		delayAd.waitToLoadAds();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);
		const topBoxadSize = browser.getElementSize(adSlots.topBoxad);

		expect(topLeaderboardSize.width)
			.to
			.equal(adSlots.leaderboardWidth, 'Top leaderboard ad width incorrect');
		expect(topLeaderboardSize.height)
			.to
			.equal(adSlots.leaderboardHeight, 'Top leaderboard ad height incorrect');
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
			.to
			.be
			.true;
		expect(topBoxadSize.width)
			.to
			.equal(adSlots.boxadWidth, 'Top boxad ad width incorrect');
		expect(topBoxadSize.height)
			.to
			.equal(adSlots.boxadHeight, 'Top boxad ad height incorrect');
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
	});

	it('will test if ads show up after clicking the button and if they were viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		browser.waitUntil(() => browser.element(adSlots.topLeaderboard).getAttribute(delayAd.viewedAttribute) === delayAd.adViewed, timeouts.standard, 'Slot has not been viewed', helpers.interval);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topLeaderboard).getAttribute(delayAd.resultAttribute))
			.to
			.equal(delayAd.adLoaded, 'Top leaderboard slot failed to load');
		expect(browser.element(adSlots.topBoxad).getAttribute(delayAd.resultAttribute))
			.to
			.equal(delayAd.adLoaded, 'Top boxad slot failed to load');
		expect(browser.element(adSlots.topLeaderboard).getAttribute(delayAd.viewedAttribute))
			.to
			.equal(delayAd.adViewed, 'Top leaderboard slot has not been counted as viewed');
		expect(browser.element(adSlots.topBoxad).getAttribute(delayAd.viewedAttribute))
			.to
			.equal(delayAd.adViewed, 'Top boxad slot has not been counted as viewed');
	});

	it('will test redirect after clicking on a top leaderboard ad', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test redirect after clicking on a top boxad', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
