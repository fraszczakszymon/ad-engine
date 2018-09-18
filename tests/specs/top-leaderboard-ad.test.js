import topLeaderboard from '../pages/top-leaderboard-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test top leaderboard ad page', () => {
	beforeEach(() => {
		browser.url(topLeaderboard.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('will test visibility of top leaderboard', () => {
		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.leaderboardWidth, 'Top leaderboard width incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(size.height)
				.to
				.equal(adSlots.leaderboardHeight, 'Top leaderboard height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.be
			.empty;
	});

	it('will test top leaderboard redirect on click', () => {
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
