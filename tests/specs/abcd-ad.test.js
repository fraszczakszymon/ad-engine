import abcdAd from '../pages/abcd-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('ABCD ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(abcdAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.adProductsTopLeaderboardWidth, adSlots.abcdLeaderboardHeight);
		const tableOfErrors = [];

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
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

	it('Check line item id', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(abcdAd.topLeaderboardLineItemId, 'Line item ID mismatch');
	});

	it('Check if leaderboard does not obstruct the navbar', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		browser.waitForEnabled(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain);
		helpers.closeNewTabs();
	});
});

describe('ABCD ads page: video player in leaderboard', () => {
	beforeEach(() => {
		browser.url(abcdAd.pageLink);
		browser.waitForVisible(abcdAd.videoPlayer, timeouts.standard);
		helpers.waitToStartPlaying();
	});

	it('Check if video player is visible', () => {
		browser.waitForVisible(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`, timeouts.standard);
	});

	it('Check unmuting the video', () => {
		browser.moveToObject(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`);
		browser.click(abcdAd.unmuteButton);
		browser.waitForExist(`${abcdAd.unmuteButton}${abcdAd.buttonIsOnClass}`, timeouts.standard, true);
	});
});

describe('ABCD ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(abcdAd.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topBoxad, adSlots.boxadWidth, adSlots.boxadHeight);
		const tableOfErrors = [];

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not in viewport')
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

	it('Check line item id', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(abcdAd.topBoxadLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		browser.waitForEnabled(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain);
		helpers.closeNewTabs();
	});
});
