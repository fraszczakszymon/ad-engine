import uapHivi from '../pages/uap-hivi-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test something', () => {
	beforeEach(() => {
		browser.url(uapHivi.pageLink);
		browser.waitForVisible(uapHivi.pageBody);
	});

	it('will test visibility and dimensions of top leaderboard', () => {
		browser.waitForVisible(adSlots.topLeaderboard);

		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.uapLeaderboardWidth, 'Top leaderboard width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.uapLeaderboardHeight, 'Top leaderboard height incorrect');
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
});
