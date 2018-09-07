import topLeaderboard from '../pages/top-leaderboard-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test top leaderboard ad page', () => {
	beforeEach(() => {
		browser.url(topLeaderboard.pageLink);
		browser.waitForVisible(topLeaderboard.topLeaderboard, timeouts.standard);
	});

	xit('will test visibility of top leaderboard', () => {
		const size = browser.getElementSize(topLeaderboard.topLeaderboard);

		expect(size.width)
			.to
			.equal(728, 'Width incorrect');
		expect(size.height)
			.to
			.equal(90, 'Height incorrect');
	});

	xit('top leaderboard and the redirection after clicking it', () => {
		browser.element(topLeaderboard.topLeaderboard)
			.click();

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
	});
});
