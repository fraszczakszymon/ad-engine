import emptyResponse from '../pages/empty-response.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Empty response page:', () => {
	beforeEach(() => {
		browser.url(emptyResponse.pageLink);
		browser.waitForVisible(emptyResponse.articleClass, timeouts.standard);
	});

	it('Check if top leaderboard ad is not visible', () => {
		browser.isExisting(adSlots.topLeaderboard, timeouts.standard);
		expect(browser.isExisting(`${adSlots.topLeaderboard}${helpers.classHidden}`), 'Element does not exist')
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not visible in viewport')
			.to
			.be
			.false;
	});
	it('Check if top boxad is not visible', () => {
		browser.isExisting(adSlots.topBoxad, timeouts.standard);
		expect(browser.isExisting(`${adSlots.topBoxad}${helpers.classHidden}`), 'Top boxad exists in code')
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad is visible in viewport')
			.to
			.be
			.false;
	});
});
