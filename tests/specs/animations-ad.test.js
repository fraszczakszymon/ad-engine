import animationsAd from '../pages/animations-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test animations ad page', () => {
	beforeEach(() => {
		browser.url(animationsAd.pageLink);
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
			expect(topLeaderboardSize.height)
				.to
				.equal(adSlots.leaderboardHeight, 'Top leaderboard ad height incorrect');
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

	it('will test visibility and dimensions of top boxad', () => {
		const topBoxadSize = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(topBoxadSize.width)
				.to
				.equal(adSlots.boxadWidth, 'Top boxad ad width incorrect');
			expect(topBoxadSize.height)
				.to
				.equal(adSlots.boxadHeight, 'Top boxad ad height incorrect');
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

	it('will test redirect after clicking on a top leaderboard ad', () => {
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.equal(helpers.fandomWord);
		helpers.closeNewTabs();
	});

	it('will test redirect after clicking on a top boxad', () => {
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.equal(helpers.fandomWord);
		helpers.closeNewTabs();
	});

	it('will test top leaderboard disappearing after 6 seconds', () => {
		browser.waitUntil(() => browser.element(adSlots.topLeaderboard).getAttribute(animationsAd.topLeaderboardStyle) === animationsAd.collapsedAdMaxHeight, animationsAd.waitForAnimationsTime, 'Top leaderboard ad did not collapse', helpers.interval);
		animationsAd.waitToScroll();

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		expect(topLeaderboardSize.height)
			.to
			.equal(animationsAd.topLeaderboardHeightWhenHidden, 'Top leaderboard was not hidden');
	});
});
