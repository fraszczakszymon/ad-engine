import delayAd from '../pages/delay-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Delay ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(delayAd.loadAdsButton, timeouts.standard);
	});

	it('Check if top leaderboard is not immediately visible', () => {
		browser.waitForExist(`${adSlots.topLeaderboard}[${adSlots.resultAttribute}]`, timeouts.standard, true);
	});

	it('Check visibility and dimensions', () => {
		const tableOfErrors = [];

		delayAd.waitToLoadAds();
		browser.waitForVisible(`${adSlots.topLeaderboard}[${adSlots.resultAttribute}]`, timeouts.standard);

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(topLeaderboardSize.width)
				.to
				.equal(adSlots.leaderboardWidth, 'Width incorrect');
			expect(topLeaderboardSize.height)
				.to
				.equal(adSlots.leaderboardHeight, 'Height incorrect');
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

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check if top leaderboard shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForViewed(adSlots.topLeaderboard);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Top leaderboard slot failed to load');
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Top leaderboard slot has not been counted as viewed');
	});

	it('Check redirect on click', () => {
		browser.click(delayAd.loadAdsButton);
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		browser.waitForEnabled(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Delay ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(helpers.pageBody, timeouts.standard);
	});

	it('Check if top boxad is not immediately visible', () => {
		browser.waitForExist(`${adSlots.topBoxad}[${adSlots.resultAttribute}]`, timeouts.standard, true);
	});

	it('Check visibility and dimensions', () => {
		delayAd.waitToLoadAds();
		browser.waitForVisible(`${adSlots.topBoxad}[${adSlots.resultAttribute}]`, timeouts.standard);

		const topBoxadSize = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(topBoxadSize.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(topBoxadSize.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
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

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check if top boxad shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForViewed(adSlots.topBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Top boxad slot failed to load');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Top boxad slot has not been counted as viewed');
	});

	it('Check redirect on click', () => {
		browser.click(delayAd.loadAdsButton);
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		browser.waitForEnabled(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});
