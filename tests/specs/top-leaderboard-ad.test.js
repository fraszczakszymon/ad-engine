import topLeaderboard from '../pages/top-leaderboard-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test top leaderboard ad page', () => {
	beforeEach(() => {
		browser.url(topLeaderboard.pageLink);
		browser.waitForVisible(topLeaderboard.topLeaderboard, timeouts.standard);
	});

	it('will test visibility of top leaderboard', () => {
		const size = browser.getElementSize(topLeaderboard.topLeaderboard);

		expect(size.width)
			.to
			.equal(topLeaderboard.topLeaderboardWidth, 'Top leaderboard width incorrect');
		expect(size.height)
			.to
			.equal(topLeaderboard.topLeaderboardHeight, 'Top leaderboard height incorrect');
	});

	it('will test top leaderboard redirect on click', () => {
		browser.click(topLeaderboard.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
