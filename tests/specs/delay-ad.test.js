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

	it('will test if top leaderboard is not immediately visible', () => {
		const tableOfErrors = [];

		try {
			expect(browser.isExisting(`${adSlots.topLeaderboard}${delayAd.resultAttribute}`), 'Top leaderboard visible')
				.to
				.be
				.false;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});

	it('will test if top boxad is not immediately visible', () => {
		const tableOfErrors = [];

		try {
			expect(browser.isExisting(`${adSlots.topBoxad}${delayAd.resultAttribute}`), 'Top boxad visible')
				.to
				.be
				.false;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});

	it('will test visibility and dimensions of delayed top leaderboard', () => {
		const tableOfErrors = [];

		delayAd.waitToLoadAds();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(topLeaderboardSize.width)
				.to
				.equal(adSlots.leaderboardWidth, 'Top leaderboard ad width incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(topLeaderboardSize.height)
				.to
				.equal(adSlots.leaderboardHeight, 'Top leaderboard ad height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});

	it('will test visibility and dimensions of delayed top boxad', () => {
		delayAd.waitToLoadAds();
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);

		const topBoxadSize = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(topBoxadSize.width)
				.to
				.equal(adSlots.boxadWidth, 'Top boxad ad width incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(topBoxadSize.height)
				.to
				.equal(adSlots.boxadHeight, 'Top boxad ad height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not visible in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});

	it('will test if top leaderboard ad shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		browser.waitUntil(() => browser.element(adSlots.topLeaderboard).getAttribute(delayAd.viewedAttribute) === delayAd.adViewed, timeouts.standard, 'Slot has not been viewed', helpers.interval);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topLeaderboard).getAttribute(delayAd.resultAttribute))
			.to
			.equal(delayAd.adLoaded, 'Top leaderboard slot failed to load');
		expect(browser.element(adSlots.topLeaderboard).getAttribute(delayAd.viewedAttribute))
			.to
			.equal(delayAd.adViewed, 'Top leaderboard slot has not been counted as viewed');
	});

	it('will test if top boxad shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		browser.waitUntil(() => browser.element(adSlots.topBoxad).getAttribute(delayAd.viewedAttribute) === delayAd.adViewed, timeouts.standard, 'Slot has not been viewed', helpers.interval);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(delayAd.resultAttribute))
			.to
			.equal(delayAd.adLoaded, 'Top boxad slot failed to load');
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
