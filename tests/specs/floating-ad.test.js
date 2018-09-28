import floatingAd from '../pages/floating-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test floating ad page top leaderboard', () => {
	beforeEach(() => {
		browser.url(floatingAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard);
	});

	it('will test dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.leaderboardWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.leaderboardHeight, 'Height incorrect');
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

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('will test top leaderboard redirect on click', () => {
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

describe('It will test floating ad page top boxad rail module', () => {
	beforeEach(() => {
		browser.url(floatingAd.pageLink);
		browser.waitForVisible(adSlots.topBoxadRail, timeouts.standard);
	});

	it('will test dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.topBoxadRail);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.railModuleWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.railModuleHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxadRail), 'Top Boxad rail module not in viewport')
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
});

describe('It will test floating ad page incontent boxad', () => {
	beforeEach(() => {
		browser.url(floatingAd.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.scroll(0, 5000);
	});

	it('will test dimensions visibility', () => {
		const size = browser.getElementSize(adSlots.incontentBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, ' Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent Boxad not in viewport')
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

	it('will test redirect on click', () => {
		browser.click(adSlots.incontentBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});
