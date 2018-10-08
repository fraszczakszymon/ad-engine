import blockBtfAd from '../pages/block-btf-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Block BTF ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(blockBtfAd.pageLink, timeouts.standard);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check top leaderboard visibility and dimensions', () => {
		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.leaderboardWidth, 'Top leaderboard width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.leaderboardHeight);
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

	it('Check top leaderboard ad redirect on click', () => {
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain);
		helpers.closeNewTabs();
	});

	it('Check if incontent boxad is hidden on the page', () => {
		helpers.slowScroll(2000);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not hidden')
			.to
			.be
			.false;
	});
});
