import emptyResponse from '../pages/empty-response.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test empty response page', () => {
	beforeEach(() => {
		browser.url(emptyResponse.pageLink, timeouts.standard);
	});

	it('will test if top leaderboard ad is not visible', () => {
		browser.isExisting(emptyResponse.topLeaderboardAd, timeouts.standard);
		expect(browser.isExisting(`${emptyResponse.topLeaderboardAd}${helpers.isHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(emptyResponse.topLeaderboardAd))
			.to
			.be
			.false;
	});
	it('will test if top boxad is not visible', () => {
		browser.isExisting(emptyResponse.topBoxad, timeouts.standard);
		expect(browser.isExisting(`${emptyResponse.topBoxad}${helpers.isHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(emptyResponse.topBoxad))
			.to
			.be
			.false;
	});
});
