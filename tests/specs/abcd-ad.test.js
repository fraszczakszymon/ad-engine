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

	xit('will test the visibility and dimensions of top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.abcdLeaderboardWidth, 'Top leaderboard width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.abcdLeaderboardHeight, 'Top leaderboard height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not visible in viewport')
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

	xit('will test redirect on click', () => {
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWikia);
		expect(browser.getUrl())
			.to
			.equal(helpers.fandomWikia);
		helpers.closeNewTabs();
	});

	xit('will test top leaderboard line item id and creative id', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(abcdAd.topLeaderboardLineItemId, 'Line item ID mismatch');
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.creativeItemParam))
			.to
			.equal(abcdAd.topLeaderboardCreativeId, 'Creative ID mismatch');
	});

	// TODO fix this test

	// it('will test if video player is visible in top leaderboard', () => {
	// 	browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	// 	expect(browser.isVisible(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`))
	// 		.to
	// 		.be
	// 		.true;
	// });

	it('will test top boxad visibility and dimensions', () => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);

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

	it('will test top boxad line item id and creative id', () => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(abcdAd.topBoxadLineItemId, 'Line item ID mismatch');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.creativeItemParam))
			.to
			.equal(abcdAd.topBoxadCreativeId, 'Creative ID mismatch');
	});
});
