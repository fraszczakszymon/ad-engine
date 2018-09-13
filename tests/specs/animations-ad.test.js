import animationsAd from '../pages/animations-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test animations ad page', () => {
	beforeEach(() => {
		browser.url(animationsAd.pageLink);
		browser.waitForVisible(animationsAd.topLeaderboard, timeouts.standard);
		browser.waitForVisible(animationsAd.topBoxad, timeouts.standard);
	});

	it('will test visibility and dimensions of top leaderboard and top boxad', () => {
		const topLeaderboardSize = browser.getElementSize(animationsAd.topLeaderboard);
		const topBoxadSize = browser.getElementSize(animationsAd.topBoxad);

		expect(topLeaderboardSize.width)
			.to
			.equal(animationsAd.topLeaderboardWidth, 'Top leaderboard ad width incorrect');
		expect(topLeaderboardSize.height)
			.to
			.equal(animationsAd.topLeaderboardHeight, 'Top leaderboard ad height incorrect');
		expect(browser.isVisibleWithinViewport(animationsAd.topLeaderboard))
			.to
			.be
			.true;
		expect(topBoxadSize.width)
			.to
			.equal(animationsAd.topBoxadWidth, 'Top boxad ad width incorrect');
		expect(topBoxadSize.height)
			.to
			.equal(animationsAd.topBoxadHeight, 'Top boxad ad height incorrect');
		expect(browser.isVisibleWithinViewport(animationsAd.topBoxad))
			.to
			.be
			.true;
	});

	it('will test redirect after clicking on a top leaderboard ad', () => {
		browser.click(animationsAd.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test redirect after clicking on a top boxad', () => {
		browser.click(animationsAd.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test top leaderboard disappearing after some time', () => {
		browser.waitUntil(() => browser.element(animationsAd.topLeaderboard).getAttribute(animationsAd.style) === 'max-height: 0px;', timeouts.extended, 'Top leaderboard ad did not hide', helpers.interval);
		animationsAd.waitToScroll();

		const topLeaderboardSize = browser.getElementSize(animationsAd.topLeaderboard);

		expect(topLeaderboardSize.height)
			.to
			.equal(animationsAd.topLeaderboardHeightHidden);
	});
});
