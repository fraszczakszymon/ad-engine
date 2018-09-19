import uapHivi from '../pages/uap-hivi-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test something', () => {
	beforeEach(() => {
		browser.url(uapHivi.pageLink);
		browser.waitForVisible(uapHivi.pageBody);
	});

	xit('will test visibility and dimensions of top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.uapLeaderboardWidth, 'Top leaderboard width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.uapLeaderboardHeight, 'Top leaderboard height incorrect');
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

	xit('will test redirect on click on top leaderboard', () => {
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

	// the commented test below is broken, also, moveToObject() will be deprecated soon with no alternative as of now

	// xit('will check if ui shows up after hover', () => {
	// 	browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	// 	browser.moveToObject(uapHivi.videoPlayer);
	// 	browser.pause(500);
	// 	expect(browser.element(uapHivi.videoPlayer))
	// 		.to
	// 		.equal(`${uapHivi.videoPlayer}${uapHivi.uiVisibleClass}`);
	// });

	xit('will test closing the top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.click(uapHivi.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(uapHivi.slotResult))
			.to
			.equal(uapHivi.slotCollapsed);
	});

	xit('will test top boxad dimensions and visibility', () => {
		browser.waitForVisible(adSlots.topBoxad);

		const size = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth);
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight);
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
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

	xit('will test redirect on click on top boxad', () => {
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

	it('will test incontent boxad dimensions and visibility', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad);

		const size = browser.getElementSize(adSlots.incontentBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth);
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight);
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
});
