import blockBtfAd from '../pages/block-btf-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test block btf ad page top leaderboard', () => {
	beforeEach(() => {
		browser.url(blockBtfAd.pageLink, timeouts.standard);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('will test visibility and dimensions', () => {
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

	it('will test redirect on click', () => {
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

describe('It will test block btf ad page incontent boxad', () => {
	beforeEach(() => {
		browser.url(blockBtfAd.pageLink);
		browser.waitForVisible(helpers.pageBody, timeouts.standard);
	});

	it('will test if incontent boxad is hidden on the page', () => {
		helpers.slowScroll(2000);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not hidden')
			.to
			.be
			.false;
	});
});
