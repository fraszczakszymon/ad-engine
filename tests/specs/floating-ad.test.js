import floatingAd from '../pages/floating-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test floating ad page', () => {
	beforeEach(() => {
		browser.url(floatingAd.pageLink);
		browser.waitForVisible(helpers.pageBody);
	});

	describe('It will test top leaderboard', () => {
		beforeEach(() => {
			browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		});

		it('will test visibility of top leaderboard', () => {
			const size = browser.getElementSize(adSlots.topLeaderboard);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.leaderboardWidth, 'Top leaderboard width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.leaderboardHeight, 'Top leaderboard height incorrect');
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

	describe('It will test top boxad rail module', () => {
		beforeEach(() => {
			browser.waitForVisible(adSlots.topBoxadRail, timeouts.standard);
		});

		it('will test visibility of top boxad rail module', () => {
			const size = browser.getElementSize(adSlots.topBoxadRail);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.railModuleWidth, 'Top boxad rail module width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.railModuleHeight, 'Top boxad rail module height incorrect');
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

	describe('It will test incontent boxad', () => {
		beforeEach(() => {
			browser.scroll(0, 1000);
			browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
			browser.scroll(0, 5000);
		});

		it('will test visibility of incontent boxad', () => {
			const size = browser.getElementSize(adSlots.incontentBoxad);
			const tableOfErrors = [];

			try {
				expect(size.width)
					.to
					.equal(adSlots.boxadWidth, 'Incontent boxad width incorrect');
				expect(size.height)
					.to
					.equal(adSlots.boxadHeight, 'Incontent boxad height incorrect');
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

		it(' will test incontent boxad redirect on click', () => {
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
});
