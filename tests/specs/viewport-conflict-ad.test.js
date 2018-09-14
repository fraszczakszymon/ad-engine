import viewportConflictAd from '../pages/viewport-conflict-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test viewport conflicts ad page', () => {
	beforeEach(() => {
		browser.url(viewportConflictAd.pageLink);
		browser.waitForVisible(viewportConflictAd.topLeaderboard, timeouts.standard);
		browser.waitForVisible(viewportConflictAd.topBoxad, timeouts.standard);
	});

	it('will test visibility and dimensions of top leaderboard and top boxad', () => {
		const topLeaderboardSize = browser.getElementSize(viewportConflictAd.topLeaderboard);
		const topBoxadSize = browser.getElementSize(viewportConflictAd.topBoxad);

		expect(topLeaderboardSize.width)
			.to
			.equal(viewportConflictAd.topLeaderboardWidth, 'Top leaderboard ad width incorrect');
		expect(topLeaderboardSize.height)
			.to
			.equal(viewportConflictAd.topLeaderboardHeight, 'Top leaderboard ad height incorrect');
		expect(browser.isVisibleWithinViewport(viewportConflictAd.topLeaderboard))
			.to
			.be
			.true;
		expect(topBoxadSize.width)
			.to
			.equal(viewportConflictAd.topBoxadWidth, 'Top boxad ad width incorrect');
		expect(topBoxadSize.height)
			.to
			.equal(viewportConflictAd.topBoxadHeight, 'Top boxad ad height incorrect');
		expect(browser.isVisibleWithinViewport(viewportConflictAd.topBoxad))
			.to
			.be
			.true;
	});

	it('will test redirect after clicking on a top leaderboard ad', () => {
		browser.click(viewportConflictAd.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test redirect after clicking on a top boxad', () => {
		browser.click(viewportConflictAd.topBoxad);

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
		browser.waitUntil(() => browser.element(viewportConflictAd.topBoxad).getAttribute(viewportConflictAd.dataSlotResult) === 'collapse', timeouts.standard, 'Ad was not hidden', helpers.interval);
		expect(browser.isVisibleWithinViewport(viewportConflictAd.topBoxad))
			.to
			.be
			.false;
	});

	it('will test if bottom leaderboard is visible', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.waitForVisible(viewportConflictAd.addParagraphButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		viewportConflictAd.addParagraphs(5);
		browser.scroll(0, 2800); // TODO change this scroll, if possible and necessary
		browser.waitUntil(() => browser.element(viewportConflictAd.bottomLeaderboard).getAttribute(viewportConflictAd.dataSlotResult) === 'success', timeouts.standard, 'Ad was not displayed', helpers.interval);
		expect(browser.isVisibleWithinViewport(viewportConflictAd.bottomLeaderboard))
			.to
			.be
			.true;
	});
});
