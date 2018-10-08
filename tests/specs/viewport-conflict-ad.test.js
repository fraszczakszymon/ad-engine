import viewportConflictAd from '../pages/viewport-conflict-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Viewport conflicts ads: top leaderboard', () => {
	beforeEach(() => {
		browser.url(viewportConflictAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check visibility and dimensions', () => {
		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

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

	it('Check redirect on click', () => {
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

describe('Viewport conflict ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(viewportConflictAd.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check visibility and dimensions', () => {
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

	it('Check redirect on click', () => {
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

	it('Check if top boxad is hidden after clicking the button', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		helpers.waitForResult(adSlots.topBoxad, adSlots.adCollapsed);
		expect(browser.isExisting(`${adSlots.topBoxad}${helpers.classHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.false;
	});
});

describe('Viewport conflict ads page: bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(viewportConflictAd.pageLink);
	});

	it('Check visibility', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.waitForVisible(viewportConflictAd.addParagraphButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		viewportConflictAd.addParagraphs(5);
		browser.scroll(0, 2800);
		helpers.waitForResult(adSlots.bottomLeaderboard, adSlots.adLoaded);
		expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard))
			.to
			.be
			.true;
	});
});
