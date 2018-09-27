import floatingRailAd from '../pages/floating-rail-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test floating rail ads', () => {
	beforeEach(() => {
		browser.url(floatingRailAd.pageLink);
		browser.waitForVisible(helpers.pageBody);
	});

	describe('It will test top leaderboard', () => {
		beforeEach(() => {
			browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		});

		it('will test the visibility and dimensions of top leaderboard', () => {
			const size = browser.getElementSize(adSlots.topLeaderboard);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.leaderboardWidth, 'Top leaderboard width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.leaderboardHeight, 'Top leaderboard height incorrect');
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

			expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
				.to
				.equal(0);
		});

		it('will test top leaderboard line item id', () => {
			expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
				.to
				.equal(floatingRailAd.topLeaderboardLineItemId, 'Line item ID mismatch');
		});

		it('will test redirect on click on top leaderboard', () => {
			browser.click(adSlots.topLeaderboard);

			const tabIds = browser.getTabIds();

			browser.switchTab(tabIds[1]);
			helpers.waitForUrl(helpers.newsAndStories);
			expect(browser.getUrl())
				.to
				.include(helpers.fandomWord);
			helpers.closeNewTabs();
		});
	});

	describe('It will test top boxad', () => {
		beforeEach(() => {
			browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		});

		it('will test the visibility and dimensions of top boxad', () => {
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

			expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
				.to
				.equal(0);
		});

		it('will test top boxad line item id', () => {
			expect(browser.element(adSlots.topBoxad)
				.getAttribute(adSlots.lineItemParam))
				.to
				.equal(floatingRailAd.topBoxadLineItemId, 'Line item ID mismatch');
		});

		it('will test redirect on click on top boxad', () => {
			browser.click(adSlots.topBoxad);

			const tabIds = browser.getTabIds();

			browser.switchTab(tabIds[1]);
			helpers.waitForUrl(helpers.newsAndStories);
			expect(browser.getUrl())
				.to
				.include(helpers.fandomWord);
			helpers.closeNewTabs();
		});

		it('will test if rail scrolls with the content', () => {
			helpers.slowScroll(500);
			expect(browser.element(floatingRailAd.rail).getAttribute(helpers.classProperty))
				.to
				.equal(floatingRailAd.attributeRailScrolling, 'Rail did not scroll');
		});
	});
});
