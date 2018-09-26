import hiviUapStatic from '../pages/hivi-uap-static-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test uap hivi static slots', () => {
	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(helpers.pageBody);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	describe('It will test top leaderboard', () => {
		beforeEach(() => {
			browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		});

		it('will test visibility and dimensions of top leaderboard', () => {
			const size = browser.getElementSize(adSlots.topLeaderboard);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.adProductsTopLeaderboardWidth, 'Top leaderboard width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.uapTopLeaderboardHeight, 'Top leaderboard height incorrect');
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

			expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
				.to
				.equal(0);
		});

		it('will test line item id of top leaderboard', () => {
			expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
				.to
				.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
		});

		it('will test if leaderboard does not obstruct the navbar', () => {
			expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
				.to
				.be
				.true;
		});

		it('will test redirect on click on top leaderboard', () => {
			browser.click(adSlots.topLeaderboard);

			const tabIds = browser.getTabIds();

			browser.switchTab(tabIds[1]);
			helpers.waitForUrl(helpers.lukeSkywalkerLegacy);
			expect(browser.getUrl())
				.to
				.equal(helpers.lukeSkywalkerLegacy);
			helpers.closeNewTabs();
		});

		it('will test closing the top leaderboard', () => {
			browser.click(hiviUapStatic.closeLeaderboardButton);
			expect(browser.element(adSlots.topLeaderboard).getAttribute(hiviUapStatic.slotResult))
				.to
				.equal(hiviUapStatic.slotCollapsed, 'Slot has not collapsed');
		});

		it('will test top leaderboard unsticking after scroll', () => {
			helpers.slowScroll(3000);
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard in viewport')
				.to
				.be
				.false;
		});
	});

	describe('It will test top boxad', () => {
		beforeEach(() => {
			browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		});

		it('will test top boxad dimensions and visibility', () => {
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

			expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
				.to
				.equal(0);
		});

		it('will test line item id of top boxad', () => {
			expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
				.to
				.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
		});

		it('will test redirect on click on top boxad', () => {
			browser.click(adSlots.topBoxad);

			const tabIds = browser.getTabIds();

			browser.switchTab(tabIds[1]);
			helpers.waitForUrl(helpers.lukeSkywalkerLegacy);
			expect(browser.getUrl())
				.to
				.equal(helpers.lukeSkywalkerLegacy);
			helpers.closeNewTabs();
		});
	});

	describe('It will test incontent boxad', () => {
		beforeEach(() => {
			browser.scroll(0, 1000);
			browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		});

		it('will test incontent boxad dimensions and visibility', () => {
			const size = browser.getElementSize(adSlots.incontentBoxad);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.boxadWidth, 'Incontent boxad width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.boxadHeight, 'Incontent boxad height incorrect');
			} catch (error) {
				tableOfErrors.push(error.message);
			}
			try {
				expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not in viewport')
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

		it('will test line item id of top boxad', () => {
			expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemParam))
				.to
				.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
		});

		it('will test redirect on click on incontent boxad', () => {
			browser.click(adSlots.incontentBoxad);

			const tabIds = browser.getTabIds();

			browser.switchTab(tabIds[1]);
			helpers.waitForUrl(helpers.lukeSkywalkerLegacy);
			expect(browser.getUrl())
				.to
				.equal(helpers.lukeSkywalkerLegacy);
			helpers.closeNewTabs();
		});
	});

	describe('It will test bottom leaderboard', () => {
		beforeEach(() => {
			helpers.slowScroll(6000);
			browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		});

		it('will test bottom leaderboard dimensions and visibility', () => {
			const size = browser.getElementSize(adSlots.bottomLeaderboard);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.uapBottomLeaderboardWidth, 'Bottom leaderboard width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.uapBottomLeaderboardHeight, 'Bottom leaderboard height incorrect');
			} catch (error) {
				tableOfErrors.push(error.message);
			}
			try {
				expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard), 'Bottom leaderboard not in viewport')
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

		it('will test line item id of bottom leaderboard', () => {
			expect(browser.element(adSlots.bottomLeaderboard).getAttribute(adSlots.lineItemParam))
				.to
				.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
		});

		it('will test redirect on click on bottom leaderboard', () => {
			browser.click(adSlots.bottomLeaderboard);

			const tabIds = browser.getTabIds();

			browser.switchTab(tabIds[1]);
			helpers.waitForUrl(helpers.lukeSkywalkerLegacy);
			expect(browser.getUrl())
				.to
				.equal(helpers.lukeSkywalkerLegacy);
			helpers.closeNewTabs();
		});
	});
});
