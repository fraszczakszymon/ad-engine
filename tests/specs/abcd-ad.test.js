import abcdAd from '../pages/abcd-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test abcd ads', () => {
	beforeEach(() => {
		browser.url(abcdAd.pageLink);
		browser.waitForVisible(helpers.pageBody);
	});

	// Top Leaderboard tests

	it('will test the visibility and dimensions of top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Top leaderboard width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.abcdLeaderboardHeight, 'Top leaderboard height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
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

	it('will test top leaderboard line item id', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(abcdAd.topLeaderboardLineItemId, 'Line item ID mismatch');
	});

	it('will test redirect on click on top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWikia);
		expect(browser.getUrl())
			.to
			.equal(helpers.fandomWikia);
		helpers.closeNewTabs();
	});

	it('will test if video player is visible in top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		abcdAd.waitToStartPlaying();
		expect(browser.isVisible(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`), 'Video player not in viewport')
			.to
			.be
			.true;
	});

	it('will test if clicking the button unmutes the video', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		abcdAd.waitToStartPlaying();
		browser.moveToObject(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`);
		browser.click(abcdAd.unmuteButton);
		expect(browser.isExisting(`${abcdAd.unmuteButton}${adSlots.buttonIsOnClass}`), 'Video not unmuted')
			.to
			.be
			.false;
	});

	// Top Boxad tests

	it('will test top boxad visibility and dimensions', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const size = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Top boxad width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Top boxad height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not in viewport')
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

	it('will test top boxad line item id', () => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(abcdAd.topBoxadLineItemId, 'Line item ID mismatch');
	});

	it('will test redirect on click on top boxad', () => {
		browser.waitForVisible(adSlots.topBoxad);
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
