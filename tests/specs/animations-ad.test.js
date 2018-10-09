import animationsAd from '../pages/animations-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Animations ad page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(animationsAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.leaderboardWidth, adSlots.leaderboardHeight);
		const tableOfErrors = [];

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

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

	it('Check redirect on click', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		browser.waitForEnabled(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain);
		helpers.closeNewTabs();
	});

	it('Check top leaderboard disappearing after 6 seconds', () => {
		browser.waitUntil(() => browser.element(adSlots.topLeaderboard).getAttribute(animationsAd.topLeaderboardStyle) === animationsAd.collapsedAdMaxHeight, animationsAd.waitForAnimationsTime, 'Top leaderboard ad did not collapse', timeouts.interval);
		animationsAd.waitToScroll();

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		expect(topLeaderboardSize.height)
			.to
			.equal(animationsAd.topLeaderboardHeightWhenHidden, 'Top leaderboard was not hidden');
	});
});

describe('Animations ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(animationsAd.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topBoxad, adSlots.boxadWidth, adSlots.boxadHeight);
		const tableOfErrors = [];

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

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

	it('Check redirect on click', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		browser.waitForEnabled(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain);
		helpers.closeNewTabs();
	});
});

