import uapHivi from '../pages/uap-hivi-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test uap hivi slots', () => {
	beforeEach(() => {
		browser.url(uapHivi.pageLink);
		browser.waitForVisible(uapHivi.pageBody);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	// Top Leaderboard tests

	it('will test visibility and dimensions of top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.uapTopLeaderboardWidth, 'Top leaderboard width incorrect');
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

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});

	it('will test line item id and creative id of top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(uapHivi.topLeaderboardlineItemId, 'Line item ID mismatch');
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.creativeItemParam))
			.to
			.equal(uapHivi.topLeaderboardcreativeId, 'Creative ID mismatch');
	});

	it('will test redirect on click on top leaderboard', () => {
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

	it('will check if ui shows up after hover', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		uapHivi.waitToStartPlaying();
		browser.moveToObject(uapHivi.videoPlayer);
		uapHivi.waitForAction();
		expect(browser.element(uapHivi.videoPlayer).getAttribute(uapHivi.classProperty))
			.to
			.include(uapHivi.uiVisibleClass);
	});

	it('will test closing the top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.click(uapHivi.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(uapHivi.slotResult))
			.to
			.equal(uapHivi.slotCollapsed, 'Slot has not collapsed');
	});

	it('will test top leaderboard unsticking after scroll', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.slowScroll(1000);
		uapHivi.waitForAction();
		helpers.slowScroll(2000);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard in viewport')
			.to
			.be
			.false;
	});

	// Top Boxad tests

	it('will test top boxad dimensions and visibility', () => {
		browser.waitForVisible(adSlots.topBoxad);

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

	it('will test line item id and creative id of top boxad', () => {
		browser.waitForVisible(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(uapHivi.topBoxadLineItemId, 'Line item ID mismatch');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.creativeItemParam))
			.to
			.equal(uapHivi.topBoxadCreativeId, 'Creative ID mismatch');
	});

	it('will test redirect on click on top boxad', () => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.lukeSkywalkerLegacy);
		expect(browser.getUrl())
			.to
			.equal(helpers.lukeSkywalkerLegacy);
		helpers.closeNewTabs();
	});

	// Incontent Boxad tests

	it('will test incontent boxad dimensions and visibility', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad);

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
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad))
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

	it('will test line item id and creative id of top boxad', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad);
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(uapHivi.incontentBoxadLineItemId, 'Line item ID mismatch');
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.creativeItemParam))
			.to
			.equal(uapHivi.incontentBoxadCreativeId, 'Creative ID mismatch');
	});

	it('will test redirect on click on incontent boxad', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.click(adSlots.incontentBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.lukeSkywalkerLegacy);
		expect(browser.getUrl())
			.to
			.equal(helpers.lukeSkywalkerLegacy);
		helpers.closeNewTabs();
	});

	// Bottom Leaderboard tests

	it('will test bottom leaderboard dimensions and visibility', () => {
		helpers.slowScroll(6000);

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

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});

	it('will test line item id and creative id of bottom leaderboard', () => {
		helpers.slowScroll(6000);
		browser.waitForVisible(adSlots.bottomLeaderboard);
		expect(browser.element(adSlots.bottomLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(uapHivi.bottomLeaderboardLineItemId, 'Line item ID mismatch');
		expect(browser.element(adSlots.bottomLeaderboard).getAttribute(adSlots.creativeItemParam))
			.to
			.equal(uapHivi.bottomLeaderboardCreativeId, 'Creative ID mismatch');
	});

	it('will test redirect on click on bottom leaderboard', () => {
		helpers.slowScroll(6000);
		browser.click(adSlots.bottomLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
