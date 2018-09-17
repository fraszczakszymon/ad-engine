import blockBtfAd from '../pages/block-btf-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test block btf ad page', () => {
	beforeEach(() => {
		browser.url(blockBtfAd.pageLink, timeouts.standard);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('will test top leaderboard visibility and dimensions', () => {
		const size = browser.getElementSize(adSlots.topLeaderboard);

		expect(size.width)
			.to
			.equal(adSlots.leaderboardWidth);
		expect(size.height)
			.to
			.equal(adSlots.leaderboardHeight);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
			.to
			.be
			.true;
	});

	it(' will test top leaderboard ad redirect on click', () => {
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test if incontent boxad is hidden on the page', () => {
		helpers.slowScroll(2000);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad))
			.to
			.be
			.false;
	});
});
