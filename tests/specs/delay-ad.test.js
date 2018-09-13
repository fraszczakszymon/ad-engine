import delayAd from '../pages/delay-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test delay ad page', () => {
	beforeEach(() => {
		browser.url(delayAd.pageLink);
	});

	it('will test visibility and dimensions of delayed top leaderboard and top boxad', () => {
		delayAd.waitToLoadAds();
		browser.waitForVisible(delayAd.topLeaderboard, timeouts.standard);
		browser.waitForVisible(delayAd.topBoxad, timeouts.standard);

		const topLeaderboardSize = browser.getElementSize(delayAd.topLeaderboard);
		const topBoxadSize = browser.getElementSize(delayAd.topBoxad);

		expect(topLeaderboardSize.width)
			.to
			.equal(delayAd.topLeaderboardWidth, 'Top leaderboard ad width incorrect');
		expect(topLeaderboardSize.height)
			.to
			.equal(delayAd.topLeaderboardHeight, 'Top leaderboard ad height incorrect');
		expect(browser.isVisibleWithinViewport(delayAd.topLeaderboard))
			.to
			.be
			.true;

		expect(topBoxadSize.width)
			.to
			.equal(delayAd.topBoxadWidth, 'Top boxad ad width incorrect');
		expect(topBoxadSize.height)
			.to
			.equal(delayAd.topBoxadHeight, 'Top boxad ad height incorrect');
		expect(browser.isVisibleWithinViewport(delayAd.topBoxad))
			.to
			.be
			.true;
	});

	it('will test if ads show up after clicking the button and if they were viewed', () => {
		browser.waitForVisible(delayAd.loadAdsButton, timeouts.standard);
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(delayAd.topBoxad, timeouts.standard);
		browser.waitUntil(() => browser.element(delayAd.topLeaderboard).getAttribute(delayAd.viewedAttribute) === 'true', timeouts.standard, 'Slot has not been viewed', helpers.interval);
		expect(browser.isVisibleWithinViewport(delayAd.topLeaderboard))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(delayAd.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(delayAd.topLeaderboard).getAttribute(delayAd.resultAttribute))
			.to
			.equal('success', 'Slot failed to load');
		expect(browser.element(delayAd.topBoxad).getAttribute(delayAd.resultAttribute))
			.to
			.equal('success', 'Slot failed to load');
		expect(browser.element(delayAd.topLeaderboard).getAttribute(delayAd.viewedAttribute))
			.to
			.equal('true', 'Slot has not been counted as viewed');
		expect(browser.element(delayAd.topBoxad).getAttribute(delayAd.viewedAttribute))
			.to
			.equal('true', 'Slot has not been counted as viewed');
	});

	it('will test redirect after clicking on a top leaderboard ad', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(delayAd.topLeaderboard, timeouts.standard);
		browser.click(delayAd.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test redirect after clicking on a top boxad', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(delayAd.topBoxad, timeouts.standard);
		browser.click(delayAd.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
