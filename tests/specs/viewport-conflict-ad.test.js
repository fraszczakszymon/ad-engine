import viewportConflictAd from '../pages/viewport-conflict-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test viewport conflicts ad page', () => {
	beforeEach(() => {
		browser.url(viewportConflictAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('will test visibility and dimensions of top leaderboard', () => {
		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

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

	it('will test visibility and dimensions of top boxad', () => {
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

	it('will test redirect after clicking on a top leaderboard ad', () => {
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
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test if top boxad is hidden after clicking the button', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		browser.waitUntil(() => browser.element(adSlots.topBoxad).getAttribute(viewportConflictAd.dataSlotResult) === 'collapse', timeouts.standard, 'Ad was not hidden', helpers.interval);
		expect(browser.isExisting(`${adSlots.topBoxad}${helpers.classHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.false;
	});

	it('will test if bottom leaderboard is visible', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.waitForVisible(viewportConflictAd.addParagraphButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		viewportConflictAd.addParagraphs(5);
		browser.scroll(0, 2800);
		browser.waitUntil(() => browser.element(adSlots.bottomLeaderboard).getAttribute(viewportConflictAd.dataSlotResult) === 'success', timeouts.standard, 'Ad was not displayed', helpers.interval);
		expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard))
			.to
			.be
			.true;
	});
});
